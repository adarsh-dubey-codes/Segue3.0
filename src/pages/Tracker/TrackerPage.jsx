import React, { useState, useEffect } from 'react';
import SakhiLogo from '../../components/Brand/SakhiLogo';
import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import CycleRing from '../../components/CycleRing/CycleRing';
import DateSelectorModal from '../../components/DateSelector/DateSelectorModal';
import { 
  getStoredPeriodStartDate, 
  savePeriodStartDate, 
  calculateCycleDay, 
  formatEditorialDate 
} from '../../utils/cycleStorage';
import { LogOut, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

export default function TrackerPage({ onLogout }) {
  const [periodStartDate, setPeriodStartDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedDate = getStoredPeriodStartDate();
    if (storedDate) {
      setPeriodStartDate(storedDate);
    }
  }, []);

  const handleSaveDate = (newDate) => {
    setPeriodStartDate(newDate);
    savePeriodStartDate(newDate);
  };

  const cycleDay = periodStartDate ? calculateCycleDay(periodStartDate) : null;
  const formattedStart = periodStartDate ? formatEditorialDate(periodStartDate) : null;

  return (
    <div className="tracker-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* MINIMAL TOP NAVIGATION */}
      <header 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 32px',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: '#FFFFFF'
        }}
      >
        <SakhiLogo size="medium" />

        <Button 
          variant="outline" 
          onClick={onLogout}
          icon={<LogOut size={16} />}
          style={{ padding: '8px 16px', fontSize: '0.875rem' }}
        >
          Log out
        </Button>
      </header>

      {/* MAIN TRACKER CONTAINER */}
      <main style={{ flex: 1, maxWidth: '1040px', width: '100%', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
        {/* PAGE HEADER */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <h1 
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '2.5rem', 
              color: 'var(--deep-plum)',
              fontWeight: '500',
              marginBottom: '6px'
            }}
          >
            Your Cycle
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Keep track of your period, one day at a time.
          </p>
        </div>

        {/* CONTENT AREA */}
        {!periodStartDate ? (
          /* BEAUTIFUL EMPTY STATE */
          <div 
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '60px 32px',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '40px auto 0 auto',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <CycleRing dayNumber={null} size={180} label="Not set" />
            </div>

            <h2 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '1.75rem', 
                color: 'var(--deep-plum)',
                marginBottom: '10px'
              }}
            >
              Start tracking your cycle
            </h2>
            <p 
              style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.975rem', 
                lineHeight: '1.6', 
                maxWidth: '400px', 
                margin: '0 auto 28px auto' 
              }}
            >
              Tell Sakhi Cycle the first day of your most recent period to begin.
            </p>

            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
              icon={<CalendarIcon size={18} />}
            >
              Select start date
            </Button>
          </div>
        ) : (
          /* ACTIVE TRACKER CONTENT */
          <div className="tracker-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            <style>{`
              @media (max-width: 820px) {
                .tracker-grid {
                  grid-template-columns: 1fr !important;
                  gap: 32px !important;
                }
              }
            `}</style>

            {/* LEFT COLUMN: CYCLE VISUAL & INFO CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* CYCLE RING VISUALIZATION */}
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  padding: '36px 24px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CycleRing dayNumber={cycleDay} size={220} label="Cycle Day" />
              </div>

              {/* SIMPLE CYCLE INFORMATION CARD */}
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Period started
                    </span>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--deep-plum)', fontWeight: '600', marginTop: '2px' }}>
                      {formattedStart}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '6px 12px',
                      fontSize: '0.825rem',
                      color: 'var(--rose-accent)',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Edit date
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Today
                    </span>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--deep-plum)', fontWeight: '600', marginTop: '2px' }}>
                      Cycle day {cycleDay}
                    </p>
                  </div>
                  <span 
                    style={{ 
                      backgroundColor: 'var(--soft-pink)', 
                      color: 'var(--deep-plum)', 
                      padding: '4px 10px', 
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.775rem',
                      fontWeight: '600' 
                    }}
                  >
                    Active cycle
                  </span>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '600' }}>
                    Next period
                  </span>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                    Not enough data yet
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CALENDAR & ACTION */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--deep-plum)' }}>
                  Calendar View
                </h3>
                
                <Button 
                  variant="primary"
                  onClick={() => setIsModalOpen(true)}
                  icon={<CalendarIcon size={16} />}
                  style={{ fontSize: '0.875rem', padding: '10px 18px' }}
                >
                  Mark period started
                </Button>
              </div>

              <Calendar 
                selectedDate={periodStartDate} 
                onSelectDate={(newDate) => handleSaveDate(newDate)} 
              />
            </div>
          </div>
        )}
      </main>

      {/* DATE SELECTOR MODAL */}
      <DateSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveDate={handleSaveDate}
        initialDate={periodStartDate || new Date()}
      />
    </div>
  );
}
