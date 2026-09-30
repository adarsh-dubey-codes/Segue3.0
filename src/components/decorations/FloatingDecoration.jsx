import React from 'react';

/**
 * Sakhi Reusable Floating Decoration Component
 * Provides organic SVG visual accents (flowers, petals, sparkles, leaves, moons, dots).
 * Opacity: 0.15 - 0.65
 * Pointer events disabled to ensure content remains non-blocked & clickable.
 */

export const SVG_ICONS = {
  flower: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8C10.5 5 7.5 5 6 7C4.5 9 5.5 12 8.5 12.5C5.5 13 4.5 16 6 18C7.5 20 10.5 20 12 17C13.5 20 16.5 20 18 18C19.5 16 18.5 13 15.5 12.5C18.5 12 19.5 9 18 7C16.5 5 13.5 5 12 8Z" fill="currentColor" opacity="0.85"/>
      <circle cx="12" cy="12.5" r="2.5" fill="#FFE5EC" />
    </svg>
  ),
  petal: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2C5 6 3 12 7 17C12 21 17 15 15 8C14 5 12 3 10 2Z" fill="currentColor" />
    </svg>
  ),
  sparkle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" fill="currentColor" />
    </svg>
  ),
  leaf: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 3C21 3 13 4 8 9C3 14 3 20 3 20C3 20 9 20 14 15C19 10 21 3 21 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 20L11 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  moon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
    </svg>
  ),
  heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  dot: (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="4" />
    </svg>
  )
};

export default function FloatingDecoration({
  type = 'flower',
  color = '#EC738F',
  size = 20,
  opacity = 0.35,
  duration = 7,
  delay = 0,
  top,
  left,
  right,
  bottom,
  behavior = 'float', // 'float' | 'sway' | 'sparkle' | 'breathe'
  style = {}
}) {
  const iconSvg = SVG_ICONS[type] || SVG_ICONS.flower;

  // Determine CSS animation name based on behavior
  let animationName = 'floatSphere';
  if (behavior === 'sway') animationName = 'swayMotion';
  if (behavior === 'sparkle') animationName = 'sparklePulse';
  if (behavior === 'breathe') animationName = 'breatheScale';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        color,
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
        animation: `${animationName} ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {iconSvg}
    </div>
  );
}
