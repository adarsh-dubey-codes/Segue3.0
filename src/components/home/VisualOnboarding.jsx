import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../Button/Button';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function VisualOnboarding({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: t('onboarding.welcome'),
      desc: t('onboarding.welcomeSub'),
      illustration: '🌸 👩🏻',
      bg: '#FFF0F3',
      color: '#EC738F'
    },
    {
      title: t('onboarding.phaseTitle'),
      desc: t('onboarding.phaseSub'),
      illustration: '🩸 → 🌱 → ☀️ → 🌙',
      bg: '#EFFFF6',
      color: '#4E9F76'
    },
    {
      title: t('onboarding.feelTitle'),
      desc: t('onboarding.feelSub'),
      illustration: '😊 🩸 😴 💧',
      bg: '#FEF9EF',
      color: '#E09F3E'
    },
    {
      title: t('onboarding.askTitle'),
      desc: t('onboarding.askSub'),
      illustration: '💬 👩🏻‍💻',
      bg: '#F3F0FF',
      color: '#6C5CE7'
    }
  ];

  const current = slides[step];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(62, 36, 43, 0.5)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Visual Guide Onboarding"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          borderRadius: '32px',
          boxShadow: '0 24px 60px rgba(62, 36, 43, 0.25)',
          border: '1px solid var(--border)',
          padding: '36px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px'
          }}
          aria-label="Close onboarding guide"
        >
          <X size={22} />
        </button>

        {/* Big Visual Center Badge */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: current.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            marginBottom: '24px',
            boxShadow: `0 12px 30px ${current.color}30`
          }}
        >
          {current.illustration}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            color: 'var(--text-primary)',
            fontWeight: '600',
            marginBottom: '10px',
            lineHeight: 1.25
          }}
        >
          {current.title}
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>
          {current.desc}
        </p>

        {/* Step Indicator Dots */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {slides.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === step ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: idx === step ? current.color : 'var(--border)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
          <Button variant="outline" onClick={onClose} style={{ flex: 1 }}>
            {t('onboarding.skip')}
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            style={{ flex: 1.2, backgroundColor: current.color }}
            icon={step === slides.length - 1 ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
          >
            {step === slides.length - 1 ? t('onboarding.start') : 'Next →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
