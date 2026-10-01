/**
 * Sakhi Partner Layer - Program Manager Component (Module B & H)
 * Allows Partner Admins to create new programs, select billing plans (pilot/licence),
 * and view/download program referral join codes and QR codes.
 */

import React, { useState, useEffect } from 'react';
import partnerService from '../../services/partner/partner.service.js';

export const ProgramManager = ({ onSelectProgram, selectedProgramId }) => {
  const [programs, setPrograms] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    region: 'North India (Delhi/UP/Bihar)',
    language: 'hi',
    plan: 'pilot',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    const list = partnerService.getAllPrograms();
    setPrograms(list);
    if (list.length > 0 && !selectedProgramId) {
      onSelectProgram(list[0].id);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Program name is required.');
      return;
    }

    const newProg = partnerService.createProgram({
      name: formData.name.trim(),
      region: formData.region,
      language: formData.language,
      plan: formData.plan,
      description: formData.description.trim()
    });

    setSuccess(`Program "${newProg.name}" created successfully! Code: ${newProg.joinCode}`);
    setFormData({
      name: '',
      region: 'North India (Delhi/UP/Bihar)',
      language: 'hi',
      plan: 'pilot',
      description: ''
    });
    setShowCreateModal(false);
    loadPrograms();
    onSelectProgram(newProg.id);
  };

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-pink-100 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            🏢 Partner Programs & Referral QRs
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage field projects, billing plans, and referral join codes.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="py-2.5 px-4 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>✨ Create New Program</span>
        </button>
      </div>

      {success && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs">
          ✅ {success}
        </div>
      )}

      {/* Program Selector List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {programs.map((prog) => {
          const isSelected = prog.id === selectedProgramId;
          const qrData = partnerService.getProgramQRCode(prog.id);

          return (
            <div
              key={prog.id}
              onClick={() => onSelectProgram(prog.id)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/20 ring-2 ring-pink-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-pink-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  prog.plan === 'licence' 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' 
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                }`}>
                  {prog.plan} Plan
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  {prog.region}
                </span>
              </div>

              <h4 className="font-bold text-slate-800 dark:text-white text-base mb-1">{prog.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Language: {prog.language.toUpperCase()}</p>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Join Code</div>
                  <div className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400">{prog.joinCode}</div>
                </div>

                {/* Micro QR Visual */}
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-xs font-mono font-bold text-slate-700 dark:text-slate-300 border">
                  QR
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Program Details & Full QR Code View */}
      {selectedProgramId && (
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
          {(() => {
            const prog = partnerService.getProgramById(selectedProgramId);
            if (!prog) return null;
            const qr = partnerService.getProgramQRCode(prog.id);

            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">{prog.name}</h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                      ID: {prog.id}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-mono font-bold">
                      Code: {prog.joinCode}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                      Plan: {prog.plan.toUpperCase()} (Billing Placeholder Active)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pt-2">
                    Region: <strong>{prog.region}</strong> | Primary Language: <strong>{prog.language.toUpperCase()}</strong>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    Share the join code or QR code during community field sessions. Teenagers enter this code to link their dual consent.
                  </p>
                </div>

                {/* QR Display */}
                <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                  <div className="w-32 h-32 mb-2 p-2 bg-white rounded-lg border flex items-center justify-center">
                    <img src={qr.qrDataUrl} alt="Program QR Code" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Scan to Join Sakhi Program</span>
                  <a
                    href={qr.qrDataUrl}
                    download={`Sakhi-QR-${prog.joinCode}.svg`}
                    className="mt-2 text-xs text-pink-600 dark:text-pink-400 hover:underline font-medium"
                  >
                    Download QR Image
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Create Program Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Create New Partner Program</h3>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Program Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhi Rural Adolescent Health Initiative"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Target Region
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs"
                >
                  <option value="North India (Delhi/UP/Bihar)">North India (Delhi/UP/Bihar)</option>
                  <option value="Central India (MP/Chhattisgarh)">Central India (MP/Chhattisgarh)</option>
                  <option value="Western India (Rajasthan/Gujarat)">Western India (Rajasthan/Gujarat)</option>
                  <option value="Southern India (TN/KA/AP/TS)">Southern India (TN/KA/AP/TS)</option>
                  <option value="Eastern India (WB/Odisha/Jharkhand)">Eastern India (WB/Odisha/Jharkhand)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Primary Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs"
                >
                  <option value="hi">Hindi (हिन्दी)</option>
                  <option value="en">English</option>
                  <option value="mr">Marathi (मराठी)</option>
                  <option value="ta">Tamil (தமிழ்)</option>
                  <option value="te">Telugu (తెలుగు)</option>
                  <option value="bn">Bengali (বাংলা)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Billing Plan (Placeholder)
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs"
                >
                  <option value="pilot">Pilot Plan (Free / 1 Program / up to 500 members)</option>
                  <option value="licence">Enterprise Licence Plan (Unlimited Programs & Aggregates)</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-pink-600 text-white font-semibold text-xs shadow-md"
                >
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramManager;
