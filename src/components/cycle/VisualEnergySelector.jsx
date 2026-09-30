import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function VisualEnergySelector({ value = 'normal', onChange }) {
  const { t } = useLanguage();

  const levels = [
    { id: 'high', symbol: '⚡', label: t('energy.high'), color: '#E09F3E' },
    { id: 'normal', symbol: '🌤️', label: t('energy.normal'), color: '#0984E3' },
    { id: 'low', symbol: '🌙', label: t('energy.low'), color: '#6C5CE7' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
        Energy Level
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {levels.map((l) => {
          const isSelected = value === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onChange && onChange(l.id)}
              aria-label={`Select ${l.label}`}
              aria-pressed={isSelected}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 8px',
                borderRadius: '16px',
                border: `2px solid ${isSelected ? l.color : 'var(--border)'}`,
                backgroundColor: isSelected ? `${l.color}15` : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                transform: isSelected ? 'scale(1.03)' : 'scale(1)'
              }}
            >
              <span style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{l.symbol}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: isSelected ? '700' : '500', color: isSelected ? l.color : 'var(--text-secondary)' }}>
                {l.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
