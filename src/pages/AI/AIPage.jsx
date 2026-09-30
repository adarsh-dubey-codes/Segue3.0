import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SakhiChat from '../../components/ai/SakhiChat';

export default function AIPage() {
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '32px 24px 60px 24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', color: 'var(--rose-dark)' }}>
          {t('aiPage.title')}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem' }}>
          {t('aiPage.sub')}
        </p>
      </div>

      <SakhiChat />
    </div>
  );
}
