import React from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function CyclePhaseCard({ onOpenDetails }) {
  const { currentCycleDay, currentPhase, cycleSetup } = useCycle();
  const { t } = useLanguage();

  const totalDays = Number(cycleSetup?.cycleLength) || 28;
  const cycleLen = Number(cycleSetup?.cycleLength) || 28;
  const lastStart = cycleSetup?.periodStartDate ? new Date(cycleSetup.periodStartDate) : new Date();

  const nextPeriodStart = new Date(lastStart.getTime() + cycleLen * 24 * 60 * 60 * 1000);
  const daysUntilNext = Math.ceil((nextPeriodStart - new Date()) / (1000 * 60 * 60 * 24));

  const phaseKeyMap = {
    menstrual: 'phase.period',
    period: 'phase.period',
    follicular: 'phase.follicular',
    ovulation: 'phase.ovulation',
    luteal: 'phase.luteal'
  };

  const phaseKey = phaseKeyMap[currentPhase?.toLowerCase()] || 'phase.period';
  const displayName = t(phaseKey);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '28px',
        padding: '28px 32px',
        border: '1px solid #FAD4DE',
        boxShadow: '0 8px 25px rgba(236, 115, 143, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      {/* Background Subtle Gradient */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #FFF9FA 0%, #FFF0F4 100%)',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, paddingRight: '16px' }}>
        <span style={{ fontSize: '0.85rem', color: '#8E6E79', fontWeight: '500', display: 'block', marginBottom: '2px' }}>
          {t('cyclePage.youAreInYour')}
        </span>
        <h2 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.9rem', 
            color: '#38232A', 
            margin: '0 0 16px 0', 
            fontWeight: '600' 
          }}
        >
          {displayName}
        </h2>

        {/* Cycle Day Counter */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: '#8E6E79', display: 'block', marginBottom: '2px' }}>
            {t('cyclePage.cycleDay')}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', fontWeight: '700', color: '#EC738F', lineHeight: 1 }}>
              {currentCycleDay}
            </span>
            <span style={{ fontSize: '1.4rem', color: '#8E6E79', fontWeight: '500' }}>
              /{totalDays}
            </span>
          </div>
        </div>

        {/* Pill Badge Countdown */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#FFE5EC',
            color: '#EC738F',
            fontSize: '0.8rem',
            fontWeight: '600',
            marginBottom: '20px',
            border: '1px solid rgba(236, 115, 143, 0.25)'
          }}
        >
          <span>{t('cyclePage.nextPeriodInDays', { days: Math.max(0, daysUntilNext) })}</span>
        </div>

        <div>
          <button
            type="button"
            onClick={onOpenDetails}
            style={{
              backgroundColor: '#EC738F',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(236, 115, 143, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{t('common.viewDetails')}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Right Side Illustration */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 1,
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #FFF',
          boxShadow: '0 6px 20px rgba(236, 115, 143, 0.15)',
          flexShrink: 0
        }}
      >
        <img 
          src="/images/cycle/cycle-phase-woman.jpg" 
          alt="Cycle Phase Woman"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
