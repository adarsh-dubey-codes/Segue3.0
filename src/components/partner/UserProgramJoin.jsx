/**
 * Sakhi Partner Layer - User Program Join Component (Module B & Consent System)
 * Enables teens to join a partner program with explicit Teen Opt-In + Parent Consent.
 * Features voluntary withdrawal & zero individual cycle data sharing disclaimer.
 */

import React, { useState, useEffect } from 'react';
import partnerService from '../../services/partner/partner.service.js';

export const UserProgramJoin = ({ userId = 'current_user' }) => {
  const [joinCode, setJoinCode] = useState('');
  const [teenOptIn, setTeenOptIn] = useState(false);
  const [parentConsent, setParentConsent] = useState(false);
  const [parentName, setParentName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userMemberships, setUserMemberships] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMemberships();
  }, [userId]);

  const loadMemberships = () => {
    const memberships = partnerService.getUserMemberships(userId);
    setUserMemberships(memberships);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!joinCode.trim()) {
      setError('Please enter a program join code.');
      return;
    }
    if (!teenOptIn) {
      setError('Teen opt-in is required to join a program.');
      return;
    }
    if (!parentConsent) {
      setError('Parent/Guardian consent is required to join a program.');
      return;
    }

    setLoading(true);
    const result = await partnerService.joinProgramByCode({
      userId,
      joinCode: joinCode.trim(),
      teenOptIn,
      parentConsent,
      parentName: parentName.trim() || 'Parent/Guardian'
    });

    setLoading(false);
    if (!result.success) {
      setError(result.error);
    } else {
      setSuccess(`Successfully joined "${result.program.name}"!`);
      setJoinCode('');
      setTeenOptIn(false);
      setParentConsent(false);
      setParentName('');
      loadMemberships();
    }
  };

  const handleLeave = (programId) => {
    if (window.confirm('Are you sure you want to leave this partner program? Your data will be excluded from all future partner reports.')) {
      const result = partnerService.leaveProgram(userId, programId);
      if (result.success) {
        setSuccess('You have left the program. Your data is excluded from future reports.');
        loadMemberships();
      }
    }
  };

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-pink-100 dark:border-slate-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center text-2xl">
          🤝
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Partner Program Access</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Join an NGO, SHG, or school wellness initiative securely.</p>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs leading-relaxed flex items-start space-x-3">
        <span className="text-lg">🛡️</span>
        <div>
          <strong className="font-semibold block mb-1">Strict Privacy Protection Guarantee:</strong>
          Partner organizations only see anonymized aggregate group stats. Your personal name, individual period dates, and cycle symptoms are NEVER shared with anyone.
        </div>
      </div>

      {/* Join Form */}
      <form onSubmit={handleJoin} className="space-y-4 mb-8">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Program Join Code / Program QR Referral
          </label>
          <input
            type="text"
            placeholder="e.g. SAKHI-DELHI-4209"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-mono uppercase text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
          />
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Dual Consent Verification
          </h4>
          
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={teenOptIn}
              onChange={(e) => setTeenOptIn(e.target.checked)}
              className="mt-1 w-4 h-4 text-pink-600 border-slate-300 rounded focus:ring-pink-500"
            />
            <span className="text-xs text-slate-700 dark:text-slate-300">
              <strong>Teen Opt-In:</strong> I voluntarily choose to join this community awareness program.
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={parentConsent}
              onChange={(e) => setParentConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-pink-600 border-slate-300 rounded focus:ring-pink-500"
            />
            <span className="text-xs text-slate-700 dark:text-slate-300">
              <strong>Parent / Guardian Consent:</strong> My parent/guardian has been informed and consents to my participation.
            </span>
          </label>

          {parentConsent && (
            <div className="pt-2">
              <input
                type="text"
                placeholder="Parent/Guardian Name (Optional)"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              />
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-300 text-xs">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-300 text-xs">
            ✅ {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Verifying & Joining...' : 'Join Program'}
        </button>
      </form>

      {/* Active Memberships List */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
          Your Enrolled Partner Programs ({userMemberships.length})
        </h3>

        {userMemberships.length === 0 ? (
          <div className="p-4 text-center rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-500 dark:text-slate-400">
            You are not currently enrolled in any partner program.
          </div>
        ) : (
          <div className="space-y-3">
            {userMemberships.map((m) => {
              const prog = partnerService.getProgramById(m.programId);
              return (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50"
                >
                  <div>
                    <h5 className="text-sm font-semibold text-slate-800 dark:text-white">
                      {prog ? prog.name : m.programId}
                    </h5>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>Joined: {new Date(m.joinedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        Dual Consent Verified
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLeave(m.programId)}
                    className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-medium transition-colors"
                  >
                    Leave Program
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProgramJoin;
