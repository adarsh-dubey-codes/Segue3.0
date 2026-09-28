import React, { useState } from 'react';
import { lifestylePhases } from '../../data/lifestyleData';
import { useCycle } from '../../context/CycleContext';
import { Utensils, Ban, Activity, Moon, Sparkles, Check } from 'lucide-react';

export default function PhaseGuide() {
  const { currentPhase } = useCycle();
  const [activeTab, setActiveTab] = useState(currentPhase || 'menstrual');

  const phaseKeys = ['menstrual', 'follicular', 'ovulation', 'luteal'];
  const phase = lifestylePhases[activeTab];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Phase Selector Tabs */}
      <div 
        style={{
          display: 'flex',
          gap: '10px',
          backgroundColor: '#FFFFFF',
          padding: '8px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          overflowX: 'auto'
        }}
      >
        {phaseKeys.map((key) => {
          const item = lifestylePhases[key];
          const isSelected = activeTab === key;
          const isUserCurrent = currentPhase === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: isSelected ? 'var(--rose-dark)' : 'transparent',
                color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.9rem',
                fontWeight: isSelected ? '700' : '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span>{item.title}</span>
              {isUserCurrent && (
                <span 
                  style={{
                    fontSize: '0.675rem',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isSelected ? 'var(--rose)' : 'var(--pink-primary)',
                    color: isSelected ? '#FFFFFF' : 'var(--rose-dark)',
                    fontWeight: '700'
                  }}
                >
                  Active Phase
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Phase Header Banner */}
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 32px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          borderLeft: `6px solid ${phase.color}`
        }}
      >
        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', color: phase.color }}>
          {phase.subtitle}
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', color: 'var(--rose-dark)', margin: '4px 0 12px 0' }}>
          {phase.title} Care Guide
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '720px' }}>
          {phase.description}
        </p>
      </div>

      {/* 4 Care Pillars Grid: Nourish, Avoid, Move, Rest */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <style>{`
          @media (max-width: 820px) {
            .lifestyle-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        
        {/* NOURISH */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '8px', borderRadius: '50%', backgroundColor: 'var(--pink-primary)' }}>
              <Utensils size={20} color="var(--rose-dark)" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--rose-dark)' }}>
              Nourish & Hydrate
            </h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {phase.nourish.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                <Check size={16} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AVOID */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '8px', borderRadius: '50%', backgroundColor: '#FFF0F0' }}>
              <Ban size={20} color="var(--danger)" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--rose-dark)' }}>
              Minimize or Avoid
            </h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {phase.avoid.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--danger)', fontWeight: '700', marginTop: '-2px' }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* MOVE */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '8px', borderRadius: '50%', backgroundColor: '#FEF9E7' }}>
              <Activity size={20} color="#E09F3E" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--rose-dark)' }}>
              Movement & Fitness
            </h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {phase.move.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                <Check size={16} color="#E09F3E" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* REST */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '8px', borderRadius: '50%', backgroundColor: '#F0F3FF' }}>
              <Moon size={20} color="#6C5CE7" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--rose-dark)' }}>
              Rest & Self-Care
            </h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {phase.rest.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                <Check size={16} color="#6C5CE7" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
