import React from 'react';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '3px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)' }}>
      <Globe size={14} color="var(--rose)" style={{ marginLeft: '8px' }} />
      {Object.values(LANGUAGES).map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            style={{
              background: isActive ? 'var(--pink-vivid)' : 'transparent',
              color: isActive ? '#FFFFFF' : 'var(--text-primary)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '4px 10px',
              fontSize: '0.775rem',
              fontWeight: isActive ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            aria-label={`Switch language to ${lang.label}`}
          >
            {lang.native}
          </button>
        );
      })}
    </div>
  );
}
