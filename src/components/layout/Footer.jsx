import React from 'react';
import SakhiLogo from '../Brand/SakhiLogo';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border)',
        padding: '48px 24px 80px 24px',
        marginTop: 'auto'
      }}
    >
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}
      >
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '32px',
            alignItems: 'flex-start'
          }}
        >
          <div style={{ maxWidth: '360px' }}>
            <SakhiLogo size="large" />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '12px', lineHeight: '1.6' }}>
              A gentle, privacy-first menstrual-health companion to help you understand your cycle, care for yourself, and feel supported in every phase.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rose-dark)', marginBottom: '14px' }}>
                Modules
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                <li><a href="/cycle" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cycle Tracker</a></li>
                <li><a href="/chat" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Sakhi AI</a></li>
                <li><a href="/lifestyle" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Lifestyle & Diet</a></li>
                <li><a href="/products" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Period Products</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rose-dark)', marginBottom: '14px' }}>
                Community & Care
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                <li><a href="/doctors" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Find Doctors</a></li>
                <li><a href="/forum" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Anonymous Forum</a></li>
                <li><a href="/buddy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cycle Buddy</a></li>
                <li><a href="/vibes" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Good Vibes</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety & Privacy Notice Banner */}
        <div 
          style={{
            backgroundColor: 'var(--surface-soft)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.825rem',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)'
          }}
        >
          <ShieldCheck size={20} color="var(--rose)" style={{ flexShrink: 0 }} />
          <span>
            <strong>Privacy & Health Disclaimer:</strong> Sakhi Cycle stores your data locally on your device. Sakhi AI and application guidance are provided for educational and wellness purposes only and do not replace professional medical evaluation or diagnosis.
          </span>
        </div>

        <div 
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <span>© {new Date().getFullYear()} Sakhi Cycle — Privacy First</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Bloom in every phase of you <Heart size={14} fill="var(--rose)" color="var(--rose)" />
          </span>
        </div>
      </div>
    </footer>
  );
}
