import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { Activity, Zap, Calendar as CalendarIcon, ChevronRight, Heart, Sparkles } from 'lucide-react';

export default function CycleAnalyticsView() {
  const { dailyLogs, cycleSetup } = useCycle();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('calendar');

  const cycleLen = Number(cycleSetup?.cycleLength) || 28;
  const periodLen = Number(cycleSetup?.periodLength) || 5;

  const months = ['Jul', 'Aug', 'Sep →', 'Oct'];

  return (
    <div style={{ marginTop: '48px' }}>
      {/* SECTION HEADER BAR WITH VIEW TOGGLES */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#38232A', margin: 0, fontWeight: '600' }}>
            Cycle Analytics & Insights ✨
          </h2>
          <p style={{ color: '#8E6E79', fontSize: '0.95rem', margin: '4px 0 0 0' }}>
            Understand your patterns, plan ahead and feel more in control.
          </p>
        </div>

        {/* View Toggle Buttons */}
        <div style={{ backgroundColor: '#FFF0F3', padding: '4px', borderRadius: 'var(--radius-full)', display: 'inline-flex', gap: '4px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'calendar' ? '#EC738F' : 'transparent',
              color: activeTab === 'calendar' ? '#FFFFFF' : '#8E6E79',
              fontWeight: activeTab === 'calendar' ? '600' : '500',
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Calendar View
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('insights')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'insights' ? '#EC738F' : 'transparent',
              color: activeTab === 'insights' ? '#FFFFFF' : '#8E6E79',
              fontWeight: activeTab === 'insights' ? '600' : '500',
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Insights View
          </button>
        </div>
      </div>

      {/* MAIN ANALYTICS GRID: LEFT OVERVIEW + RIGHT MOTIVATIONAL CARD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', gap: '24px', alignItems: 'stretch' }}>
        <style>{`
          @media (max-width: 990px) {
            .analytics-grid-wrap { grid-template-columns: 1fr !important; }
          }
        `}</style>
        
        {/* LEFT SECTION (90-Day Grid + Bottom 2 Cards) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 90-Day Cycle Overview Card */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '28px',
              padding: '28px',
              border: '1px solid #FAD4DE',
              boxShadow: '0 8px 25px rgba(236, 115, 143, 0.08)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#38232A', margin: 0, fontWeight: '600' }}>
                  90-Day Cycle Overview
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#8E6E79' }}>
                  Darker tiles represent flow & logged symptom intensity
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Activity size={18} color="#EC738F" />
                <span style={{ backgroundColor: '#EC738F', color: '#FFFFFF', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '700' }}>
                  Day 1 ◆
                </span>
              </div>
            </div>

            {/* 4 Month Rows Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {months.map((m, mIdx) => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '45px', fontSize: '0.825rem', fontWeight: mIdx === 2 ? '700' : '500', color: mIdx === 2 ? '#EC738F' : '#8E6E79' }}>
                    {m}
                  </span>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(28, 1fr)', gap: '4px', flex: 1 }}>
                    {Array.from({ length: 28 }).map((_, dIdx) => {
                      const isFlow = (dIdx + mIdx * 2) % 28 < periodLen;
                      const opacity = isFlow ? 0.6 + ((dIdx % 3) * 0.2) : 0.15;
                      return (
                        <div
                          key={dIdx}
                          style={{
                            aspectRatio: '1',
                            borderRadius: '4px',
                            backgroundColor: isFlow ? '#EC738F' : '#E8D5DC',
                            opacity
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.775rem', color: '#8E6E79', paddingTop: '12px', borderTop: '1px solid #FFE5EC' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#EC738F' }} />
                Period / Flow intensity
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#E8D5DC', opacity: 0.3 }} />
                Regular days
              </span>
            </div>
          </div>

          {/* Bottom Dual Cards (Energy Trend + Symptom Patterns) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Card 1: Energy Trend */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid #FAD4DE',
                boxShadow: '0 8px 25px rgba(236, 115, 143, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '16px', backgroundColor: '#FFF0F3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={22} color="#EC738F" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#38232A', margin: '0 0 2px 0', fontWeight: '600' }}>
                  Energy Trend (30 Days)
                </h4>
                <p style={{ color: '#8E6E79', fontSize: '0.775rem', margin: 0, lineHeight: '1.4' }}>
                  Your energy levels are stable. Try to get 7-8 hours of sleep.
                </p>
              </div>
              <div style={{ width: '60px', height: '30px' }}>
                <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                  <path d="M2 25 L15 20 L30 22 L45 10 L58 8" stroke="#EC738F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Card 2: Logged Symptom Patterns */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid #FAD4DE',
                boxShadow: '0 8px 25px rgba(236, 115, 143, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '16px', backgroundColor: '#FFF0F3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CalendarIcon size={22} color="#EC738F" />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#38232A', margin: '0 0 2px 0', fontWeight: '600' }}>
                    Logged Symptom Patterns
                  </h4>
                  <p style={{ color: '#8E6E79', fontSize: '0.775rem', margin: 0 }}>
                    You've logged {dailyLogs.length} symptoms this cycle.
                  </p>
                </div>
              </div>
              <ChevronRight size={20} color="#8E6E79" />
            </div>
          </div>
        </div>

        {/* RIGHT MOTIVATIONAL SUPERPOWER CARD */}
        <div 
          style={{
            backgroundColor: '#FFF2F5',
            borderRadius: '28px',
            padding: '32px 24px',
            border: '1px solid #FFE0E7',
            boxShadow: '0 8px 25px rgba(236, 115, 143, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#38232A', lineHeight: '1.4', margin: '16px 0 8px 0', fontStyle: 'italic', fontWeight: '600' }}>
              Your cycle is not a limitation, it's a superpower ♡
            </p>
          </div>

          <div style={{ width: '100%', height: '220px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #FFFFFF', boxShadow: '0 8px 20px rgba(236, 115, 143, 0.15)' }}>
            <img 
              src="/images/cycle/cycle-superpower-woman.jpg" 
              alt="Cycle Superpower Woman"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
