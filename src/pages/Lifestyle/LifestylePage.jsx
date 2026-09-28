import React from 'react';
import PhaseGuide from '../../components/lifestyle/PhaseGuide';

export default function LifestylePage() {
  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)' }}>
          Phase-Aware Lifestyle & Diet
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Align your nutrition, movement, and self-care with your body's natural hormonal rhythm.
        </p>
      </div>

      <PhaseGuide />
    </div>
  );
}
