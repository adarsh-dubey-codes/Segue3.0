import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Moon, Droplets, Flame, Award, Heart, Plus } from 'lucide-react';

export default function CycleGarden() {
  const { plantStage, plantIcon, streakCount, totalLogs, avgSleep, avgWater, addDailyLog } = useCycle();
  const { t, language } = useLanguage();

  const [wateredToday, setWateredToday] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const nextMilestone = 10;
  const progressPercent = Math.min(100, Math.max(15, (totalLogs / nextMilestone) * 100));

  const handleWaterGarden = () => {
    setWateredToday(true);
    setAnimationClass('scale-up');
    const todayStr = new Date().toISOString().split('T')[0];
    addDailyLog({
      date: todayStr,
      water: Number(avgWater) + 1,
      sleep: Number(avgSleep),
      mood: 'Happy',
      symptoms: [],
      notes: 'Watered Sakhi Garden today 🌸'
    });
    setTimeout(() => setAnimationClass(''), 1000);
  };

  const gardenPlants = [
    { icon: '🌱', label: language === 'hi' ? 'अंकुर (Sprout)' : 'Sprout', level: 1 },
    { icon: '🌿', label: language === 'hi' ? 'पत्तियां (Leafing)' : 'Leafing', level: 2 },
    { icon: '🌷', label: language === 'hi' ? 'कली (Budding)' : 'Budding', level: 3 },
    { icon: '🌸', label: language === 'hi' ? 'फूल (Full Bloom)' : 'Full Bloom', level: 4 },
    { icon: '🌺', label: language === 'hi' ? 'ओएसिस (Oasis)' : 'Oasis', level: 5 }
  ];

  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <div>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: 'var(--radius-full)', backgroundColor: '#F0F9F1', color: '#27AE60', fontSize: '0.75rem', fontWeight: '700', marginBottom: '4px' }}>
              <Sparkles size={12} />
              <span>{language === 'hi' ? 'आत्म-देखभाल गार्डन' : 'Self-Care Sanctuary'}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--rose-dark)', margin: 0 }}>
              {language === 'hi' ? 'आपका सखी साइकिल गार्डन' : 'Your Cycle Garden'}
            </h3>
          </div>
          <div 
            style={{ 
              fontSize: '3rem', 
              lineHeight: 1,
              transition: 'transform 0.3s ease',
              transform: animationClass ? 'scale(1.3) rotate(10deg)' : 'scale(1)'
            }}
          >
            {plantIcon}
          </div>
        </div>

        {/* Garden Growth Stage Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #FFF5F7 0%, #F0F9F1 100%)',
            borderRadius: '18px',
            padding: '18px',
            marginBottom: '20px',
            border: '1px solid rgba(236, 115, 143, 0.2)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--rose-dark)' }}>
              {language === 'hi' ? 'वर्तमान स्तर' : 'Current Level'}: {plantStage}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#27AE60', fontWeight: '600' }}>
              {totalLogs}/{nextMilestone} {language === 'hi' ? 'दिन दर्ज' : 'Logs'}
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ height: '8px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{ height: '100%', width: `${progressPercent}%`, backgroundColor: '#27AE60', borderRadius: '4px', transition: 'width 0.4s ease' }} />
          </div>

          {/* Plants Evolution Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
            {gardenPlants.map((p, idx) => (
              <div 
                key={idx} 
                style={{ 
                  textAlign: 'center',
                  opacity: totalLogs >= idx * 2 ? 1 : 0.35,
                  transform: totalLogs >= idx * 2 ? 'scale(1.1)' : 'scale(0.9)',
                  transition: 'all 0.2s ease'
                }}
                title={p.label}
              >
                <span style={{ fontSize: '1.25rem', display: 'block' }}>{p.icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Button: Water Garden */}
        <button
          type="button"
          onClick={handleWaterGarden}
          disabled={wateredToday}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: wateredToday ? '#E8F5E9' : '#0984E3',
            color: wateredToday ? '#2E7D32' : '#FFFFFF',
            border: wateredToday ? '1px solid #C8E6C9' : 'none',
            fontWeight: '600',
            fontSize: '0.85rem',
            cursor: wateredToday ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '20px',
            boxShadow: wateredToday ? 'none' : '0 4px 12px rgba(9, 132, 227, 0.25)',
            transition: 'all 0.2s ease'
          }}
        >
          <Droplets size={16} />
          <span>
            {wateredToday 
              ? (language === 'hi' ? '✓ गार्डन को पानी दिया गया!' : '✓ Garden Watered Today!') 
              : (language === 'hi' ? 'गार्डन को पानी दें 💧 (+1 गिलास)' : 'Water Your Garden 💧 (+1 Glass)')}
          </span>
        </button>
      </div>

      {/* Stats Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'var(--surface-soft)', padding: '10px 4px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <Flame size={15} color="var(--rose)" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.675rem', color: 'var(--text-secondary)' }}>
            {language === 'hi' ? 'लगातार' : 'Streak'}
          </span>
          <strong style={{ fontSize: '1rem', color: 'var(--rose-dark)' }}>{streakCount}d</strong>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: 'var(--surface-soft)', padding: '10px 4px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <Sparkles size={15} color="#E09F3E" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.675rem', color: 'var(--text-secondary)' }}>
            {language === 'hi' ? 'कुल लॉग' : 'Logs'}
          </span>
          <strong style={{ fontSize: '1rem', color: 'var(--rose-dark)' }}>{totalLogs}</strong>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: 'var(--surface-soft)', padding: '10px 4px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <Moon size={15} color="#6C5CE7" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.675rem', color: 'var(--text-secondary)' }}>
            {language === 'hi' ? 'औसत नींद' : 'Sleep'}
          </span>
          <strong style={{ fontSize: '1rem', color: 'var(--rose-dark)' }}>{avgSleep}h</strong>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: 'var(--surface-soft)', padding: '10px 4px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <Droplets size={15} color="#0984E3" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.675rem', color: 'var(--text-secondary)' }}>
            {language === 'hi' ? 'औसत पानी' : 'Water'}
          </span>
          <strong style={{ fontSize: '1rem', color: 'var(--rose-dark)' }}>{avgWater}c</strong>
        </div>
      </div>
    </div>
  );
}
