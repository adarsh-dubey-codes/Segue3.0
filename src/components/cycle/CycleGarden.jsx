import React, { useState, useEffect } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import FloatingDecoration from '../decorations/FloatingDecoration';
import FloatingText from '../decorations/FloatingText';
import { Droplet, Flame, FileText, Moon, Droplets, Sparkles, Heart, RefreshCw, ChevronRight } from 'lucide-react';

/**
 * Enhanced Living Cycle Garden Component
 * Implements a 7-stage animated plant & flower bloom centerpiece with organic wind sway,
 * staggered petal unfolding, particle effects, and celebratory growth feedback.
 */
export default function CycleGarden() {
  const { plantStageObj, streakCount, totalLogs, avgSleep, avgWater, currentPhase, waterGarden } = useCycle();
  const { t } = useLanguage();

  const [isBlooming, setIsBlooming] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationStep, setCelebrationStep] = useState(1); // 1: "Look how you've grown ♡", 2: "Your care is blooming."

  const stageIdx = plantStageObj?.stageIndex || 1;
  const stageCode = plantStageObj?.code || 'seed';

  // Listen to garden nurture events
  useEffect(() => {
    function handleGardenNurture() {
      setIsBlooming(true);
      setShowCelebration(true);
      setCelebrationStep(1);

      const stepTimer = setTimeout(() => {
        setCelebrationStep(2);
      }, 2400);

      const endTimer = setTimeout(() => {
        setIsBlooming(false);
        setShowCelebration(false);
      }, 5500);

      return () => {
        clearTimeout(stepTimer);
        clearTimeout(endTimer);
      };
    }

    window.addEventListener('sakhi-garden-nurtured', handleGardenNurture);
    return () => window.removeEventListener('sakhi-garden-nurtured', handleGardenNurture);
  }, []);

  const handleNurtureClick = () => {
    waterGarden();
  };

  const phaseDescriptionMap = {
    menstrual: t('garden.phaseTips.menstrual', { defaultValue: 'Your body is shedding the uterine lining. Rest, hydrate and be kind to yourself.' }),
    period: t('garden.phaseTips.menstrual', { defaultValue: 'Your body is shedding the uterine lining. Rest, hydrate and be kind to yourself.' }),
    follicular: t('garden.phaseTips.follicular', { defaultValue: 'Estrogen is rising! Great energy for learning, starting fresh ideas and moving gently.' }),
    ovulation: t('garden.phaseTips.ovulatory', { defaultValue: 'Peak fertility & strength window. Feel empowered, confident, and vibrant.' }),
    luteal: t('garden.phaseTips.luteal', { defaultValue: 'Progesterone is rising. Slow down, prioritize deep sleep, and nurture yourself.' })
  };

  const phaseTitleMap = {
    menstrual: t('events.types.periodStarted', { defaultValue: 'Menstrual Phase' }),
    period: t('events.types.periodStarted', { defaultValue: 'Menstrual Phase' }),
    follicular: t('garden.phase', { defaultValue: 'Follicular Phase' }),
    ovulation: t('garden.phase', { defaultValue: 'Ovulation Phase' }),
    luteal: t('garden.phase', { defaultValue: 'Luteal Phase' })
  };

  const currentPhaseTitle = phaseTitleMap[currentPhase?.toLowerCase()] || t('events.types.periodStarted', { defaultValue: 'Menstrual Phase' });
  const currentPhaseDesc = phaseDescriptionMap[currentPhase?.toLowerCase()] || phaseDescriptionMap.menstrual;

  const stageLocalizedName = t(`garden.stages.${stageCode}`, { defaultValue: plantStageObj?.stageName || 'Seed' });

  return (
    <div 
      className="card-micro-hover"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '28px',
        padding: '24px',
        border: '1.5px solid #FAD4DE',
        boxShadow: '0 12px 36px rgba(185, 52, 93, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '440px'
      }}
    >
      {/* Background Ambient Botanical Accents */}
      <FloatingDecoration type="leaf" top="14px" right="42px" opacity={0.3} size={22} behavior="sway" duration={6} />
      <FloatingDecoration type="sparkle" bottom="18px" left="18px" opacity={0.35} size={18} behavior="sparkle" duration={4} />
      <FloatingText phraseKey="bodyListening" top="10px" right="110px" opacity={0.45} duration={9} />

      <div>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#27AE60', letterSpacing: '0.06em', marginBottom: '2px' }}>
              🌱 {t('common.activePhase', { defaultValue: 'GENTLE GROWTH' })}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', color: '#38232A', margin: 0, fontWeight: '700' }}>
              {t('garden.title', { defaultValue: 'Your Cycle Garden' })}
            </h3>
            <p style={{ color: '#8E6E79', fontSize: '0.825rem', margin: '2px 0 0 0' }}>
              {t('garden.subtitle', { defaultValue: 'Nurture your body, mind & dreams ♡' })}
            </p>
          </div>

          <button
            type="button"
            onClick={handleNurtureClick}
            className="btn-micro-hover"
            style={{
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              border: '1.5px solid #C8E6C9',
              borderRadius: '50px',
              padding: '6px 14px',
              fontSize: '0.775rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(46, 125, 50, 0.12)'
            }}
            title={t('garden.nurtureGarden', { defaultValue: 'Water and care for your plant to help it bloom' })}
          >
            <Sparkles size={14} color="#2E7D32" />
            <span>{t('garden.nurtureGarden', { defaultValue: 'Nurture 💧' })}</span>
          </button>
        </div>

        {/* CENTER LIVING PLANT / BLOOM ILLUSTRATION */}
        <div style={{ position: 'relative', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0 16px' }}>
          
          {/* Radial Glow Ring for Blooming */}
          <div 
            style={{
              position: 'absolute',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236, 115, 143, 0.25) 0%, rgba(255, 255, 255, 0) 70%)',
              animation: stageIdx >= 6 ? 'bloomGlowExpand 4s ease-in-out infinite' : 'none',
              pointerEvents: 'none'
            }}
          />

          {/* Celebratory Floating Banner */}
          {showCelebration && (
            <div 
              style={{
                position: 'absolute',
                top: '-12px',
                zIndex: 20,
                backgroundColor: '#FFE5EC',
                color: '#B9345D',
                border: '1.5px solid #FAD4DE',
                borderRadius: '50px',
                padding: '6px 18px',
                fontSize: '0.875rem',
                fontWeight: '800',
                boxShadow: '0 8px 24px rgba(185, 52, 93, 0.25)',
                animation: 'celebrateTextFade 5s ease-in-out forwards',
                whiteSpace: 'nowrap'
              }}
            >
              {celebrationStep === 1 ? t('garden.milestoneReached', { defaultValue: 'Look how you\'ve grown ♡' }) : t('garden.bloomingSoon', { defaultValue: 'Your care is blooming 🌸' })}
            </div>
          )}

          {/* LIVING PLANT SVG GRAPHIC (7 STAGES) */}
          <div 
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'organicWindSway 6s ease-in-out infinite'
            }}
          >
            <svg width="150" height="150" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Soil / Pot Base */}
              <ellipse cx="80" cy="140" rx="36" ry="10" fill="#795548" opacity="0.25" />
              <path d="M50 120 L58 145 H102 L110 120 Z" fill="#8D6E63" stroke="#5D4037" strokeWidth="2.5" />
              <ellipse cx="80" cy="120" rx="30" ry="8" fill="#5D4037" />

              {/* Stage 1: Seed in Soil */}
              {stageIdx === 1 && (
                <g>
                  <circle cx="80" cy="118" r="6" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="1.5" />
                  <circle cx="80" cy="118" r="2" fill="#FFE5EC" style={{ animation: 'sparklePulse 2s ease-in-out infinite' }} />
                </g>
              )}

              {/* Stage 2 & up: Emerging Stem */}
              {stageIdx >= 2 && (
                <path 
                  d="M80 120 Q80 90 80 65" 
                  stroke="#4CAF50" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  style={{ animation: 'stemGrowUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                />
              )}

              {/* Sprout / Seedling Leaves (Stage 2 & 3) */}
              {stageIdx >= 2 && (
                <g style={{ animation: 'leafUnfoldLeft 1s ease-out forwards' }}>
                  <path d="M80 95 Q60 85 62 72 Q78 78 80 95 Z" fill="#81C784" stroke="#388E3C" strokeWidth="1.5" />
                </g>
              )}
              {stageIdx >= 3 && (
                <g style={{ animation: 'leafUnfoldRight 1.2s ease-out forwards' }}>
                  <path d="M80 85 Q100 75 98 62 Q82 68 80 85 Z" fill="#81C784" stroke="#388E3C" strokeWidth="1.5" />
                </g>
              )}

              {/* Stage 4 & 5: Extra Lush Leaves */}
              {stageIdx >= 4 && (
                <g style={{ animation: 'leafUnfoldLeft 1.4s ease-out forwards' }}>
                  <path d="M80 75 Q55 60 58 48 Q74 54 80 75 Z" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
                </g>
              )}
              {stageIdx >= 5 && (
                <g style={{ animation: 'leafUnfoldRight 1.5s ease-out forwards' }}>
                  <path d="M80 68 Q105 52 102 40 Q86 46 80 68 Z" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
                </g>
              )}

              {/* Stage 6: Budding Flower */}
              {stageIdx === 6 && (
                <g style={{ animation: 'breatheScale 3s ease-in-out infinite' }}>
                  <ellipse cx="80" cy="55" rx="12" ry="16" fill="#C23B68" stroke="#880E4F" strokeWidth="1.5" />
                  <ellipse cx="80" cy="55" rx="7" ry="11" fill="#FF8DA1" />
                </g>
              )}

              {/* Stage 7: Full Blooming Flower (Staggered Unfolding Petals) */}
              {stageIdx >= 7 && (
                <g style={{ animation: 'swayMotion 5s ease-in-out infinite' }}>
                  {/* Petal 1 */}
                  <path d="M80 50 C65 25 50 45 80 50 Z" fill="#EC738F" opacity="0.95" style={{ animation: 'petalBloomUnfold 1.5s ease-out 0.1s forwards' }} />
                  {/* Petal 2 */}
                  <path d="M80 50 C95 25 110 45 80 50 Z" fill="#EC738F" opacity="0.95" style={{ animation: 'petalBloomUnfold 1.5s ease-out 0.25s forwards' }} />
                  {/* Petal 3 */}
                  <path d="M80 50 C105 60 90 80 80 50 Z" fill="#FF8DA1" opacity="0.95" style={{ animation: 'petalBloomUnfold 1.5s ease-out 0.4s forwards' }} />
                  {/* Petal 4 */}
                  <path d="M80 50 C55 60 70 80 80 50 Z" fill="#FF8DA1" opacity="0.95" style={{ animation: 'petalBloomUnfold 1.5s ease-out 0.55s forwards' }} />
                  {/* Petal 5 (Top Center) */}
                  <path d="M80 50 C70 20 90 20 80 50 Z" fill="#FFE5EC" opacity="0.95" style={{ animation: 'petalBloomUnfold 1.5s ease-out 0.7s forwards' }} />
                  
                  {/* Golden Glowing Flower Center Core */}
                  <circle cx="80" cy="50" r="9" fill="#FFD54F" stroke="#F57F17" strokeWidth="1.5" style={{ animation: 'flowerCenterPulse 2.5s ease-in-out infinite' }} />
                  <circle cx="80" cy="50" r="4" fill="#FFF59D" />
                </g>
              )}
            </svg>
          </div>

          {/* Floating Drifting Petals around Flower */}
          {stageIdx >= 5 && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: '20px', left: '20px', animation: 'petalDriftFall 7s ease-in-out infinite', color: '#EC738F', opacity: 0.7 }}>🌸</div>
              <div style={{ position: 'absolute', top: '40px', right: '25px', animation: 'petalDriftFall 9s ease-in-out infinite 2s', color: '#FF8DA1', opacity: 0.6 }}>🌸</div>
            </div>
          )}
        </div>

        {/* 7-STAGE PROGRESS TRACK BAR */}
        <div style={{ backgroundColor: '#FFF0F4', borderRadius: '16px', padding: '10px 14px', marginBottom: '16px', border: '1px solid #FAD4DE' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#B9345D' }}>
              {t('garden.stage', { defaultValue: 'Stage' })} {stageIdx} / 7: {stageLocalizedName}
            </span>
            <span style={{ fontSize: '0.85rem' }}>{plantStageObj?.icon}</span>
          </div>

          {/* 7 Milestone Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((sNum) => {
              const active = sNum <= stageIdx;
              return (
                <div
                  key={sNum}
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '10px',
                    backgroundColor: active ? '#B9345D' : '#FAD4DE',
                    transition: 'all 0.3s ease',
                    boxShadow: active ? '0 0 6px rgba(185, 52, 93, 0.4)' : 'none'
                  }}
                  title={`Stage ${sNum}`}
                />
              );
            })}
          </div>
        </div>

        {/* Current Phase Banner */}
        <div 
          style={{
            backgroundColor: '#FFF2F5',
            borderRadius: '20px',
            padding: '14px 16px',
            border: '1px solid #FFE0E7',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#FFE5EC', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0 
            }}
          >
            <Droplet size={20} color="#EC738F" fill="#EC738F" />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: '#8E6E79', fontWeight: '600' }}>{t('garden.phase', { defaultValue: 'Active Cycle Phase' })}</span>
              <ChevronRight size={16} color="#8E6E79" />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#38232A', margin: '2px 0', fontWeight: '700' }}>
              {currentPhaseTitle}
            </h4>
            <p style={{ color: '#7D626C', fontSize: '0.775rem', margin: 0, lineHeight: 1.35 }}>
              {currentPhaseDesc}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom 4 Stat Blocks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '16px' }}>
        {/* Streak */}
        <div className="btn-micro-hover" style={{ backgroundColor: '#FFF5F7', padding: '10px 6px', borderRadius: '14px', border: '1px solid #FFE5EC', textAlign: 'center' }}>
          <Flame size={15} color="#EC738F" style={{ marginBottom: '2px', animation: 'sparklePulse 3s ease-in-out infinite' }} />
          <span style={{ display: 'block', fontSize: '0.675rem', color: '#8E6E79' }}>{t('garden.streak', { defaultValue: 'Streak' })}</span>
          <strong style={{ fontSize: '1rem', color: '#38232A', fontWeight: '800' }}>{streakCount}d</strong>
        </div>

        {/* Logs */}
        <div className="btn-micro-hover" style={{ backgroundColor: '#FFF5F7', padding: '10px 6px', borderRadius: '14px', border: '1px solid #FFE5EC', textAlign: 'center' }}>
          <FileText size={15} color="#EC738F" style={{ marginBottom: '2px' }} />
          <span style={{ display: 'block', fontSize: '0.675rem', color: '#8E6E79' }}>{t('events.loggedCount', { defaultValue: 'Logs' })}</span>
          <strong style={{ fontSize: '1rem', color: '#38232A', fontWeight: '800' }}>{totalLogs}</strong>
        </div>

        {/* Sleep */}
        <div className="btn-micro-hover" style={{ backgroundColor: '#FFF5F7', padding: '10px 6px', borderRadius: '14px', border: '1px solid #FFE5EC', textAlign: 'center' }}>
          <Moon size={15} color="#6C5CE7" style={{ marginBottom: '2px', animation: 'swayMotion 4s ease-in-out infinite' }} />
          <span style={{ display: 'block', fontSize: '0.675rem', color: '#8E6E79' }}>{t('events.types.poorSleep', { defaultValue: 'Sleep' })}</span>
          <strong style={{ fontSize: '1rem', color: '#38232A', fontWeight: '800' }}>{avgSleep}h</strong>
        </div>

        {/* Water */}
        <div className="btn-micro-hover" style={{ backgroundColor: '#FFF5F7', padding: '10px 6px', borderRadius: '14px', border: '1px solid #FFE5EC', textAlign: 'center' }}>
          <Droplets size={15} color="#0984E3" style={{ marginBottom: '2px', animation: 'floatSphere 5s ease-in-out infinite' }} />
          <span style={{ display: 'block', fontSize: '0.675rem', color: '#8E6E79' }}>{t('common.water', { defaultValue: 'Water' })}</span>
          <strong style={{ fontSize: '1rem', color: '#38232A', fontWeight: '800' }}>{avgWater}c</strong>
        </div>
      </div>
    </div>
  );
}
