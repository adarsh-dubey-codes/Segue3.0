import React from 'react';

export default function Button({
  children,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'text'
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon = null,
  ...props
}) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isText = variant === 'text';

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.95rem',
    fontWeight: '500',
    fontFamily: 'var(--font-sans)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-fast)',
    border: '1px solid transparent',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || loading ? 0.65 : 1,
    textDecoration: 'none'
  };

  let variantStyle = {};
  if (isPrimary) {
    variantStyle = {
      backgroundColor: 'var(--deep-plum)',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-sm)'
    };
  } else if (isSecondary) {
    variantStyle = {
      backgroundColor: 'var(--soft-pink)',
      color: 'var(--deep-plum)',
      borderColor: 'var(--border-color)'
    };
  } else if (isOutline) {
    variantStyle = {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-color)'
    };
  } else if (isText) {
    variantStyle = {
      backgroundColor: 'transparent',
      color: 'var(--rose-accent)',
      padding: '6px 12px'
    };
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`sakhi-btn sakhi-btn-${variant} ${className}`}
      style={{ ...baseStyle, ...variantStyle }}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            style={{ animation: 'spin 1s linear infinite' }}
          >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2 a 10 10 0 0 1 10 10" />
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
