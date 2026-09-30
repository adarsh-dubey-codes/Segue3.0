import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ILLUSTRATION_REGISTRY from '../../config/illustrationRegistry';

export default function CyclePhaseVisual({ 
  currentPhase = 'period', 
  currentDay = 1, 
  totalDays = 28,
  onPhaseSelect 
}) {
  const { t } = useLanguage();

  const phases = [
    { key: 'period', symbol: '🩸', label: t('phase.period'), sub: t('phase.period.sub'), item: ILLUSTRATION_REGISTRY['phase.period'] },
    { key: 'follicular', symbol: '🌱', label: t('phase.follicular'), sub: t('phase.follicular.sub'), item: ILLUSTRATION_REGISTRY['phase.follicular'] },
    { key: 'ovulation', symbol: '☀️', label: t('phase.ovulation'), sub: t('phase.ovulation.sub'), item: ILLUSTRATION_REGISTRY['phase.ovulation'] },
    { key: 'luteal', symbol: '🌙', label: t('phase.luteal'), sub: t('phase.luteal.sub'), item: ILLUSTRATION_REGISTRY['phase.luteal'] }
  ];

  const activeIndex = phases.findIndex(p => p.key === currentPhase.toLowerCase()) >= 0 
    ? phases.findIndex(p => p.key === currentPhase.toLowerCase()) 
    : 0;

  const progressPercent = Math.min(100, Math.max(5, (currentDay / totalDays) * 100));

  return (
    <div 
      className="sakhi-visual-phase-card"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
        width: '100%'
      }}
    >
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: phases[activeIndex].item.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              boxShadow: `0 4px 14px ${phases[activeIndex].item.color}30`
            }}
            role="img"
            aria-label={phases[activeIndex].item.ariaLabel}
          >
            {phases[activeIndex].symbol}
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: phases[activeIndex].item.color, letterSpacing: '0.08em' }}>
              Day {currentDay} of {totalDays}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0, fontWeight: '600' }}>
              {phases[activeIndex].label}
            </h3>
          </div>
        </div>

        <span
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: phases[activeIndex].item.bg,
            color: phases[activeIndex].item.color,
            fontSize: '0.825rem',
            fontWeight: '600',
            border: `1px solid ${phases[activeIndex].item.color}40`
          }}
        >
          {phases[activeIndex].sub}
        </span>
      </div>

      {/* Visual Phase Progression Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--surface-soft)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${progressPercent}%`, 
              backgroundColor: phases[activeIndex].item.color,
              transition: 'width 0.4s ease'
            }} 
          />
        </div>
      </div>

      {/* 4 Interactive Visual Stage Pills */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '12px' 
        }}
      >
        {phases.map((p, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onPhaseSelect && onPhaseSelect(p.key)}
              aria-label={`Select ${p.label}`}
              style={{
                background: isActive ? p.item.bg : '#FFFFFF',
                border: `2px solid ${isActive ? p.item.color : 'var(--border)'}`,
                borderRadius: '16px',
                padding: '12px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? `0 6px 18px ${p.item.color}25` : 'none'
              }}
            >
              <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{p.symbol}</span>
              <span 
                style={{ 
                  fontSize: '0.775rem', 
                  fontWeight: isActive ? '700' : '500', 
                  color: isActive ? p.item.color : 'var(--text-secondary)',
                  textAlign: 'center'
                }}
              >
                {p.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
