/**
 * Sakhi Partner Layer - Main Partner Portal Page
 * Role-Based Access Control (partner_admin, field_worker, funder_viewer)
 * Integrates Program Manager, Aggregate Dashboard, and Audit Logs.
 */

import React, { useState } from 'react';
import ProgramManager from '../../components/partner/ProgramManager.jsx';
import AggregateDashboard from '../../components/partner/AggregateDashboard.jsx';
import PartnerAuditLogViewer from '../../components/partner/PartnerAuditLogViewer.jsx';
import UserProgramJoin from '../../components/partner/UserProgramJoin.jsx';
import partnerService from '../../services/partner/partner.service.js';

export const PartnerPortalPage = () => {
  const [activeRole, setActiveRole] = useState('partner_admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProgramId, setSelectedProgramId] = useState('prog-demo-001');

  const handleRoleChange = (role) => {
    setActiveRole(role);
    // Adjust default tab based on role
    if (role === 'funder_viewer') {
      setActiveTab('dashboard');
    } else if (role === 'field_worker') {
      setActiveTab('join');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header & Role Switcher */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-700 text-white shadow-xl">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-2">
              <span>🌾 Sakhi Rural Partner Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">NGO & Social Enterprise Network</h1>
            <p className="text-xs sm:text-sm text-pink-100 mt-1 max-w-xl">
              Privacy-first menstrual health analytics, field program referral QR codes, and funder transparency.
            </p>
          </div>

          {/* Role Switcher (Module A) */}
          <div className="bg-white/10 dark:bg-slate-900/40 p-2 rounded-xl border border-white/20 backdrop-blur-md">
            <div className="text-[10px] uppercase font-bold text-pink-200 mb-1 px-1">Active Role RBAC</div>
            <div className="flex items-center space-x-1">
              {[
                { id: 'partner_admin', label: 'Admin', icon: '👑' },
                { id: 'field_worker', label: 'Field Worker', icon: '🌾' },
                { id: 'funder_viewer', label: 'Funder Viewer', icon: '👁️' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
                    activeRole === r.id
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          {activeRole !== 'field_worker' && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              📊 Aggregate Dashboard
            </button>
          )}

          {activeRole === 'partner_admin' && (
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'programs'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              🏢 Manage Programs & QRs
            </button>
          )}

          <button
            onClick={() => setActiveTab('join')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'join'
                ? 'bg-pink-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            🤝 Teen Program Join & Consent
          </button>

          {activeRole === 'partner_admin' && (
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              📋 Privacy Audit Logs
            </button>
          )}
        </div>

        {/* Tab Content Rendering */}
        {activeTab === 'dashboard' && activeRole !== 'field_worker' && (
          <AggregateDashboard
            programId={selectedProgramId}
            actorId={`Partner (${activeRole})`}
            role={activeRole}
          />
        )}

        {activeTab === 'programs' && activeRole === 'partner_admin' && (
          <ProgramManager
            selectedProgramId={selectedProgramId}
            onSelectProgram={setSelectedProgramId}
          />
        )}

        {activeTab === 'join' && (
          <UserProgramJoin userId="teen_user_demo" />
        )}

        {activeTab === 'audit' && activeRole === 'partner_admin' && (
          <PartnerAuditLogViewer />
        )}
      </div>
    </div>
  );
};

export default PartnerPortalPage;
