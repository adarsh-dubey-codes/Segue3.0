import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import PhaseGuide from '../../components/lifestyle/PhaseGuide';

export default function LifestylePage() {
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)' }}>
          {t('lifestylePage.title')}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          {t('lifestylePage.sub')}
        </p>
      </div>

      <PhaseGuide />
    </div>
  );
}
