import React from 'react';

export default function SakhiHeaderBrand() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Sakhi Emblem Logo Icon */}
      <div 
        style={{ 
          marginBottom: '10px', 
          display: 'inline-flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }}
        className="sakhi-logo-emblem"
      >
        <svg width="88" height="88" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="emblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF0F4" />
              <stop offset="50%" stopColor="#FCE3EB" />
              <stop offset="100%" stopColor="#FAD4E0" />
            </linearGradient>
            
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F46B8C" />
              <stop offset="50%" stopColor="#E5436C" />
              <stop offset="100%" stopColor="#B3254A" />
            </linearGradient>

            <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6584" />
              <stop offset="100%" stopColor="#C9184A" />
            </linearGradient>

            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE0E6" />
              <stop offset="100%" stopColor="#F8C4D0" />
            </linearGradient>

            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#9E2A4B" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Background Circle Frame */}
          <circle cx="50" cy="50" r="46" fill="url(#emblemBg)" stroke="#F5C0CE" strokeWidth="1.5" filter="url(#softShadow)" />

          {/* Hair Flow Silhouette */}
          <path 
            d="M 50 14 C 30 14 18 30 18 52 C 18 70 30 84 50 84 C 54 84 42 74 40 64 C 38 52 46 42 52 32 C 55 27 58 20 50 14 Z" 
            fill="url(#hairGrad)" 
          />
          
          <path 
            d="M 50 14 C 64 14 74 24 74 36 C 74 46 66 52 64 62 C 61 74 72 78 68 84 C 58 84 56 74 54 66 C 52 56 62 48 64 38 C 65 30 58 20 50 14 Z" 
            fill="url(#hairGrad)" 
            opacity="0.9"
          />

          {/* Gentle Face Profile */}
          <path 
            d="M 46 32 C 48 35 52 37 53 41 C 54 44 50 48 51 52 C 52 54 55 56 53 59 C 51 61 46 62 46 62 C 46 62 42 56 42 48 C 42 40 46 32 46 32 Z" 
            fill="url(#skinGrad)" 
          />

          {/* Central Water Drop / Petal Symbol */}
          <path 
            d="M 50 44 C 50 44 60 56 60 64 C 60 70 55.5 74 50 74 C 44.5 74 40 70 40 64 C 40 56 50 44 50 44 Z" 
            fill="url(#dropGrad)" 
          />
          
          {/* Inner Drop Highlight */}
          <path 
            d="M 48 52 C 48 52 54 60 54 65 C 54 68 51.5 70 49 70 C 47 70 46 68 47 65 C 47 62 48 52 48 52 Z" 
            fill="#FFA6B9" 
            opacity="0.6"
          />
        </svg>

        <span 
          style={{ 
            fontFamily: "'Playfair Display', Georgia, serif", 
            fontSize: '1.45rem', 
            fontWeight: '600', 
            color: '#6D2D49',
            letterSpacing: '-0.01em',
            marginTop: '4px'
          }}
        >
          Sakhi Cycle
        </span>
      </div>

      {/* Main Headline: "Apki apni Sakhi" */}
      <h1 
        style={{ 
          fontFamily: "'Playfair Display', Cormorant Garamond, Georgia, serif",
          fontSize: 'clamp(2.1rem, 5vw, 2.75rem)', 
          fontWeight: '700',
          color: '#38232A',
          lineHeight: '1.2',
          margin: '12px 0 6px 0',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        <span>Apki apni</span>
        <span 
          style={{ 
            color: '#EC738F', 
            position: 'relative',
            display: 'inline-block',
            fontStyle: 'italic',
            fontWeight: '600'
          }}
        >
          Sakhi
          {/* Swoosh Underline with Sparkles */}
          <svg 
            width="120" 
            height="20" 
            viewBox="0 0 120 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              bottom: '-12px',
              left: '-8px',
              width: '110%',
              overflow: 'visible',
              pointerEvents: 'none'
            }}
          >
            <path 
              d="M 4 8 C 30 14, 75 16, 110 8 C 114 7, 100 12, 60 14" 
              stroke="#EC738F" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              opacity="0.85"
            />
            {/* Sparkle 1 */}
            <path d="M 112 5 L 114 1 L 116 5 L 120 7 L 116 9 L 114 13 L 112 9 L 108 7 Z" fill="#EC738F" opacity="0.9" />
            {/* Sparkle 2 */}
            <path d="M 103 12 L 104.5 9 L 106 12 L 109 13.5 L 106 15 L 104.5 18 L 103 15 L 100 13.5 Z" fill="#FFB3C6" opacity="0.75" />
          </svg>
        </span>
      </h1>

      {/* Subtitles matching screenshot */}
      <div style={{ marginTop: '14px' }}>
        <p 
          style={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.8rem', 
            fontWeight: '700',
            letterSpacing: '0.22em',
            color: '#6D2D49',
            textTransform: 'uppercase',
            marginBottom: '4px'
          }}
        >
          SAKHI CYCLE
        </p>
        <p 
          style={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.975rem', 
            color: '#8C6C79',
            fontWeight: '400'
          }}
        >
          Your cycle. Your space. Your privacy.
        </p>
      </div>
    </div>
  );
}
