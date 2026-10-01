import React from 'react';

/**
 * PetalsRain Component
 * Generates an ambient drifting petal animation across the screen or container.
 * Pointer-events disabled so UI remains 100% interactive.
 */
export default function PetalsRain({ count = 8, containerHeight = '100%' }) {
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 12 + 7) % 92}%`,
    top: `${(i * 18 + 5) % 75}%`,
    size: 14 + (i % 3) * 6,
    duration: 8 + (i % 4) * 3,
    delay: (i * 1.3) % 5,
    color: i % 2 === 0 ? '#FAD4DE' : '#EC738F',
    opacity: 0.25 + (i % 3) * 0.15
  }));

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        height: containerHeight,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size * 1.2}px`,
            opacity: p.opacity,
            color: p.color,
            animation: `petalDriftFall ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            transformOrigin: 'center center'
          }}
        >
          <svg viewBox="0 0 20 24" fill="currentColor">
            <path d="M10 2C5 6 2 12 6 18C11 23 18 17 16 9C15 5 12 3 10 2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
