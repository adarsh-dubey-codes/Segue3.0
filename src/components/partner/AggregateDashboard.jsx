/**
 * Sakhi Partner Layer - Aggregate Dashboard Component (Module C)
 * Displays privacy-compliant aggregated metrics for Partner Admins and Funders.
 * Enforces k >= 20 suppression rule, displays suppression warnings, and handles CSV export.
 */

import React, { useState, useEffect } from 'react';
import partnerService from '../../services/partner/partner.service.js';
import partnerPrivacyService from '../../services/partner/partnerPrivacy.service.js';

export const AggregateDashboard = ({ programId, actorId = 'Partner Admin', role = 'partner_admin' }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingCsv, setDownloadingCsv] = useState(false);

  useEffect(() => {
    if (programId) {
      loadStats();
    }
  }, [programId, actorId]);

  const loadStats = async () => {
    setLoading(true);
    const data = await partnerService.getProgramStatsWithPrivacy(programId, actorId);
    setStats(data);
    setLoading(false);
  };

  const handleExportCSV = () => {
    setDownloadingCsv(true);
    const csvContent = partnerService.exportAggregatesToCSV(programId, actorId);
    
    // Create downloadable blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Sakhi_Aggregates_Program_${programId}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadingCsv(false);
  };

  if (!programId) {
    return (
      <div className="p-8 text-center bg-white/80 dark:bg-slate-900/80 rounded-2xl border text-slate-500 text-sm">
        Select a partner program to view aggregated dashboard statistics.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center bg-white/80 dark:bg-slate-900/80 rounded-2xl border text-slate-500 text-sm">
        Calculating privacy-guaranteed aggregates...
      </div>
    );
  }

  const isSuppressed = stats?.suppressed;

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-pink-100 dark:border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            📊 Aggregate Impact Dashboard ({role.replace('_', ' ').toUpperCase()})
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time anonymized metrics for program evaluation and funder reporting.
          </p>
        </div>
        
        <button
          onClick={handleExportCSV}
          disabled={downloadingCsv}
          className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>📥 Export Aggregates to CSV</span>
        </button>
      </div>

      {/* Non-Negotiable Privacy Rule #2 Banner */}
      {isSuppressed ? (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start space-x-4">
          <span className="text-3xl">🚫</span>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
              Data Suppression Active (Group Size &lt; {partnerPrivacyService.MIN_GROUP_SIZE} Users)
            </h4>
            <p className="text-xs leading-relaxed">
              <strong>Privacy Protection Rule:</strong> To prevent demographic re-identification, aggregate metric reporting is strictly disabled until this cohort reaches at least <strong>{partnerPrivacyService.MIN_GROUP_SIZE} active consenting users</strong>. Current total enrolled/active: <strong>{stats.rawJoinedCount}</strong>.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 flex items-center space-x-3 text-xs">
          <span className="text-xl">✅</span>
          <div>
            <strong>Privacy Threshold Met ({stats.joinedUsersCount} &ge; {partnerPrivacyService.MIN_GROUP_SIZE} Users):</strong> All individual identifiers and cycle details are stripped. Showing aggregate metrics only.
          </div>
        </div>
      )}

      {/* Aggregate Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Enrolled Users */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Total Joined Users
          </div>
          <div className="text-3xl font-extrabold text-slate-800 dark:text-white">
            {isSuppressed ? 'SUPPRESSED (<20)' : stats.joinedUsersCount}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Dual teen + parent consent verified
          </p>
        </div>

        {/* Weekly Active Users */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Weekly Active Users (WAU)
          </div>
          <div className="text-3xl font-extrabold text-pink-600 dark:text-pink-400">
            {isSuppressed ? 'SUPPRESSED (<20)' : stats.activeUsersWeekly}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Active in last 7 days
          </p>
        </div>

        {/* Education Modules Completed */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Education Modules Done
          </div>
          <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
            {isSuppressed ? 'SUPPRESSED (<20)' : stats.educationModulesCompleted}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Completed lessons across cohort
          </p>
        </div>

        {/* Dual Consent Rate */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Verified Consent Rate
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {isSuppressed ? 'SUPPRESSED (<20)' : stats.consentRate}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Teen opt-in + Parent approved
          </p>
        </div>
      </div>

      {/* Regional Breakdown Table */}
      {!isSuppressed && stats.byRegion && (
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Regional Aggregates Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800 uppercase text-[10px] text-slate-500 font-bold">
                <tr>
                  <th className="p-3 rounded-l-lg">Region</th>
                  <th className="p-3">Joined Users</th>
                  <th className="p-3">Active (WAU)</th>
                  <th className="p-3">Education Modules</th>
                  <th className="p-3 rounded-r-lg">Privacy Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {Object.entries(stats.byRegion).map(([reg, val]) => (
                  <tr key={reg}>
                    <td className="p-3 font-semibold text-slate-800 dark:text-white">{reg}</td>
                    <td className="p-3 font-mono">{val.joinedCount}</td>
                    <td className="p-3 font-mono text-pink-600 dark:text-pink-400">{val.activeCount}</td>
                    <td className="p-3 font-mono text-purple-600 dark:text-purple-400">{val.eduCount}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                        SAFE (k &ge; 20)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Funder / Auditor Privacy Statement */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs">
        <strong className="text-slate-700 dark:text-slate-300">Funder Compliance Note:</strong> Aggregate totals are calculated strictly from users with active dual consent. When users withdraw consent, their records are omitted immediately from all aggregate metrics. No cycle data or PII is stored in analytics logs.
      </div>
    </div>
  );
};

export default AggregateDashboard;
