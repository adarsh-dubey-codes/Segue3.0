import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import Calendar from '../../components/Calendar/Calendar';
import CycleGarden from '../../components/cycle/CycleGarden';
import CycleHeroSetupBanner from '../../components/cycle/CycleHeroSetupBanner';
import CycleAIInsights from '../../components/cycle/CycleAIInsights';
import DailyLogModal from '../../components/cycle/DailyLogModal';
import CycleSetupModal from '../../components/cycle/CycleSetupModal';
import Button from '../../components/Button/Button';
import { Settings, Plus } from 'lucide-react';

export default function CyclePage() {
  const { cycleSetup, updateCycleSetup } = useCycle();
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

      {/* PRIMARY FEATURE: SET UP YOUR CYCLE HERO CONFIGURATION BANNER */}
      <CycleHeroSetupBanner 
        onOpenSetup={() => setIsSetupOpen(true)} 
        onOpenLog={() => setIsLogOpen(true)} 
      />

      {/* MAIN FEATURE ROW: CALENDAR + ENHANCED CYCLE GARDEN */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr', 
          gap: '24px', 
          marginBottom: '40px',
          alignItems: 'stretch'
        }}
      >
        <style>{`
          @media (max-width: 900px) {
            .cycle-main-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        
        {/* CALENDAR WITH NEXT PERIOD RECOMMENDATIONS */}
        <div>
          <Calendar
            selectedDate={cycleSetup.periodStartDate}
            onSelectDate={(d) => updateCycleSetup({ periodStartDate: d.toISOString() })}
            onOpenLog={() => setIsLogOpen(true)}
          />
        </div>

        {/* ENHANCED CYCLE GARDEN SANCTUARY */}
        <div>
          <CycleGarden />
        </div>
      </div>

      {/* AI CYCLE RECOMMENDATION & OBSERVATION ENGINE */}
      <CycleAIInsights />

      <DailyLogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
      <CycleSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
    </div>
  );
}
