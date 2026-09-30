import React from 'react';
import ILLUSTRATION_REGISTRY from '../../config/illustrationRegistry';

export default function FeatureIllustration({ name, size = 64, className = '' }) {
  const item = ILLUSTRATION_REGISTRY[`feature.${name}`] || ILLUSTRATION_REGISTRY['feature.cycle'];

  return (
    <div 
      className={`sakhi-feature-art ${className}`}
      role="img"
      aria-label={item.ariaLabel}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        borderRadius: '24px',
        backgroundColor: item.bg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: `0 8px 24px ${item.color}20`,
        flexShrink: 0,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <svg
        width="80%"
        height="80%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="42" fill={item.color} fillOpacity="0.15" />
        {/* Render Vector Motif based on name */}
        {name === 'cycle' && (
          <g>
            <rect x="25" y="30" width="50" height="48" rx="8" fill="#FFFFFF" stroke={item.color} strokeWidth="4" />
            <path d="M25 42H75" stroke={item.color} strokeWidth="4" />
            <circle cx="37" cy="24" r="4" fill={item.color} />
            <circle cx="63" cy="24" r="4" fill={item.color} />
            <path d="M50 50C50 50 42 60 42 66C42 70.4 45.6 74 50 74C54.4 74 58 70.4 58 66C58 60 50 50 50 50Z" fill={item.color} />
          </g>
        )}
        {name === 'mood' && (
          <g>
            <circle cx="50" cy="50" r="34" fill="#FFFFFF" stroke={item.color} strokeWidth="4" />
            <circle cx="38" cy="44" r="4" fill={item.color} />
            <circle cx="62" cy="44" r="4" fill={item.color} />
            <path d="M36 62C42 70 58 70 64 62" stroke={item.color} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M72 26L76 34" stroke={item.color} strokeWidth="4" strokeLinecap="round" />
            <circle cx="76" cy="24" r="4" fill={item.color} />
          </g>
        )}
        {name === 'chat' && (
          <g>
            <rect x="20" y="24" width="60" height="44" rx="12" fill="#FFFFFF" stroke={item.color} strokeWidth="4" />
            <path d="M34 68L28 78L44 68H34Z" fill="#FFFFFF" stroke={item.color} strokeWidth="4" strokeLinejoin="round" />
            <circle cx="38" cy="46" r="4" fill={item.color} />
            <circle cx="50" cy="46" r="4" fill={item.color} />
            <circle cx="62" cy="46" r="4" fill={item.color} />
          </g>
        )}
        {name === 'eat' && (
          <g>
            <path d="M22 56C22 71.4 34.5 84 50 84C65.5 84 78 71.4 78 56H22Z" fill="#FFFFFF" stroke={item.color} strokeWidth="4" />
            <path d="M36 34C36 26 44 20 50 20C56 20 64 26 64 34V56H36V34Z" fill={item.color} fillOpacity="0.3" stroke={item.color} strokeWidth="4" />
            <circle cx="50" cy="42" r="6" fill={item.color} />
          </g>
        )}
        {name === 'move' && (
          <g>
            <circle cx="50" cy="30" r="8" fill={item.color} />
            <path d="M32 76C32 64 40 54 50 54C60 54 68 64 68 76" stroke={item.color} strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M30 46C40 40 60 40 70 46" stroke={item.color} strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>
        )}
        {name === 'doctor' && (
          <g>
            <circle cx="50" cy="40" r="18" fill="#FFFFFF" stroke={item.color} strokeWidth="4" />
            <path d="M26 78C26 64 36 56 50 56C64 56 74 64 74 78" fill="#FFFFFF" stroke={item.color} strokeWidth="4" />
            <path d="M50 32V48M42 40H58" stroke={item.color} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
        {name === 'buddy' && (
          <g>
            <circle cx="38" cy="38" r="12" fill={item.color} />
            <circle cx="62" cy="38" r="12" fill="#FFFFFF" stroke={item.color} strokeWidth="4" />
            <path d="M22 72C22 60 30 52 42 52C48 52 54 55 58 60" stroke={item.color} strokeWidth="4" fill="none" />
            <path d="M48 72C52 64 60 58 70 58C78 58 84 64 84 72" stroke={item.color} strokeWidth="4" fill="none" />
          </g>
        )}
        {name === 'vibes' && (
          <g>
            <path d="M28 54C28 41 38 30 50 30C62 30 72 41 72 54" stroke={item.color} strokeWidth="5" strokeLinecap="round" fill="none" />
            <rect x="22" y="50" width="12" height="22" rx="6" fill={item.color} />
            <rect x="66" y="50" width="12" height="22" rx="6" fill={item.color} />
            <path d="M46 68C48 71 52 71 54 68" stroke={item.color} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
        {name === 'water' && (
          <g>
            <path d="M50 20C50 20 28 48 28 64C28 76.1 37.8 86 50 86C62.2 86 72 76.1 72 64C72 48 50 20 50 20Z" fill="#FFFFFF" stroke={item.color} strokeWidth="4" />
            <path d="M33 66C33 66 40 72 50 72C60 72 67 66 67 66" stroke={item.color} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
}
