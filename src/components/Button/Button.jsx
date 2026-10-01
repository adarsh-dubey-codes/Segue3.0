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
      backgroundColor: '#B9345D',
      color: '#FFFFFF',
      fontWeight: '700',
      border: '1.5px solid #B9345D',
      boxShadow: '0 4px 14px rgba(185, 52, 93, 0.35)'
    };
  } else if (isSecondary) {
    variantStyle = {
      backgroundColor: '#FFE5EC',
      color: '#B9345D',
      borderColor: '#FAD4DE',
      fontWeight: '700'
    };
  } else if (isOutline) {
    variantStyle = {
      backgroundColor: '#FFFFFF',
      color: '#7D626C',
      borderColor: '#FAD4DE',
      fontWeight: '600'
    };
  } else if (isText) {
    variantStyle = {
      backgroundColor: 'transparent',
      color: '#B9345D',
      padding: '6px 12px',
      fontWeight: '600'
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
