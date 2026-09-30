import React from 'react';
import logoImg from '../../assets/logo.jpg';

export default function SakhiLogo({ size = 'medium', className = '' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const height = isLarge ? '120px' : isSmall ? '38px' : '48px';

  return (
    <div 
      className={`sakhi-logo ${className}`} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center',
        textDecoration: 'none' 
      }}
    >
      <img 
        src={logoImg} 
        alt="Sakhi Cycle — Understand • Track • Thrive" 
        style={{
          height: height,
          width: 'auto',
          objectFit: 'contain',
          borderRadius: isLarge ? '16px' : '8px',
          boxShadow: isLarge ? '0 8px 24px rgba(232, 92, 125, 0.15)' : 'none',
          transition: 'transform 0.2s ease',
        }}
      />
    </div>
  );
}

