import React from 'react';
import { useCycle } from '../../context/CycleContext';
import { Sparkles, Moon, Droplets, Flame } from 'lucide-react';

export default function CycleGarden() {
  const { plantStage, plantIcon, streakCount, totalLogs, avgSleep, avgWater } = useCycle();

  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rose)' }}>
            Gentle Growth
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--rose-dark)' }}>
            Your Cycle Garden
          </h3>
        </div>
        <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>
          {plantIcon}
        </div>
      </div>

      <div 
        style={{
          backgroundColor: 'var(--surface-soft)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '20px',
          border: '1px solid var(--border)'
        }}
      >
        <div style={{ fontSize: '1.8rem' }}>{plantIcon}</div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current Stage</span>
          <p style={{ fontWeight: '700', color: 'var(--rose-dark)', fontSize: '1.05rem' }}>
            {plantStage}
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Logging daily care nurtures your plant gently.
          </span>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'var(--background)', padding: '12px 6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <Flame size={16} color="var(--rose)" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Streak</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--rose-dark)' }}>{streakCount}d</strong>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: 'var(--background)', padding: '12px 6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <Sparkles size={16} color="#E09F3E" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Logs</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--rose-dark)' }}>{totalLogs}</strong>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: 'var(--background)', padding: '12px 6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <Moon size={16} color="#6C5CE7" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Sleep</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--rose-dark)' }}>{avgSleep}h</strong>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: 'var(--background)', padding: '12px 6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <Droplets size={16} color="#0984E3" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Water</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--rose-dark)' }}>{avgWater}c</strong>
        </div>
      </div>
    </div>
  );
}
