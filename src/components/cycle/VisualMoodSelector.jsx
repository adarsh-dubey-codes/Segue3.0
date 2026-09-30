import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ILLUSTRATION_REGISTRY from '../../config/illustrationRegistry';

export default function VisualMoodSelector({ value = 'happy', onChange }) {
  const { t } = useLanguage();

  const moods = [
    { id: 'happy', symbol: '😊', label: t('mood.happy'), color: ILLUSTRATION_REGISTRY['mood.happy'].color },
    { id: 'okay', symbol: '🙂', label: t('mood.okay'), color: ILLUSTRATION_REGISTRY['mood.okay'].color },
    { id: 'neutral', symbol: '😐', label: t('mood.neutral'), color: ILLUSTRATION_REGISTRY['mood.neutral'].color },
    { id: 'low', symbol: '😔', label: t('mood.low'), color: ILLUSTRATION_REGISTRY['mood.low'].color },
    { id: 'crampy', symbol: '😣', label: t('mood.crampy'), color: ILLUSTRATION_REGISTRY['mood.crampy'].color }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
        {t('feature.mood.title')}
      </label>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          width: '100%'
        }}
      >
        {moods.map((m) => {
          const isSelected = value === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange && onChange(m.id)}
              aria-label={`Select ${m.label}`}
              aria-pressed={isSelected}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 4px',
                borderRadius: '16px',
                border: `2px solid ${isSelected ? m.color : 'var(--border)'}`,
                backgroundColor: isSelected ? `${m.color}15` : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                boxShadow: isSelected ? `0 4px 12px ${m.color}25` : 'none'
              }}
            >
              <span style={{ fontSize: '2rem', lineHeight: 1.2 }}>{m.symbol}</span>
              <span 
                style={{ 
                  fontSize: '0.725rem', 
                  fontWeight: isSelected ? '700' : '500', 
                  color: isSelected ? m.color : 'var(--text-secondary)',
                  marginTop: '4px',
                  textAlign: 'center'
                }}
              >
                {m.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
