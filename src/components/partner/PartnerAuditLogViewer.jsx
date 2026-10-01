/**
 * Sakhi Partner Layer - Audit Log Viewer Component (Privacy Rule #5)
 * Displays structured logs of every partner access attempt (Who, What, When, Details).
 */

import React, { useState, useEffect } from 'react';
import partnerPrivacyService from '../../services/partner/partnerPrivacy.service.js';

export const PartnerAuditLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filterAction, setFilterAction] = useState('ALL');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    const data = partnerPrivacyService.getAccessLogs();
    setLogs(data);
  };

  const handleClearLogs = () => {
    if (window.confirm('Clear local partner access logs? (In production, logs are immutably persisted)')) {
      partnerPrivacyService.clearAccessLogs();
      loadLogs();
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filterAction === 'ALL') return true;
    return log.action.includes(filterAction);
  });

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-pink-100 dark:border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            📋 Immutable Partner Access Logs
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Compliance log recording every partner query, export, API call, and access attempt (Who, What, When).
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
          >
            <option value="ALL">All Actions</option>
            <option value="AGGREGATE">Aggregate Queries</option>
            <option value="EXPORT">CSV Exports</option>
            <option value="API">API Requests</option>
            <option value="CONSENT">Consent Events</option>
          </select>
          <button
            onClick={loadLogs}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100 dark:bg-slate-800 uppercase text-[10px] text-slate-500 font-bold">
            <tr>
              <th className="p-3">Timestamp (UTC)</th>
              <th className="p-3">Actor (Who)</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action (What)</th>
              <th className="p-3">Program ID</th>
              <th className="p-3">Details / Privacy Check</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-400 font-sans">
                  No access log entries recorded yet.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3 whitespace-nowrap text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">{log.actorId}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px]">
                      {log.actorRole}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-pink-600 dark:text-pink-400">{log.action}</td>
                  <td className="p-3 text-slate-500">{log.programId || 'N/A'}</td>
                  <td className="p-3 text-xs font-sans text-slate-600 dark:text-slate-400">{log.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartnerAuditLogViewer;
