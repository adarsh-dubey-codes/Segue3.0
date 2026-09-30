import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Wind, Play, Pause } from 'lucide-react';

export default function BreathingWidget() {
  const { t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [phaseText, setPhaseText] = useState('Inhale');

  useEffect(() => {
    let timer;
    if (isActive) {
      const cycle = () => {
        setPhaseText('Inhale');
        timer = setTimeout(() => {
          setPhaseText('Hold');
          timer = setTimeout(() => {
            setPhaseText('Exhale');
            timer = setTimeout(() => {
              if (isActive) cycle();
            }, 4000);
          }, 4000);
        }, 4000);
      };
      cycle();
    } else {
      setPhaseText('Ready');
    }
    return () => clearTimeout(timer);
  }, [isActive]);

  const getLocalizedPhase = (phase) => {
    if (phase === 'Inhale') return t('vibesPage.inhale');
    if (phase === 'Hold') return t('vibesPage.hold');
    if (phase === 'Exhale') return t('vibesPage.exhale');
    return t('vibesPage.ready');
  };

  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <Wind size={18} color="var(--rose)" />
        <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--rose)', letterSpacing: '0.08em' }}>
          {t('vibesPage.mindfulRelaxation')}
        </span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--rose-dark)', marginBottom: '24px' }}>
        {t('vibesPage.guidedBreath')}
      </h3>

      {/* Animated Breathing Circle */}
      <div 
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          backgroundColor: 'var(--pink-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          position: 'relative',
          transition: 'transform 4s ease-in-out',
          transform: isActive && phaseText === 'Inhale' ? 'scale(1.25)' : isActive && phaseText === 'Hold' ? 'scale(1.25)' : 'scale(1)',
          boxShadow: '0 0 24px rgba(217, 130, 155, 0.2)'
        }}
      >
        <div 
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'var(--pink-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--rose)'
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '600', color: 'var(--rose-dark)' }}>
            {getLocalizedPhase(phaseText)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--rose-dark)',
          color: '#FFFFFF',
          border: 'none',
          padding: '10px 24px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        {isActive ? <Pause size={16} /> : <Play size={16} />}
        {isActive ? t('vibesPage.pauseBreathing') : t('vibesPage.startBreathing')}
      </button>
    </div>
  );
}
