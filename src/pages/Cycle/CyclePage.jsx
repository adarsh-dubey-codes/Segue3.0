import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import Calendar from '../../components/Calendar/Calendar';
import CycleRing from '../../components/CycleRing/CycleRing';
import CycleGarden from '../../components/cycle/CycleGarden';
import CycleAnalytics from '../../components/cycle/CycleAnalytics';
import CycleHeroSetupBanner from '../../components/cycle/CycleHeroSetupBanner';
import CycleAIInsights from '../../components/cycle/CycleAIInsights';
import DailyLogModal from '../../components/cycle/DailyLogModal';
import CycleSetupModal from '../../components/cycle/CycleSetupModal';
import Button from '../../components/Button/Button';
import { Settings, Plus } from 'lucide-react';

export default function CyclePage() {
  const { cycleSetup, currentCycleDay, currentPhase, updateCycleSetup } = useCycle();
  const { t } = useLanguage();
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)', margin: 0 }}>
            {t('cyclePage.title')}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '4px' }}>
            {t('cyclePage.sub')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline" onClick={() => setIsSetupOpen(true)} icon={<Settings size={16} />}>
            {t('cyclePage.setupCycle')}
          </Button>
          <Button variant="primary" onClick={() => setIsLogOpen(true)} icon={<Plus size={16} />}>
            {t('cyclePage.logToday')}
          </Button>
        </div>
      </div>

      {/* FEATURE 2: PRIMARY "SET UP YOUR CYCLE" HERO CONFIGURATION BANNER */}
      <CycleHeroSetupBanner 
        onOpenSetup={() => setIsSetupOpen(true)} 
        onOpenLog={() => setIsLogOpen(true)} 
      />

      {/* DASHBOARD TOP ROW: RING + FEATURE 1: CALENDAR + GARDEN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <style>{`
          @media (max-width: 960px) {
            .cycle-top-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        
        {/* RING VISUAL */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CycleRing 
            dayNumber={currentCycleDay} 
            totalDays={cycleSetup.cycleLength || 28} 
            size={210} 
            label={`${t(`phase.${currentPhase}`)}`} 
          />
        </div>

        {/* FEATURE 1: INTERACTIVE NEXT PERIOD PREDICTION CALENDAR */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar
            selectedDate={cycleSetup.periodStartDate}
            onSelectDate={(d) => updateCycleSetup({ periodStartDate: d.toISOString() })}
            onOpenLog={() => setIsLogOpen(true)}
          />
        </div>

        {/* GARDEN GAMIFICATION */}
        <div>
          <CycleGarden />
        </div>
      </div>

      {/* FEATURE 3: AI CYCLE RECOMMENDATION & OBSERVATION ENGINE */}
      <CycleAIInsights />

      {/* ANALYTICS & 90-DAY OVERVIEW */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--rose-dark)', marginBottom: '20px' }}>
          {t('feature.cycle.title')} & {t('common.view')}
        </h2>
        <CycleAnalytics />
      </div>

      <DailyLogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
      <CycleSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
    </div>
  );
}
