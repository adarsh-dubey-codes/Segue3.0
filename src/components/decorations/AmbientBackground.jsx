import React from 'react';

/**
 * Sakhi Layer 3 Ambient Background System
 * Provides extremely subtle, slow-moving organic blurred blobs and radial glows.
 */

export default function AmbientBackground({ intensity = 'soft' }) {
  // If intensity is minimal, render very light subtle background
  if (intensity === 'minimal') {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: -1,
          overflow: 'hidden',
          opacity: 0.25
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '20%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FFE5EC 0%, rgba(255,229,236,0) 70%)',
            filter: 'blur(60px)'
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      {/* Top Left Organic Blob */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 215, 226, 0.45) 0%, rgba(253, 243, 245, 0) 70%)',
          filter: 'blur(70px)',
          animation: 'slowAmbientDrift 24s ease-in-out infinite alternate'
        }}
      />

      {/* Center Right Subtle Glow Blob */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250, 212, 222, 0.35) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(80px)',
          animation: 'slowAmbientDrift 30s ease-in-out infinite alternate-reverse'
        }}
      />

      {/* Bottom Left Warm Accent Blob */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 230, 235, 0.4) 0%, rgba(253, 243, 245, 0) 70%)',
          filter: 'blur(75px)',
          animation: 'slowAmbientDrift 28s ease-in-out infinite alternate'
        }}
      />
    </div>
  );
}
