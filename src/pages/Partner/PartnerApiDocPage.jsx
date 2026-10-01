/**
 * Sakhi Partner Layer - Read-Only Stats API Documentation & Tester (Module F)
 * Interactive tester for GET /v1/programs/{id}/stats
 * Enforces API Key Auth, Rate Limiting (30 req/min), & 20+ Group Suppression.
 */

import React, { useState } from 'react';
import partnerApiService from '../../services/partner/partnerApi.service.js';

export const PartnerApiDocPage = () => {
  const [apiKey, setApiKey] = useState('sakhi_live_ngo_demo_key_99');
  const [programId, setProgramId] = useState('prog-demo-001');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState(null);

  const handleTestApi = async () => {
    setLoading(true);
    const res = await partnerApiService.getProgramStatsEndpoint(programId, apiKey);
    setApiResponse(res);
    setLoading(false);
  };

  const handleGenerateKey = () => {
    const keyObj = partnerApiService.generateApiKey('Partner Organization', programId);
    setGeneratedKey(keyObj.key);
    setApiKey(keyObj.key);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-800 to-indigo-900 border border-purple-700/50 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>⚡ REST API v1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Read-Only Stats API Documentation</h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Programmatic access to anonymized program aggregates. Enforces 20+ user suppression and strict rate limits.
          </p>
        </div>

        {/* API Specification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Endpoint Spec</h3>
              
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 font-bold">GET</span>
                <span className="text-slate-300">/v1/programs/&#123;id&#125;/stats</span>
              </div>

              <div className="text-xs text-slate-400 space-y-2">
                <p><strong>Authentication:</strong> Required Header <code className="text-pink-400">X-API-Key: &lt;key&gt;</code></p>
                <p><strong>Rate Limit:</strong> 30 requests per minute per key</p>
                <p><strong>Response Format:</strong> JSON</p>
              </div>

              <button
                onClick={handleGenerateKey}
                className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow transition-all"
              >
                🔑 Generate New API Key
              </button>

              {generatedKey && (
                <div className="p-2 bg-purple-950/60 border border-purple-800 rounded-lg text-[10px] font-mono text-purple-200 break-all select-all">
                  Key Created: {generatedKey}
                </div>
              )}
            </div>

            {/* Privacy Rule Card */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-amber-300 text-xs space-y-2">
              <strong className="block font-bold text-amber-400 uppercase text-[10px]">
                🛡️ Non-Negotiable API Privacy Rules
              </strong>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-200/90 leading-relaxed">
                <li>If active program members &lt; 20, all metrics return <code className="text-amber-400">suppressed: true</code>.</li>
                <li>Zero individual cycle data, dates, or personal names are present in any JSON output.</li>
                <li>All requests are logged to the immutable audit ledger.</li>
              </ul>
            </div>
          </div>

          {/* Interactive Tester */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Interactive API Explorer / Runner
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">X-API-Key Header</label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Program ID Path Parameter</label>
                  <input
                    type="text"
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs"
                  />
                </div>

                <button
                  onClick={handleTestApi}
                  disabled={loading}
                  className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-lg hover:from-pink-600 hover:to-rose-700 transition-all"
                >
                  {loading ? 'Sending Request...' : 'EXECUTE GET REQUEST'}
                </button>
              </div>

              {/* JSON Output Viewer */}
              {apiResponse && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">HTTP Status:</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      apiResponse.status === 200 ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                    }`}>
                      {apiResponse.status}
                    </span>
                  </div>

                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-96">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerApiDocPage;
