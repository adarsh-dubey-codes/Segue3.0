import React from 'react';
import { useRewards } from '../../context/RewardsContext';
import { X, Flame, Sparkles, Award, CheckCircle2, Gift, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StreakRewardsModal({ isOpen, onClose }) {
  const { streak, coins } = useRewards();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const weekDays = [
    { day: 'Mon', coins: '+1 🪙', claimed: true },
    { day: 'Tue', coins: '+1 🪙', claimed: true },
    { day: 'Wed', coins: '+1 🪙', claimed: true },
    { day: 'Thu', coins: '+1 🪙', claimed: true },
    { day: 'Fri', coins: '+1 🪙', claimed: true },
    { day: 'Sat', coins: '+1 🪙', claimed: true },
    { day: 'Sun', coins: '+10 🎁', claimed: true }
  ];

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
          maxWidth: '500px',
          width: '100%',
          padding: '32px 28px',
          boxShadow: '0 24px 60px rgba(62, 36, 43, 0.25)',
          border: '1.5px solid #FDE8ED',
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

        {/* Modal Header */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#FEF9EF',
              border: '2px solid #FEF08A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              margin: '0 auto 12px auto',
              boxShadow: '0 10px 25px rgba(224, 159, 62, 0.2)'
            }}
          >
            🔥
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', color: '#271724', margin: 0, fontWeight: '700' }}>
            Daily Streak & Sakhi Coins
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#7D626C', margin: '4px 0 0 0' }}>
            Log in every day to keep your streak alive and earn Sakhi Coins!
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ backgroundColor: '#FFF0F4', border: '1.5px solid #FAD4DE', borderRadius: '20px', padding: '16px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '2px' }}>
              <Flame size={20} color="#E09F3E" />
              <strong style={{ fontSize: '1.5rem', color: '#B9345D' }}>{streak} Days</strong>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#7D626C', fontWeight: '600' }}>Active Streak</span>
          </div>

          <div style={{ backgroundColor: '#FEF9EF', border: '1.5px solid #FEF08A', borderRadius: '20px', padding: '16px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '2px' }}>
              <Sparkles size={20} color="#CA8A04" />
              <strong style={{ fontSize: '1.5rem', color: '#854D0E' }}>{coins.toLocaleString()}</strong>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#854D0E', fontWeight: '600' }}>Sakhi Coins</span>
          </div>
        </div>

        {/* 7-Day Streak Progression Bar */}
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9CA3AF', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>
            7-Day Check-in Tracker:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {weekDays.map((w, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: w.claimed ? '#ECFDF5' : '#FFFFFF',
                  border: w.claimed ? '1.5px solid #A7F3D0' : '1px solid #E5E7EB',
                  borderRadius: '14px',
                  padding: '8px 4px',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '0.7rem', color: '#6B7280', display: 'block', marginBottom: '2px' }}>{w.day}</span>
                <strong style={{ fontSize: '0.75rem', color: w.claimed ? '#047857' : '#374151', display: 'block' }}>{w.coins}</strong>
                {w.claimed && <CheckCircle2 size={12} color="#047857" style={{ marginTop: '4px' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Coins */}
        <div style={{ backgroundColor: '#FDF3F5', borderRadius: '20px', padding: '14px 16px', border: '1px solid #FAD4DE', fontSize: '0.825rem', color: '#7D626C', lineHeight: 1.5 }}>
          <strong style={{ color: '#B9345D', display: 'block', marginBottom: '4px' }}>💡 How Sakhi Coins Work:</strong>
          Earn +1 Sakhi Coin every day you open Sakhi Cycle. Redeem coins for period product discounts, free doctor consultation passes, or health badges!
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate('/products');
          }}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '9999px',
            backgroundColor: '#B9345D',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(185, 52, 93, 0.35)'
          }}
        >
          Redeem Coins in Marketplace <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
