import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Activity, ShieldCheck, Heart, ArrowRight, Lightbulb, Calendar, RefreshCw } from 'lucide-react';
import { formatDate } from '../../utils/dateFormatter';

export default function CycleAIInsights() {
  const navigate = useNavigate();
  const { cycleSetup, dailyLogs, currentPhase, currentCycleDay } = useCycle();
  const { t, language } = useLanguage();

  const cycleLen = Number(cycleSetup.cycleLength) || 28;
  const periodLen = Number(cycleSetup.periodLength) || 5;
  const lastStart = cycleSetup.periodStartDate ? new Date(cycleSetup.periodStartDate) : new Date();

  // Next Period Calculation
  const nextPeriodStart = new Date(lastStart.getTime() + cycleLen * 24 * 60 * 60 * 1000);
  const nextPeriodEnd = new Date(nextPeriodStart.getTime() + (periodLen - 1) * 24 * 60 * 60 * 1000);
  const daysUntilNext = Math.ceil((nextPeriodStart - new Date()) / (1000 * 60 * 60 * 24));

  // Count symptoms logged across all logs
  const symptomCounts = {};
  dailyLogs.forEach((log) => {
    if (log.symptoms && Array.isArray(log.symptoms)) {
      log.symptoms.forEach((s) => {
        symptomCounts[s] = (symptomCounts[s] || 0) + 1;
      });
    }
  });

  const topSymptom = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1])[0];

  const handleAskSakhi = () => {
    navigate('/chat', { 
      state: { 
        initialQuery: language === 'hi' 
          ? `सखी, मेरे पिछले चक्र के अनुसार मेरा अगला पीरियड ${daysUntilNext} दिनों में आने वाला है। मुझे इसके लिए क्या तैयारी करनी चाहिए?` 
          : `Sakhi, based on my cycle history, my next period is arriving in ${daysUntilNext} days. What self-care routine should I follow?` 
      } 
    });
  };

  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '40px'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: '#FFF0F3', color: 'var(--rose)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '8px' }}>
            <Sparkles size={14} color="var(--rose)" />
            <span>AI Cycle Intelligence</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--rose-dark)', margin: 0 }}>
            {t('aiInsights.title')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            {t('aiInsights.sub')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAskSakhi}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--rose-dark)',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(217, 91, 120, 0.25)',
            transition: 'all 0.2s ease'
          }}
        >
          <span>{t('aiInsights.askSakhiBtn')}</span>
        </button>
      </div>

      {/* METRICS & CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Regularity Observation Score Card */}
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                {t('aiInsights.regularity')}
              </span>
              <ShieldCheck size={20} color="var(--success)" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--rose-dark)', marginBottom: '4px' }}>
              {t('aiInsights.regularityVal')}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {t('aiInsights.observedCycles')}
            </p>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            ✓ Average Cycle Length: <strong>{cycleLen} {t('common.days')}</strong>
          </div>
        </div>

        {/* Observed Symptom Pattern Card */}
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                {t('aiInsights.patternCardTitle')}
              </span>
              <Lightbulb size={20} color="#E67E22" />
            </div>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
              {t('aiInsights.symptomPattern')}
            </p>
          </div>
          {topSymptom && (
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              Top Logged Symptom: <strong style={{ color: 'var(--rose-dark)' }}>{topSymptom[0]} ({topSymptom[1]} logs)</strong>
            </div>
          )}
        </div>

        {/* Next Period AI Recommendation Card */}
        <div style={{ backgroundColor: 'var(--surface-soft)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                {t('cycleHero.nextPeriodPredicted')}
              </span>
              <Calendar size={20} color="var(--rose)" />
            </div>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
              {t('aiInsights.arrivalRec', { date: formatDate(nextPeriodStart, language), days: Math.max(0, daysUntilNext) })}
            </p>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Predicted Window: <strong>{formatDate(nextPeriodStart, language)} — {formatDate(nextPeriodEnd, language)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
