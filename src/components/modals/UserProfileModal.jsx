import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRewards } from '../../context/RewardsContext';
import { X, User, Heart, Sparkles, Flame, Shield, Award, Calendar, LogOut, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserProfileModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { streak, coins } = useRewards();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(38, 20, 28, 0.65)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '32px',
          maxWidth: '480px',
          width: '100%',
          padding: '32px 28px',
          boxShadow: '0 24px 60px rgba(62, 36, 43, 0.25)',
          border: '1.5px solid #FAD4DE',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFF0F4',
            border: '1px solid #FAD4DE',
            color: '#B9345D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Profile Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '24px',
              backgroundColor: '#FFF0F4',
              border: '2px solid #FAD4DE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              boxShadow: '0 8px 20px rgba(236, 115, 143, 0.15)'
            }}
          >
            🌸
          </div>

          <div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#271724', margin: 0, fontWeight: '700' }}>
              {user?.name || 'Sakhi Member'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#7D626C', margin: '2px 0 6px 0' }}>
              {user?.email || 'sakhi.member@sakhicycle.com'}
            </p>

            <span
              style={{
                backgroundColor: '#ECFDF5',
                color: '#047857',
                border: '1px solid #A7F3D0',
                borderRadius: '9999px',
                padding: '3px 12px',
                fontSize: '0.75rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CheckCircle2 size={12} color="#047857" /> Active Sakhi Member
            </span>
          </div>
        </div>

        {/* Streak & Sakhi Coins Stats Box */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            backgroundColor: '#FFF7F9',
            border: '1.5px solid #FAD4DE',
            borderRadius: '24px',
            padding: '16px'
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '14px', border: '1px solid #FFE4EC', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
              <Flame size={18} color="#E09F3E" />
              <strong style={{ fontSize: '1.4rem', color: '#271724' }}>{streak}d</strong>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#7D626C', fontWeight: '600' }}>Daily Login Streak</span>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '14px', border: '1px solid #FEF08A', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={18} color="#B9345D" />
              <strong style={{ fontSize: '1.4rem', color: '#271724' }}>{coins.toLocaleString()}</strong>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#7D626C', fontWeight: '600' }}>Sakhi Coins</span>
          </div>
        </div>

        {/* Quick Details List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#FDF3F5', borderRadius: '14px', fontSize: '0.85rem' }}>
            <span style={{ color: '#7D626C', fontWeight: '500' }}>Current Cycle Phase:</span>
            <strong style={{ color: '#BE123C' }}>Luteal Phase (Day 22)</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#FDF3F5', borderRadius: '14px', fontSize: '0.85rem' }}>
            <span style={{ color: '#7D626C', fontWeight: '500' }}>Privacy & Data:</span>
            <strong style={{ color: '#047857' }}>🔒 100% Encrypted</strong>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/cycle');
            }}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '9999px',
              backgroundColor: '#B9345D',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(185, 52, 93, 0.3)'
            }}
          >
            My Cycle Care
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
              navigate('/login');
            }}
            style={{
              padding: '12px 20px',
              borderRadius: '9999px',
              backgroundColor: '#FFF0F4',
              color: '#B9345D',
              border: '1px solid #FAD4DE',
              fontWeight: '700',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
