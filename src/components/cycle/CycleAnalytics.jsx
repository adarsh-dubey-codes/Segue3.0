import React from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { Activity, BarChart2, AlertCircle } from 'lucide-react';

export default function CycleAnalytics() {
  const { dailyLogs, cycleSetup } = useCycle();
  const { t } = useLanguage();

  // Aggregate symptoms
  const symptomCounts = {};
  dailyLogs.forEach((log) => {
    if (log.symptoms && Array.isArray(log.symptoms)) {
      log.symptoms.forEach((s) => {
        symptomCounts[s] = (symptomCounts[s] || 0) + 1;
      });
    }
  });

  const sortedSymptoms = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 90-Day Overview Grid */}
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--rose-dark)' }}>
              {t('analytics.cycleOverview', { defaultValue: '90-Day Cycle Overview' })}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {t('analytics.cycleOverviewSub', { defaultValue: 'Darker tiles represent flow & logged symptom intensity' })}
            </span>
          </div>
          <Activity size={18} color="var(--rose)" />
        </div>

        {/* 90-Day Visual Tiles Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(15, 1fr)',
            gap: '4px',
            margin: '12px 0'
          }}
        >
          {Array.from({ length: 90 }).map((_, idx) => {
            const dayNum = idx + 1;
            const isPeriodDay = dayNum % (cycleSetup.cycleLength || 28) <= (cycleSetup.periodLength || 5) && dayNum % (cycleSetup.cycleLength || 28) !== 0;
            return (
              <div
                key={idx}
                title={`Day ${dayNum}${isPeriodDay ? ' - Flow Day' : ''}`}
                style={{
                  aspectRatio: '1',
                  borderRadius: '3px',
                  backgroundColor: isPeriodDay ? 'var(--rose)' : 'var(--surface-soft)',
                  opacity: isPeriodDay ? 0.7 + (dayNum % 3) * 0.1 : 0.4,
                  border: '1px solid var(--border)'
                }}
              />
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--rose)' }} />
            {t('events.types.periodStarted', { defaultValue: 'Period / Flow intensity' })}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--surface-soft)' }} />
            {t('common.days', { defaultValue: 'Regular days' })}
          </span>
        </div>
      </div>

      {/* 30-Day Energy Trend & Top Symptoms */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <style>{`
          @media (max-width: 768px) {
            .analytics-dual-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        
        {/* Energy Trend */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--rose-dark)' }}>
              {t('analytics.energyTrend', { defaultValue: 'Energy Trend (30 Days)' })}
            </h4>
            <BarChart2 size={16} color="var(--rose)" />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px', paddingTop: '10px' }}>
            {dailyLogs.slice(0, 10).reverse().concat(Array.from({ length: Math.max(0, 10 - dailyLogs.length) })).map((log, i) => {
              const val = log ? (log.energy || 3) : 3;
              const heightPercent = (val / 5) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <div 
                    style={{
                      width: '100%',
                      marginTop: 'auto',
                      height: `${heightPercent}%`,
                      backgroundColor: 'var(--pink-soft)',
                      borderTop: '2px solid var(--rose)',
                      borderRadius: '3px'
                    }}
                    title={`Energy: ${val}/5`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Most Common Symptoms */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--rose-dark)', marginBottom: '14px' }}>
            {t('analytics.commonSymptoms', { defaultValue: 'Logged Symptom Patterns' })}
          </h4>

          {sortedSymptoms.length === 0 ? (
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontStyle: 'italic', padding: '12px 0' }}>
              {t('events.noEventsThisCycle', { defaultValue: 'No symptoms logged yet. Log daily care to see symptom frequency patterns.' })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sortedSymptoms.slice(0, 4).map(([sym, count]) => (
                <div key={sym} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                    {t(`events.types.${sym}`, { defaultValue: sym })}
                  </span>
                  <span style={{ backgroundColor: 'var(--pink-primary)', color: 'var(--rose-dark)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: '700', fontSize: '0.75rem' }}>
                    {t('events.countEventsLogged', { count, defaultValue: `${count} logs` })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
