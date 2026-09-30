import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function VisualFlowSelector({ value = 'medium', onChange }) {
  const { t } = useLanguage();

  const flows = [
    { id: 'light', drops: '💧', label: t('flow.light'), color: '#00CEC9' },
    { id: 'medium', drops: '💧💧', label: t('flow.medium'), color: '#EC738F' },
    { id: 'heavy', drops: '💧💧💧', label: t('flow.heavy'), color: '#D32F2F' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
        Flow
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {flows.map((f) => {
          const isSelected = value === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange && onChange(f.id)}
              aria-label={`Select ${f.label}`}
              aria-pressed={isSelected}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 8px',
                borderRadius: '16px',
                border: `2px solid ${isSelected ? f.color : 'var(--border)'}`,
                backgroundColor: isSelected ? `${f.color}15` : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                transform: isSelected ? 'scale(1.03)' : 'scale(1)'
              }}
            >
              <span style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{f.drops}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: isSelected ? '700' : '500', color: isSelected ? f.color : 'var(--text-secondary)' }}>
                {f.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
