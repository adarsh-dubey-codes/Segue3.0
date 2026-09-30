import React from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../Button/Button';
import { Settings, Calendar, Clock, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { formatDate } from '../../utils/dateFormatter';

export default function CycleHeroSetupBanner({ onOpenSetup, onOpenLog }) {
  const { cycleSetup, updateCycleSetup, currentCycleDay, currentPhase } = useCycle();
  const { t, language } = useLanguage();

  const cycleLen = Number(cycleSetup.cycleLength) || 28;
  const periodLen = Number(cycleSetup.periodLength) || 5;
  const startDate = cycleSetup.periodStartDate ? new Date(cycleSetup.periodStartDate) : new Date();

  // Next Period Arrival Recommendation
  const nextPeriodStart = new Date(startDate.getTime() + cycleLen * 24 * 60 * 60 * 1000);
  const nextPeriodEnd = new Date(nextPeriodStart.getTime() + (periodLen - 1) * 24 * 60 * 60 * 1000);
  const daysUntilNext = Math.ceil((nextPeriodStart - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F7 50%, #FFE5EC 100%)',
        borderRadius: '32px',
        padding: '36px 40px',
        border: '1.5px solid rgba(236, 115, 143, 0.35)',
        boxShadow: '0 16px 40px rgba(236, 115, 143, 0.12)',
        marginBottom: '36px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
        <div style={{ flex: 1, minWidth: '290px' }}>
          {/* Primary Badge */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#FFE5EC',
              color: '#EC738F',
              fontSize: '0.825rem',
              fontWeight: '700',
              marginBottom: '16px',
              border: '1px solid rgba(236, 115, 143, 0.25)'
            }}
          >
            <Settings size={15} color="#EC738F" />
            <span>Primary Feature • Cycle Configuration</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: '#38232A', fontWeight: '600', marginBottom: '8px', lineHeight: '1.2' }}>
            {t('cycleHero.title')}
          </h2>
          <p style={{ color: '#7D626C', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', maxWidth: '580px' }}>
            {t('cycleHero.sub')}
          </p>

          {/* Quick Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '28px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                {t('cycleHero.lastPeriod')}
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--rose-dark)' }}>
                {formatDate(startDate, language)}
              </strong>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                {t('cycleHero.cycleLength')}
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--rose-dark)' }}>
                {cycleLen} {t('common.days')}
              </strong>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                {t('cycleHero.periodDuration')}
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--rose-dark)' }}>
                {periodLen} {t('common.days')}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button
              variant="primary"
              onClick={onOpenSetup}
              icon={<Sliders size={18} />}
              style={{ padding: '12px 24px', fontSize: '0.95rem' }}
            >
              {t('cycleHero.editSetup')}
            </Button>
            <Button
              variant="outline"
              onClick={onOpenLog}
              style={{ padding: '12px 20px', fontSize: '0.95rem' }}
            >
              {t('cyclePage.logToday')}
            </Button>
          </div>
        </div>

        {/* Prediction Highlight Banner Card */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '24px 28px',
            border: '2px solid var(--pink-soft)',
            boxShadow: 'var(--shadow-sm)',
            minWidth: '280px',
            maxWidth: '340px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={18} color="var(--rose)" />
              <span style={{ fontSize: '0.775rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--rose)' }}>
                {t('cycleHero.nextPeriodPredicted')}
              </span>
            </div>

            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--rose-dark)', marginBottom: '4px' }}>
              {daysUntilNext > 0 ? t('cycleHero.daysCountdown', { days: daysUntilNext }) : t('cycleHero.overdue', { days: Math.abs(daysUntilNext) })}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', margin: '8px 0 16px 0' }}>
              {t('cycleHero.expectedArrival', { start: formatDate(nextPeriodStart, language), end: formatDate(nextPeriodEnd, language) })}
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--surface-soft)', padding: '10px 14px', borderRadius: '12px', fontSize: '0.775rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="var(--success)" />
            <span>Recalculated with AI precision</span>
          </div>
        </div>
      </div>
    </div>
  );
}
