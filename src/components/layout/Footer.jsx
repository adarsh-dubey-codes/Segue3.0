import React from 'react';
import SakhiLogo from '../Brand/SakhiLogo';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

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
          maxWidth: '100%',
          padding: '0 clamp(16px, 2.5vw, 40px)',
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
              {t('footer.aboutText')}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rose-dark)', marginBottom: '14px' }}>
                {t('footer.modulesTitle')}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                <li><a href="/cycle" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('nav.cycle')}</a></li>
                <li><a href="/doctors" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('nav.doctors')}</a></li>
                <li><a href="/lifestyle" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('nav.lifestyle')}</a></li>
                <li><a href="/products" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('nav.products')}</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rose-dark)', marginBottom: '14px' }}>
                {t('footer.communityTitle')}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                <li><a href="/doctors" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('nav.doctors')}</a></li>
                <li><a href="/forum" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('nav.forum')}</a></li>
                <li><a href="/buddy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('nav.buddy')}</a></li>
                <li><a href="/vibes" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('nav.vibes')}</a></li>
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
            <strong>{t('footer.disclaimerTitle')}</strong> {t('footer.disclaimerText')}
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
          <span>© {new Date().getFullYear()} {t('footer.copyright')}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            {t('footer.tagline')} <Heart size={14} fill="var(--rose)" color="var(--rose)" />
          </span>
        </div>
      </div>
    </footer>
  );
}
