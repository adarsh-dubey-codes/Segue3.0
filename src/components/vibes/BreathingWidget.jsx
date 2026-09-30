import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LotusFlowerIcon } from '../illustrations/VibesIllustrations';
import { Play, Pause, Heart } from 'lucide-react';

export default function BreathingWidget() {
  const { t } = useTranslation();
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
    return 'Ready';
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #FAD4DE',
        boxShadow: '0 8px 24px rgba(236, 115, 143, 0.08)',
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div>
        {/* Top Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <LotusFlowerIcon size={18} color="#EC738F" />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              color: '#EC738F',
              letterSpacing: '0.08em'
            }}
          >
            MINDFUL RELAXATION
          </span>
        </div>

        {/* Card Content & Right Circle Visualizer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 150px',
            gap: '20px',
            alignItems: 'center',
            marginBottom: '24px'
          }}
          className="breathwork-grid"
        >
          <style>{`
            @media (max-width: 540px) {
              .breathwork-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>

          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#3E242B',
                lineHeight: 1.2,
                margin: '0 0 10px 0'
              }}
            >
              Guided 4-4-4 Breathwork
            </h3>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#7D626C',
                lineHeight: 1.5,
                margin: 0
              }}
            >
              Breathe in. Hold. Breathe out. A simple 4-4-4 technique to calm your mind and reduce stress.
            </p>
          </div>

          {/* Animated Breathing Circle Visualizer */}
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: '#FFE5EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              position: 'relative',
              transition: 'transform 4s ease-in-out',
              transform:
                isActive && (phaseText === 'Inhale' || phaseText === 'Hold')
                  ? 'scale(1.15)'
                  : 'scale(1)',
              boxShadow: '0 0 24px rgba(236, 115, 143, 0.25)',
              border: '1px solid #FAD4DE'
            }}
          >
            <div
              style={{
                width: '105px',
                height: '105px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #EC738F',
                gap: '2px'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#3E242B'
                }}
              >
                {getLocalizedPhase(phaseText)}
              </span>
              <Heart size={14} color="#EC738F" fill="#EC738F" />
            </div>
          </div>
        </div>
      </div>

      {/* Start / Pause Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #801D46 0%, #581430 100%)',
            color: '#FFFFFF',
            border: 'none',
            padding: '12px 26px',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(128, 29, 70, 0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          {isActive ? <Pause size={16} /> : <Play size={16} fill="#FFFFFF" />}
          <span>{isActive ? 'Pause Exercise' : 'Start Breathing Exercise'}</span>
        </button>
      </div>
    </div>
  );
}
