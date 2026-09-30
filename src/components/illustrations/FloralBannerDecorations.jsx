import React from 'react';

export function SmallStepsBanner({ className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: 'linear-gradient(135deg, #FFF0F4 0%, #FFE5EC 100%)',
        border: '1px solid #FAD4DE',
        borderRadius: '18px',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ textAlign: 'center', flex: 1 }}>
        <p
          style={{
            fontFamily: "'Caveat', 'Dancing Script', cursive",
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#EC738F',
            margin: 0,
            lineHeight: 1.2
          }}
        >
          Small steps <br /> create big changes ♡
        </p>
      </div>

      <svg width="46" height="46" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Flower Stem & Leaves */}
        <path d="M30 55 C30 35, 25 25, 20 15" stroke="#7BA888" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 55 C30 40, 38 28, 42 18" stroke="#7BA888" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M26 38 C18 34, 14 36, 12 40" stroke="#7BA888" strokeWidth="2" strokeLinecap="round" />
        <path d="M34 34 C42 30, 46 32, 48 36" stroke="#7BA888" strokeWidth="2" strokeLinecap="round" />

        {/* Flower 1 */}
        <g transform="translate(20, 15)">
          <circle cx="0" cy="-6" r="5" fill="#FFB3C6" />
          <circle cx="6" cy="0" r="5" fill="#FFB3C6" />
          <circle cx="0" cy="6" r="5" fill="#FFB3C6" />
          <circle cx="-6" cy="0" r="5" fill="#FFB3C6" />
          <circle cx="0" cy="0" r="3.5" fill="#FFE382" />
        </g>

        {/* Flower 2 */}
        <g transform="translate(42, 18)">
          <circle cx="0" cy="-6" r="5" fill="#FFC2D1" />
          <circle cx="6" cy="0" r="5" fill="#FFC2D1" />
          <circle cx="0" cy="6" r="5" fill="#FFC2D1" />
          <circle cx="-6" cy="0" r="5" fill="#FFC2D1" />
          <circle cx="0" cy="0" r="3.5" fill="#FFE382" />
        </g>
      </svg>
    </div>
  );
}

export function HealthierYouBanner({ className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: 'linear-gradient(135deg, #FFF0F4 0%, #FFE5EC 100%)',
        border: '1px solid #FAD4DE',
        borderRadius: '20px',
        padding: '24px 20px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '0 4px 14px rgba(236, 115, 143, 0.08)'
      }}
    >
      {/* Decorative Floral background SVGs on left and right */}
      <svg
        style={{ position: 'absolute', bottom: 0, left: 10, opacity: 0.85 }}
        width="50"
        height="60"
        viewBox="0 0 60 70"
        fill="none"
      >
        <path d="M15 70 C15 45, 20 30, 25 10" stroke="#7BA888" strokeWidth="3" strokeLinecap="round" />
        <circle cx="25" cy="10" r="8" fill="#FFB3C6" />
        <circle cx="17" cy="18" r="6" fill="#FFC2D1" />
        <circle cx="33" cy="18" r="6" fill="#FFC2D1" />
        <circle cx="25" cy="10" r="4" fill="#FFE382" />
      </svg>

      <svg
        style={{ position: 'absolute', bottom: 0, right: 10, opacity: 0.85 }}
        width="50"
        height="60"
        viewBox="0 0 60 70"
        fill="none"
      >
        <path d="M45 70 C45 45, 40 30, 35 10" stroke="#7BA888" strokeWidth="3" strokeLinecap="round" />
        <circle cx="35" cy="10" r="8" fill="#FFB3C6" />
        <circle cx="27" cy="18" r="6" fill="#FFC2D1" />
        <circle cx="43" cy="18" r="6" fill="#FFC2D1" />
        <circle cx="35" cy="10" r="4" fill="#FFE382" />
      </svg>

      <p
        style={{
          fontFamily: "'Caveat', 'Dancing Script', cursive",
          fontSize: '1.6rem',
          fontWeight: '700',
          color: '#D9486D',
          margin: 0,
          lineHeight: 1.3,
          transform: 'rotate(-2deg)',
          zIndex: 2
        }}
      >
        A healthier you <br /> is a happier you ♡
      </p>
    </div>
  );
}
