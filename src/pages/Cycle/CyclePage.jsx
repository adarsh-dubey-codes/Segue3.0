import React, { useState, useRef } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import Calendar from '../../components/Calendar/Calendar';
import CycleGarden from '../../components/cycle/CycleGarden';
import CyclePhaseCard from '../../components/cycle/CyclePhaseCard';
import CycleAnalyticsView from '../../components/cycle/CycleAnalyticsView';
import CycleContextInsightsCard from '../../components/cycle/CycleContextInsightsCard';
import CyclePatternGuidanceCard from '../../components/cycle/CyclePatternGuidanceCard';
import EventTimeline from '../../components/cycle/EventTimeline';
import EventComposerModal from '../../components/cycle/EventComposerModal';
import DailyLogModal from '../../components/cycle/DailyLogModal';
import CycleSetupModal from '../../components/cycle/CycleSetupModal';
import PhaseDetailModal from '../../components/cycle/PhaseDetailModal';
import Button from '../../components/Button/Button';
import AmbientBackground from '../../components/decorations/AmbientBackground';
import FloatingDecoration from '../../components/decorations/FloatingDecoration';
import FloatingText from '../../components/decorations/FloatingText';
import GentleReveal from '../../components/decorations/GentleReveal';
import { Settings, Plus, Sparkles, Activity } from 'lucide-react';

export default function CyclePage() {
  const { cycleSetup, updateCycleSetup } = useCycle();
  const { t } = useLanguage();

  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const timelineRef = useRef(null);

  const handleScrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 24px 80px 24px', position: 'relative' }}>
      <AmbientBackground intensity="soft" />

      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px', position: 'relative' }}>
        <FloatingDecoration type="flower" top="-10px" right="340px" size={22} color="#EC738F" opacity={0.35} behavior="sway" />
        <FloatingText phraseKey="honorRhythm" top="-16px" left="280px" opacity={0.5} duration={9} />

        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', color: '#38232A', margin: 0, fontWeight: '600' }}>
            {t('cyclePage.headerTitle', { defaultValue: 'Personalized Cycle Tracker' })}
          </h1>
          <p style={{ color: '#8E6E79', fontSize: '1.05rem', marginTop: '4px' }}>
            {t('cyclePage.headerSub', { defaultValue: 'Track your period & personal health events with context' })}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-micro-hover"
            onClick={() => setIsSetupOpen(true)}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#38232A',
              border: '1px solid #FAD4DE',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            <Settings size={16} color="#EC738F" />
            <span>{t('cyclePage.configureCycle')}</span>
          </button>

          <button
            type="button"
            className="btn-micro-hover"
            onClick={() => setIsComposerOpen(true)}
            style={{
              backgroundColor: '#FFF0F4',
              color: '#D9486D',
              border: '1.5px solid #FAD4DE',
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(236, 115, 143, 0.12)',
              transition: 'all 0.2s ease'
            }}
          >
            <Plus size={18} color="#EC738F" />
            <span>{t('events.addEventBtn', { defaultValue: '+ Add to my day' })}</span>
          </button>

          <Button 
            variant="primary" 
            className="btn-micro-hover"
            onClick={() => setIsLogOpen(true)} 
            icon={<Activity size={18} />}
            style={{ borderRadius: 'var(--radius-full)', padding: '10px 22px', fontSize: '0.875rem', backgroundColor: '#EC738F', boxShadow: '0 4px 14px rgba(236, 115, 143, 0.35)' }}
          >
            {t('cyclePage.logDailyCare')}
          </Button>
        </div>
      </div>

      {/* TOP 3-COLUMN CARD GRID */}
      <GentleReveal delay={0.05}>
        <div 
          className="cycle-top-3grid"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '24px', 
            marginBottom: '32px',
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

          {/* CARD 2: MINIMAL COMBINED CYCLE + EVENTS CALENDAR */}
          <div>
            <Calendar
              selectedDate={cycleSetup.periodStartDate}
              onSelectDate={(d) => updateCycleSetup({ periodStartDate: d.toISOString() })}
              onOpenLog={() => setIsLogOpen(true)}
              onOpenComposer={() => setIsComposerOpen(true)}
            />
          </div>

          {/* CARD 3: YOUR CYCLE GARDEN */}
          <div>
            <CycleGarden />
          </div>
        </div>
      </GentleReveal>

      {/* CYCLE PATTERN GUIDANCE SECTION (LEVEL 1 / 2 / 3 PATTERN GUIDANCE) */}
      <GentleReveal delay={0.15}>
        <div style={{ marginBottom: '28px' }}>
          <CyclePatternGuidanceCard />
        </div>
      </GentleReveal>

      {/* MIDDLE SECTION: CYCLE CONTEXT INSIGHTS & LATE PERIOD NARRATIVE */}
      <GentleReveal delay={0.25}>
        <div style={{ marginBottom: '36px' }}>
          <CycleContextInsightsCard
            onViewTimeline={handleScrollToTimeline}
            onOpenComposer={() => setIsComposerOpen(true)}
          />
        </div>
      </GentleReveal>

      {/* CHRONOLOGICAL EVENT TIMELINE VIEW */}
      <GentleReveal delay={0.35}>
        <div ref={timelineRef} style={{ marginBottom: '40px' }}>
          <EventTimeline onOpenComposer={() => setIsComposerOpen(true)} />
        </div>
      </GentleReveal>

      {/* BOTTOM SECTION: CYCLE ANALYTICS & STATS */}
      <GentleReveal delay={0.45}>
        <CycleAnalyticsView />
      </GentleReveal>

      {/* MODALS */}
      <DailyLogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
      <CycleSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
      <PhaseDetailModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
      <EventComposerModal isOpen={isComposerOpen} onClose={() => setIsComposerOpen(false)} />
    </div>
  );
}


