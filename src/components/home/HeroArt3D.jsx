import React from 'react';

export default function HeroArt3D({ affirmation = "Every phase of my cycle is a phase of my power." }) {
  return (
    <div 
      className="hero-art-container"
      style={{
        width: '100%',
        height: '380px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #FFC4D0 0%, #FFB3C1 40%, #FFA2B3 100%)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 10px rgba(255, 255, 255, 0.5), 0 10px 30px rgba(236, 115, 143, 0.2)'
      }}
    >
      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes floatReverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes waveGlow {
          0% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0.85; transform: scale(1); }
        }
      `}</style>

      {/* 3D Glossy Floating Spheres */}
      {/* Large Top-Right Sphere */}
      <div 
        style={{
          position: 'absolute',
          top: '20px',
          right: '50px',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FFD6DE 30%, #F48AA3 70%, #D45874 100%)',
          boxShadow: '0 15px 35px rgba(180, 50, 80, 0.25), inset 0 -4px 10px rgba(150, 30, 60, 0.3)',
          animation: 'floatSlow 6s ease-in-out infinite'
        }}
      />

      {/* Medium Top-Center Sphere */}
      <div 
        style={{
          position: 'absolute',
          top: '70px',
          right: '200px',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FFE2E8 35%, #F48AA3 75%, #D45874 100%)',
          boxShadow: '0 10px 20px rgba(180, 50, 80, 0.2)',
          animation: 'floatReverse 5s ease-in-out infinite'
        }}
      />

      {/* Small Left Sphere */}
      <div 
        style={{
          position: 'absolute',
          top: '120px',
          left: '40px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FFE2E8 40%, #F48AA3 100%)',
          boxShadow: '0 6px 12px rgba(180, 50, 80, 0.15)',
          animation: 'floatSlow 7s ease-in-out infinite'
        }}
      />

      {/* Large Bottom-Right Sphere */}
      <div 
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '20px',
          width: '75px',
          height: '75px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FFD6DE 30%, #F48AA3 75%, #C24662 100%)',
          boxShadow: '0 12px 28px rgba(180, 50, 80, 0.22)',
          animation: 'floatSlow 5.5s ease-in-out infinite'
        }}
      />

      {/* 3D Organic Smooth Ribbon Wave SVG */}
      <svg
        viewBox="0 0 500 300"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          animation: 'waveGlow 8s ease-in-out infinite'
        }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#FFC6D3" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#F57C99" stopOpacity="0.65" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Ribbon Flow Curve */}
        <path
          d="M -20 220 C 100 120, 200 280, 320 160 C 400 80, 480 200, 520 180 C 520 320, -20 320, -20 220 Z"
          fill="url(#waveGradient)"
          filter="url(#softGlow)"
        />

        {/* Secondary Delicate Ribbon Edge */}
        <path
          d="M -20 200 C 120 140, 220 260, 340 140 C 420 90, 490 190, 520 160"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>

      {/* Floating Delicate Cherry Blossom Petals */}
      <div style={{ position: 'absolute', top: '130px', right: '140px', fontSize: '1.4rem', opacity: 0.9, animation: 'floatSlow 4s ease-in-out infinite' }}>
        🌸
      </div>
      <div style={{ position: 'absolute', bottom: '100px', right: '90px', fontSize: '1.1rem', opacity: 0.85, animation: 'floatReverse 6s ease-in-out infinite' }}>
        🌸
      </div>

      {/* GLASSMORPHIC AFFIRMATION OVERLAY CARD */}
      <div 
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '16px 20px',
          maxWidth: '280px',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 24px rgba(180, 50, 80, 0.12)'
        }}
      >
        <span 
          style={{
            fontFamily: 'var(--font-micro)',
            fontSize: '0.675rem',
            fontWeight: '700',
            letterSpacing: '0.12em',
            color: '#8A6B75',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '4px'
          }}
        >
          TODAY'S AFFIRMATION
        </span>
        <p 
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#38232A',
            lineHeight: '1.4'
          }}
        >
          "{affirmation}"
        </p>
      </div>
    </div>
  );
}
