/**
 * Sakhi Partner Layer - Privacy Unit Tests
 * Rigorous automated tests verifying all 5 Non-Negotiable Privacy Rules.
 */

import { partnerPrivacyService } from '../partnerPrivacy.service.js';
import { partnerService } from '../partner.service.js';
import { partnerApiService } from '../partnerApi.service.js';

describe('Sakhi Partner Layer - Non-Negotiable Privacy Rules', () => {
  beforeEach(() => {
    localStorage.clear();
    partnerPrivacyService.initLogs();
    partnerService.initDefaultData();
    partnerApiService.initDefaultKeys();
  });

  test('RULE 1 & 4: Anonymization Strips Individual Cycle Data, Names & Personal Identifiers', () => {
    const rawUserData = [
      { id: 'user-1', name: 'Ananya Sharma', periodDates: ['2026-09-01', '2026-09-28'], flow: 'heavy', active: true, teenConsent: true, parentConsent: true },
      { id: 'user-2', name: 'Priya Verma', periodDates: ['2026-09-05'], flow: 'light', active: true, teenConsent: true, parentConsent: true }
    ];

    const anonymized = partnerPrivacyService.anonymizeUserCohort(rawUserData);
    
    expect(anonymized.totalUsers).toBe(2);
    expect(anonymized.users).toBeUndefined(); // Individual array must be completely stripped
    
    // Convert output to JSON string to ensure no string occurrences of cycle data or names exist
    const jsonString = JSON.stringify(anonymized);
    expect(jsonString).not.toContain('Ananya');
    expect(jsonString).not.toContain('Priya');
    expect(jsonString).not.toContain('periodDates');
    expect(jsonString).not.toContain('2026-09-01');
    expect(jsonString).not.toContain('heavy');
  });

  test('RULE 2: Aggregate Metrics are SUPPRESSED when Group Size < 20', async () => {
    // Create a new program with 0 members
    const prog = partnerService.createProgram({
      name: 'Small Cohort Test',
      region: 'North India',
      language: 'hi',
      plan: 'pilot'
    });

    // Fetch stats for program with small cohort (<20)
    const stats = await partnerService.getProgramStatsWithPrivacy(prog.id, 'Test Admin');

    expect(stats.suppressed).toBe(true);
    expect(stats.joinedUsersCount).toBe('SUPPRESSED (<20)');
    expect(stats.activeUsersWeekly).toBe('SUPPRESSED (<20)');
    expect(stats.educationModulesCompleted).toBe('SUPPRESSED (<20)');
    expect(stats.consentRate).toBe('SUPPRESSED (<20)');
    expect(stats.byRegion).toBeNull();
  });

  test('RULE 2: Aggregate Metrics are DISPLAYED when Group Size >= 20', async () => {
    const prog = partnerService.createProgram({
      name: 'Large Cohort Test',
      region: 'North India',
      language: 'hi',
      plan: 'pilot'
    });

    // Join 25 users into program
    for (let i = 1; i <= 25; i++) {
      await partnerService.joinProgramByCode({
        userId: `teen-user-${i}`,
        joinCode: prog.joinCode,
        teenOptIn: true,
        parentConsent: true,
        parentName: `Parent ${i}`
      });
    }

    const stats = await partnerService.getProgramStatsWithPrivacy(prog.id, 'Test Admin');

    expect(stats.suppressed).toBe(false);
    expect(stats.joinedUsersCount).toBe(25);
    expect(stats.byRegion).not.toBeNull();
  });

  test('RULE 3: Teen Opt-In + Parent Consent Required & Voluntary Exit Excludes Data Immediately', async () => {
    const prog = partnerService.createProgram({
      name: 'Consent Exit Test',
      region: 'North India',
      language: 'hi',
      plan: 'pilot'
    });

    // Attempt join without teen opt-in
    const failTeen = await partnerService.joinProgramByCode({
      userId: 'user-no-teen',
      joinCode: prog.joinCode,
      teenOptIn: false,
      parentConsent: true
    });
    expect(failTeen.success).toBe(false);

    // Attempt join without parent consent
    const failParent = await partnerService.joinProgramByCode({
      userId: 'user-no-parent',
      joinCode: prog.joinCode,
      teenOptIn: true,
      parentConsent: false
    });
    expect(failParent.success).toBe(false);

    // Valid join
    const validJoin = await partnerService.joinProgramByCode({
      userId: 'user-valid',
      joinCode: prog.joinCode,
      teenOptIn: true,
      parentConsent: true
    });
    expect(validJoin.success).toBe(true);

    let memberships = partnerService.getUserMemberships('user-valid');
    expect(memberships.length).toBe(1);

    // User leaves program voluntarily
    const leaveResult = partnerService.leaveProgram('user-valid', prog.id);
    expect(leaveResult.success).toBe(true);

    memberships = partnerService.getUserMemberships('user-valid');
    expect(memberships.length).toBe(0);
  });

  test('RULE 5: Every Access Attempt is Logged (Who, What, When)', async () => {
    const logsBefore = partnerPrivacyService.getAccessLogs();
    const initialCount = logsBefore.length;

    // Perform an API request
    await partnerApiService.getProgramStatsEndpoint('prog-demo-001', 'sakhi_live_ngo_demo_key_99');

    const logsAfter = partnerPrivacyService.getAccessLogs();
    expect(logsAfter.length).toBeGreaterThan(initialCount);

    const latestLog = logsAfter[logsAfter.length - 1];
    expect(latestLog.actorId).toBeDefined();
    expect(latestLog.actorRole).toBe('api_client');
    expect(latestLog.action).toBe('GET_PROGRAM_STATS_SUCCESS');
    expect(latestLog.timestamp).toBeDefined();
  });
});
