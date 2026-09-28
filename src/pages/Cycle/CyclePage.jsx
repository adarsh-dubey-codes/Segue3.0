import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import Calendar from '../../components/Calendar/Calendar';
import CycleRing from '../../components/CycleRing/CycleRing';
import CycleGarden from '../../components/cycle/CycleGarden';
import CycleAnalytics from '../../components/cycle/CycleAnalytics';
import DailyLogModal from '../../components/cycle/DailyLogModal';
import CycleSetupModal from '../../components/cycle/CycleSetupModal';
import Button from '../../components/Button/Button';
import { Settings, Plus, Calendar as CalendarIcon, Activity } from 'lucide-react';

export default function CyclePage() {
  const { cycleSetup, currentCycleDay, currentPhase, updateCycleSetup } = useCycle();
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)' }}>
            Cycle Tracker & Care
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Track daily flow, mood, energy, and symptoms with total privacy.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline" onClick={() => setIsSetupOpen(true)} icon={<Settings size={16} />}>
            Configure Cycle
          </Button>
          <Button variant="primary" onClick={() => setIsLogOpen(true)} icon={<Plus size={16} />}>
            Log Daily Care
          </Button>
        </div>
      </div>

      {/* DASHBOARD TOP ROW: RING + CALENDAR + GARDEN */}
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
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CycleRing dayNumber={currentCycleDay} totalDays={cycleSetup.cycleLength || 28} size={210} label={`${currentPhase.toUpperCase()} PHASE`} />
        </div>

        {/* CALENDAR */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar
            selectedDate={cycleSetup.periodStartDate}
            onSelectDate={(d) => updateCycleSetup({ periodStartDate: d.toISOString() })}
          />
        </div>

        {/* GARDEN GAMIFICATION */}
        <div>
          <CycleGarden />
        </div>
      </div>

      {/* ANALYTICS SECTION */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--rose-dark)', marginBottom: '20px' }}>
          Cycle Analytics & Insights
        </h2>
        <CycleAnalytics />
      </div>

      <DailyLogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
      <CycleSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
    </div>
  );
}
