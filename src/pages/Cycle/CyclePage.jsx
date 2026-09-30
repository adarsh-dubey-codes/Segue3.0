import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import Calendar from '../../components/Calendar/Calendar';
import CycleGarden from '../../components/cycle/CycleGarden';
import CyclePhaseCard from '../../components/cycle/CyclePhaseCard';
import CycleAnalyticsView from '../../components/cycle/CycleAnalyticsView';
import DailyLogModal from '../../components/cycle/DailyLogModal';
import CycleSetupModal from '../../components/cycle/CycleSetupModal';
import PhaseDetailModal from '../../components/cycle/PhaseDetailModal';
import Button from '../../components/Button/Button';
import { Settings, Plus } from 'lucide-react';

export default function CyclePage() {
  const { cycleSetup, updateCycleSetup } = useCycle();
  const { t } = useLanguage();
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 24px 80px 24px' }}>
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', color: '#38232A', margin: 0, fontWeight: '600' }}>
            {t('cyclePage.headerTitle')}
          </h1>
          <p style={{ color: '#8E6E79', fontSize: '1.05rem', marginTop: '4px' }}>
            {t('cyclePage.headerSub')}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: '#EC738F', fontStyle: 'italic' }}>
            {t('common.smallSteps')}
          </span>

          <button
            type="button"
            onClick={() => setIsSetupOpen(true)}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#38232A',
              border: '1px solid #FAD4DE',
              padding: '12px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Settings size={16} color="#EC738F" />
            <span>{t('cyclePage.configureCycle')}</span>
          </button>

          <Button 
            variant="primary" 
            onClick={() => setIsLogOpen(true)} 
            icon={<Plus size={18} />}
            style={{ borderRadius: 'var(--radius-full)', padding: '12px 24px', fontSize: '0.9rem', backgroundColor: '#EC738F', boxShadow: '0 4px 14px rgba(236, 115, 143, 0.35)' }}
          >
            {t('cyclePage.logDailyCare')}
          </Button>
        </div>
      </div>

      {/* TOP 3-COLUMN CARD GRID */}
      <div 
        className="cycle-top-3grid"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '24px', 
          marginBottom: '40px',
          alignItems: 'stretch'
        }}
      >
        <style>{`
          @media (max-width: 1080px) {
            .cycle-top-3grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        
        {/* CARD 1: CYCLE PHASE CARD */}
        <div>
          <CyclePhaseCard onOpenDetails={() => setIsDetailsOpen(true)} />
        </div>

        {/* CARD 2: MINIMAL CLEAN CALENDAR */}
        <div>
          <Calendar
            selectedDate={cycleSetup.periodStartDate}
            onSelectDate={(d) => updateCycleSetup({ periodStartDate: d.toISOString() })}
            onOpenLog={() => setIsLogOpen(true)}
          />
        </div>

        {/* CARD 3: YOUR CYCLE GARDEN */}
        <div>
          <CycleGarden />
        </div>
      </div>

      {/* BOTTOM SECTION: CYCLE ANALYTICS & INSIGHTS */}
      <CycleAnalyticsView />

      {/* MODALS */}
      <DailyLogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
      <CycleSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
      <PhaseDetailModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
    </div>
  );
}
