import React from 'react';

export default function SakhiLogo({ size = 'medium', className = '' }) {
  const isLarge = size === 'large';
  return (
    <div className={`sakhi-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      {/* Icon Badge */}
      <div 
        style={{
          width: isLarge ? '42px' : '36px',
          height: isLarge ? '42px' : '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #F77696 0%, #E85C7D 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: isLarge ? '1.25rem' : '1.1rem',
          boxShadow: '0 4px 12px rgba(232, 92, 125, 0.3)',
          flexShrink: 0
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20M17 7l-10 10M7 7l10 10" opacity="0.3" />
          <path d="M12 4a8 8 0 1 0 8 8" />
          <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span 
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: isLarge ? '1.85rem' : '1.35rem',
            fontWeight: '600',
            color: '#E85C7D',
            letterSpacing: '-0.02em',
            lineHeight: 1
          }}
        >
          Sakhi Cycle
        </span>
        <span 
          style={{
            fontFamily: 'var(--font-micro)',
            fontSize: isLarge ? '0.675rem' : '0.625rem',
            fontWeight: '700',
            letterSpacing: '0.14em',
            color: '#8A6B75',
            marginTop: '3px',
            textTransform: 'uppercase'
          }}
        >
          YOUR GENTLE COMPANION
        </span>
      </div>
    </div>
  );
}
