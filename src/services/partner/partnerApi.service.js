/**
 * Sakhi Partner Layer - Read-Only Stats API Service (Module F)
 * Simulates and serves REST endpoints GET /v1/programs/{id}/stats
 * Enforces API Key Authentication, Rate Limiting, & 20+ Group Suppression.
 */

import { partnerPrivacyService } from './partnerPrivacy.service.js';
import { partnerService } from './partner.service.js';

const API_KEYS_KEY = 'sakhi_partner_api_keys';
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;

class PartnerApiService {
  constructor() {
    this.rateLimitMap = new Map(); // apiKey -> array of timestamps
    this.initDefaultKeys();
  }

  initDefaultKeys() {
    if (!localStorage.getItem(API_KEYS_KEY)) {
      const defaultKeys = [
        {
          key: 'sakhi_live_ngo_demo_key_99',
          partnerName: 'Rural Adolescent Health Alliance (NGO)',
          programId: 'prog-demo-001',
          createdAt: new Date().toISOString(),
          isActive: true
        }
      ];
      localStorage.setItem(API_KEYS_KEY, JSON.stringify(defaultKeys));
    }
  }

  getApiKeys() {
    try {
      return JSON.parse(localStorage.getItem(API_KEYS_KEY)) || [];
    } catch {
      return [];
    }
  }

  generateApiKey(partnerName, programId) {
    const keys = this.getApiKeys();
    const newKey = `sakhi_key_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
    const keyObj = {
      key: newKey,
      partnerName,
      programId,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    keys.push(keyObj);
    localStorage.setItem(API_KEYS_KEY, JSON.stringify(keys));
    return keyObj;
  }

  validateKey(apiKey) {
    const keys = this.getApiKeys();
    const found = keys.find(k => k.key === apiKey && k.isActive);
    return found || null;
  }

  checkRateLimit(apiKey) {
    const now = Date.now();
    const timestamps = this.rateLimitMap.get(apiKey) || [];
    // Filter out timestamps outside the window
    const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return { allowed: false, current: validTimestamps.length, limit: MAX_REQUESTS_PER_WINDOW };
    }

    validTimestamps.push(now);
    this.rateLimitMap.set(apiKey, validTimestamps);
    return { allowed: true, current: validTimestamps.length, limit: MAX_REQUESTS_PER_WINDOW };
  }

  /**
   * Endpoint simulation: GET /v1/programs/{id}/stats
   * Header expected: X-API-Key: <key>
   */
  async getProgramStatsEndpoint(programId, apiKey, callerIp = '127.0.0.1') {
    // 1. Authenticate API Key
    const keyRecord = this.validateKey(apiKey);
    if (!keyRecord) {
      partnerPrivacyService.logAccess({
        actorId: apiKey ? 'invalid_key' : 'anonymous',
        actorRole: 'api_client',
        action: 'GET_PROGRAM_STATS_UNAUTHORIZED',
        programId,
        details: 'Failed API Key authentication'
      });
      return {
        status: 401,
        error: 'Unauthorized',
        message: 'Invalid or revoked X-API-Key header provided.'
      };
    }

    // 2. Rate Limiting Check
    const rateCheck = this.checkRateLimit(apiKey);
    if (!rateCheck.allowed) {
      partnerPrivacyService.logAccess({
        actorId: keyRecord.partnerName,
        actorRole: 'api_client',
        action: 'GET_PROGRAM_STATS_RATE_LIMITED',
        programId,
        details: `Exceeded rate limit of ${MAX_REQUESTS_PER_WINDOW} reqs/min`
      });
      return {
        status: 429,
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_WINDOW} requests per minute allowed.`
      };
    }

    // 3. Program Verification
    const program = partnerService.getProgramById(programId);
    if (!program) {
      partnerPrivacyService.logAccess({
        actorId: keyRecord.partnerName,
        actorRole: 'api_client',
        action: 'GET_PROGRAM_STATS_NOT_FOUND',
        programId,
        details: 'Program ID not found'
      });
      return {
        status: 404,
        error: 'Not Found',
        message: `Program with ID '${programId}' does not exist.`
      };
    }

    // 4. Enforce Privacy-Engine Aggregates (k >= 20 Suppression)
    const privacyStats = await partnerService.getProgramStatsWithPrivacy(programId, keyRecord.partnerName);

    // 5. Log Successful Audit Log Entry
    partnerPrivacyService.logAccess({
      actorId: keyRecord.partnerName,
      actorRole: 'api_client',
      action: 'GET_PROGRAM_STATS_SUCCESS',
      programId,
      details: `Returned aggregated stats. Suppressed: ${privacyStats.suppressed}`
    });

    return {
      status: 200,
      data: {
        apiVersion: 'v1',
        program: {
          id: program.id,
          name: program.name,
          region: program.region,
          language: program.language,
          plan: program.plan
        },
        privacyGuarantees: {
          groupSizeSuppressionThreshold: partnerPrivacyService.MIN_GROUP_SIZE,
          individualCycleDataExposed: false,
          userIdentifiersExposed: false
        },
        stats: privacyStats,
        rateLimit: {
          limitPerMinute: MAX_REQUESTS_PER_WINDOW,
          remaining: MAX_REQUESTS_PER_WINDOW - rateCheck.current
        }
      }
    };
  }
}

export const partnerApiService = new PartnerApiService();
export default partnerApiService;
