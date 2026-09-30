import React from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { Droplet, Flame, FileText, Moon, Droplets, ChevronRight, Mic } from 'lucide-react';

export default function CycleGarden() {
  const { plantStage, plantIcon, streakCount, totalLogs, avgSleep, avgWater, currentPhase } = useCycle();
  const { t, language } = useLanguage();

  const phaseDescriptionMap = {
    menstrual: 'Your body is shedding the uterine lining. Rest, hydrate and be kind to yourself.',
    period: 'Your body is shedding the uterine lining. Rest, hydrate and be kind to yourself.',
    follicular: 'Estrogen is rising! Great energy for learning, starting fresh ideas and moving gently.',
    ovulation: 'Peak fertility & strength window. Feel empowered, confident, and vibrant.',
    luteal: 'Progesterone is rising. Slow down, prioritize deep sleep, and nurture yourself.'
  };

  const phaseTitleMap = {
    menstrual: 'Menstrual Phase',
    period: 'Menstrual Phase',
    follicular: 'Follicular Phase',
    ovulation: 'Ovulation Phase',
    luteal: 'Luteal Phase'
  };

  const currentPhaseTitle = phaseTitleMap[currentPhase?.toLowerCase()] || 'Menstrual Phase';
  const currentPhaseDesc = phaseDescriptionMap[currentPhase?.toLowerCase()] || phaseDescriptionMap.menstrual;

  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '28px',
        padding: '28px',
        border: '1px solid #FAD4DE',
        boxShadow: '0 8px 25px rgba(236, 115, 143, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        height: '100%'
      }}
    >
      <div>
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#27AE60', letterSpacing: '0.05em', marginBottom: '2px' }}>
              🌱 GENTLE GROWTH
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#38232A', margin: 0, fontWeight: '600' }}>
              Your Cycle Garden
            </h3>
            <p style={{ color: '#8E6E79', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
              Nurture your body, mind & dreams ♡
            </p>
          </div>

          {/* Plant Pot Graphic */}
          <div style={{ fontSize: '2.8rem', lineHeight: 1 }}>
            🪴
          </div>
        </div>

        {/* Current Stage Banner */}
        <div 
          style={{
            backgroundColor: '#FFF2F5',
            borderRadius: '20px',
            padding: '16px 20px',
            marginBottom: '20px',
            border: '1px solid #FFE0E7',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div 
            style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '50%', 
              backgroundColor: '#FFE5EC', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0 
            }}
          >
            <Droplet size={22} color="#EC738F" fill="#EC738F" />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.775rem', color: '#8E6E79', fontWeight: '500' }}>Current Stage</span>
              <ChevronRight size={18} color="#8E6E79" />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#38232A', margin: '2px 0 4px 0', fontWeight: '600' }}>
              {currentPhaseTitle}
            </h4>
            <p style={{ color: '#7D626C', fontSize: '0.8rem', margin: 0, lineHeight: '1.4' }}>
              {currentPhaseDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom 4 Stat Blocks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {/* Streak */}
        <div style={{ backgroundColor: '#FFF5F7', padding: '12px 8px', borderRadius: '16px', border: '1px solid #FFE5EC', textAlign: 'center' }}>
          <Flame size={16} color="#EC738F" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.7rem', color: '#8E6E79' }}>Streak</span>
          <strong style={{ fontSize: '1.1rem', color: '#38232A', fontWeight: '700' }}>{streakCount}d</strong>
        </div>

        {/* Logs */}
        <div style={{ backgroundColor: '#FFF5F7', padding: '12px 8px', borderRadius: '16px', border: '1px solid #FFE5EC', textAlign: 'center' }}>
          <FileText size={16} color="#EC738F" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.7rem', color: '#8E6E79' }}>Logs</span>
          <strong style={{ fontSize: '1.1rem', color: '#38232A', fontWeight: '700' }}>{totalLogs}</strong>
        </div>

        {/* Sleep */}
        <div style={{ backgroundColor: '#FFF5F7', padding: '12px 8px', borderRadius: '16px', border: '1px solid #FFE5EC', textAlign: 'center' }}>
          <Moon size={16} color="#6C5CE7" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.7rem', color: '#8E6E79' }}>Sleep</span>
          <strong style={{ fontSize: '1.1rem', color: '#38232A', fontWeight: '700' }}>{avgSleep}h</strong>
        </div>

        {/* Water */}
        <div style={{ backgroundColor: '#FFF5F7', padding: '12px 8px', borderRadius: '16px', border: '1px solid #FFE5EC', textAlign: 'center' }}>
          <Droplets size={16} color="#0984E3" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.7rem', color: '#8E6E79' }}>Water</span>
          <strong style={{ fontSize: '1.1rem', color: '#38232A', fontWeight: '700' }}>{avgWater}c</strong>
        </div>
      </div>
    </div>
  );
}
