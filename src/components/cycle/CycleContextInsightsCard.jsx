import React from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { calculateCycleStats, getLatePeriodContext, getHistoricalCyclePatterns, getCategoryInfo } from '../../utils/cycleInsightEngine';
import { Sparkles, AlertCircle, Calendar, ChevronRight, HeartHandshake, Info } from 'lucide-react';
import Button from '../Button/Button';

export default function CycleContextInsightsCard({ onViewTimeline, onOpenComposer }) {
  const { t } = useLanguage();
  const { cycleSetup, dailyLogs, events } = useCycle();

  const stats = calculateCycleStats(cycleSetup, dailyLogs, events);
  const lateContext = getLatePeriodContext(cycleSetup, dailyLogs, events);
  const historyPatterns = getHistoricalCyclePatterns(dailyLogs, events);

  const { cycleEvents, categoryCounts, totalEventsInCycle, isLate, daysOverdue } = stats;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. LATE PERIOD CONTEXTUAL ALERT (IF OVERDUE) */}
      {isLate && (
        <div
          style={{
            backgroundColor: '#FFF0F4',
            border: '1.5px solid #FAD4DE',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(236, 115, 143, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FFE5EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EC738F',
                flexShrink: 0
              }}
            >
              <Calendar size={22} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700', color: '#3E242B', margin: 0 }}>
                {t('insights.lateHeaderTitle', { defaultValue: 'Your period hasn\'t started yet' })}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#D9486D', fontWeight: '600', margin: '2px 0 0 0' }}>
                {t('insights.daysOverdueText', {
                  defaultValue: `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} later than your recent estimate`,
                  days: daysOverdue
                })}
              </p>
            </div>
          </div>

          {/* Context Narrative */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #FAD4DE',
              padding: '16px 18px',
              fontSize: '0.9rem',
              color: '#38232A',
              lineHeight: '1.6'
            }}
          >
            <p style={{ margin: 0 }}>
              {t(lateContext.contextNarrativeKey, { defaultValue: lateContext.defaultNarrative })}
            </p>

            {/* List of events logged this cycle */}
            {lateContext.relevantEvents && lateContext.relevantEvents.length > 0 && (
              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed #FAD4DE' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#7D626C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('insights.loggedThisCycle', { defaultValue: 'What you logged this cycle:' })}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {lateContext.relevantEvents.map((item) => (
                    <span
                      key={item.id}
                      style={{
                        backgroundColor: '#FFF5F8',
                        border: '1px solid #FAD4DE',
                        borderRadius: '9999px',
                        padding: '4px 12px',
                        fontSize: '0.8rem',
                        color: '#38232A',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{item.icon}</span>
                      <span style={{ fontWeight: '600' }}>{item.title}</span>
                      <span style={{ color: '#7D626C', fontSize: '0.75rem' }}>({item.date})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Non-diagnostic Disclaimer */}
          <div
            style={{
              backgroundColor: '#FFF8F0',
              border: '1px solid #FFE4C4',
              borderRadius: '14px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '0.825rem',
              color: '#8A5A00',
              lineHeight: 1.45
            }}
          >
            <Info size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              {t(lateContext.disclaimerKey, { defaultValue: lateContext.defaultDisclaimer })}
            </span>
          </div>

          {lateContext.shouldSuggestDoctor && (
            <div style={{ fontSize: '0.825rem', color: '#7D626C', fontStyle: 'italic' }}>
              💡 {t('insights.doctorSuggestion', { defaultValue: 'If your period is delayed by over a week or you experience severe discomfort, consider consulting a healthcare professional for general peace of mind.' })}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outline"
              onClick={() => onViewTimeline && onViewTimeline()}
              icon={<ChevronRight size={16} />}
              style={{ borderRadius: '9999px', fontSize: '0.875rem' }}
            >
              {t('events.reviewTimeline', { defaultValue: 'Review my cycle timeline' })}
            </Button>
          </div>
        </div>
      )}

      {/* 2. CYCLE CONTEXT OVERVIEW CARD */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #FAD4DE',
          boxShadow: '0 8px 24px rgba(236, 115, 143, 0.06)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#3E242B',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={18} color="#EC738F" />
              <span>{t('events.cycleContextTitle', { defaultValue: 'Your Cycle Context' })}</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#7D626C', margin: '4px 0 0 0' }}>
              {t('events.cycleContextSub', { defaultValue: 'Things you logged during this cycle phase' })}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onViewTimeline && onViewTimeline()}
            style={{
              background: 'none',
              border: 'none',
              color: '#EC738F',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{t('events.viewTimeline', { defaultValue: 'View timeline' })}</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Quick Category Summary Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px'
          }}
        >
          <div style={{ backgroundColor: '#FFE4E6', borderRadius: '16px', padding: '14px', border: '1px solid #FECDD3' }}>
            <span style={{ fontSize: '1.2rem' }}>🩺</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#E11D48', margin: '4px 0 0 0' }}>
              {categoryCounts.health}
            </h4>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9F1239' }}>
              {t('events.categories.health', { defaultValue: 'Illness / Health' })}
            </span>
          </div>

          <div style={{ backgroundColor: '#F3E8FF', borderRadius: '16px', padding: '14px', border: '1px solid #E9D5FF' }}>
            <span style={{ fontSize: '1.2rem' }}>💊</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#9333EA', margin: '4px 0 0 0' }}>
              {categoryCounts.medication}
            </h4>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6B21A8' }}>
              {t('events.categories.medication', { defaultValue: 'Medication' })}
            </span>
          </div>

          <div style={{ backgroundColor: '#FEF3C7', borderRadius: '16px', padding: '14px', border: '1px solid #FDE68A' }}>
            <span style={{ fontSize: '1.2rem' }}>🧠</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#D97706', margin: '4px 0 0 0' }}>
              {categoryCounts.mental}
            </h4>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#92400E' }}>
              {t('events.categories.stress', { defaultValue: 'Stress' })}
            </span>
          </div>

          <div style={{ backgroundColor: '#DBEAFE', borderRadius: '16px', padding: '14px', border: '1px solid #BFDBFE' }}>
            <span style={{ fontSize: '1.2rem' }}>🌙</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2563EB', margin: '4px 0 0 0' }}>
              {categoryCounts.lifestyle}
            </h4>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#1E40AF' }}>
              {t('events.categories.lifestyle', { defaultValue: 'Sleep & Lifestyle' })}
            </span>
          </div>
        </div>

        {/* Recent 2-3 logged events preview */}
        {cycleEvents.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px', borderTop: '1px solid #FAD4DE' }}>
            <span style={{ fontSize: '0.775rem', fontWeight: '700', color: '#7D626C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('events.recentCycleEvents', { defaultValue: 'Recent events logged this cycle:' })}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {cycleEvents.slice(0, 3).map((evt) => {
                const catObj = getCategoryInfo(evt.category);
                return (
                  <div
                    key={evt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#FFF5F8',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{catObj.icon}</span>
                      <span style={{ fontWeight: '600', color: '#38232A' }}>{evt.title}</span>
                      {evt.description && (
                        <span style={{ color: '#7D626C', fontSize: '0.8rem' }}>— "{evt.description.substring(0, 40)}{evt.description.length > 40 ? '...' : ''}"</span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#9E828C', fontWeight: '500' }}>{evt.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '0.85rem', color: '#7D626C', fontStyle: 'italic', textAlign: 'center', padding: '10px 0' }}>
            {t('events.noEventsThisCycle', { defaultValue: 'No context events recorded yet in this cycle. Tap + Add to record health, stress, or medicine.' })}
          </div>
        )}
      </div>

      {/* 3. PERSONALIZED DESCRIPTIVE PATTERNS CARD */}
      {historyPatterns.totalEventsLogged >= 3 && (
        <div
          style={{
            backgroundColor: '#FAF5FF',
            borderRadius: '24px',
            border: '1px solid #E9D5FF',
            padding: '20px 24px',
            fontSize: '0.875rem',
            color: '#5B21B6',
            lineHeight: '1.5'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <HeartHandshake size={18} color="#9333EA" />
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '700', color: '#4C1D95', margin: 0 }}>
              {t('insights.patternsTitle', { defaultValue: 'Things You Logged Around Your Cycles' })}
            </h4>
          </div>

          <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#6B21A8' }}>
            {t('insights.patternsSub', { defaultValue: 'Over recent cycles, Sakhi has compiled these observational context entries:' })}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {historyPatterns.categoryTotals.stress > 0 && (
              <span style={{ backgroundColor: '#F3E8FF', border: '1px solid #D8B4FE', borderRadius: '12px', padding: '6px 12px', fontWeight: '600', fontSize: '0.8rem' }}>
                🧠 Stress: {historyPatterns.categoryTotals.stress} entries
              </span>
            )}
            {historyPatterns.categoryTotals.sleep > 0 && (
              <span style={{ backgroundColor: '#F3E8FF', border: '1px solid #D8B4FE', borderRadius: '12px', padding: '6px 12px', fontWeight: '600', fontSize: '0.8rem' }}>
                😴 Poor Sleep: {historyPatterns.categoryTotals.sleep} entries
              </span>
            )}
            {historyPatterns.categoryTotals.illness > 0 && (
              <span style={{ backgroundColor: '#F3E8FF', border: '1px solid #D8B4FE', borderRadius: '12px', padding: '6px 12px', fontWeight: '600', fontSize: '0.8rem' }}>
                🩺 Illness: {historyPatterns.categoryTotals.illness} entries
              </span>
            )}
            {historyPatterns.categoryTotals.medication > 0 && (
              <span style={{ backgroundColor: '#F3E8FF', border: '1px solid #D8B4FE', borderRadius: '12px', padding: '6px 12px', fontWeight: '600', fontSize: '0.8rem' }}>
                💊 Medication: {historyPatterns.categoryTotals.medication} entries
              </span>
            )}
          </div>

          <p style={{ margin: '12px 0 0 0', fontSize: '0.775rem', color: '#7E22CE', fontStyle: 'italic' }}>
            {t('insights.observationalNote', { defaultValue: 'These observations reflect your logged context over time and are for your personal reference, not a medical diagnosis.' })}
          </p>
        </div>
      )}
    </div>
  );
}
