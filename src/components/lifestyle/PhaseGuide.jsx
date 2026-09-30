import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCycle } from '../../context/CycleContext';
import { 
  GirlStretchingIllustration, 
  OvumCellIllustration, 
  FoodSaladIllustration, 
  AvoidSweetsIllustration, 
  FitnessDumbbellsIllustration, 
  SleepMaskIllustration 
} from '../illustrations/EatAndMoveIllustrations';
import { 
  Droplet, Sprout, Flower2, Moon, Sparkles, Check, 
  Utensils, Ban, Activity, Heart 
} from 'lucide-react';

export default function PhaseGuide() {
  const { t } = useTranslation();
  const { currentPhase } = useCycle();
  // Default to ovulation phase or user current phase
  const [activePhase, setActivePhase] = useState(currentPhase || 'ovulation');

  const phases = [
    {
      id: 'menstrual',
      title: 'Menstrual Phase',
      daysTag: 'DAYS 1–5 • TIME TO REST & REPLENISH',
      icon: Droplet,
      iconBg: '#FFE5EC',
      iconColor: '#EC738F',
      activeColor: '#E85C7D',
      description: 'Estrogen and progesterone are at their lowest. Focus on gentle movement, warming foods, and deep restoration.',
      quickTips: [
        'Focus on warming iron-rich foods',
        'Sip ginger tea for cramp relief',
        'Practice restorative yoga',
        'Prioritize deep rest & boundaries'
      ],
      nourish: [
        'Iron-rich foods (spinach, lentils, pumpkin seeds, beetroot) to rebuild blood.',
        'Warm ginger or chamomile tea to soothe pelvic muscles.',
        'Magnesium-rich dark chocolate and avocados.',
        'Hydrating bone broths or warm vegetable soups.'
      ],
      avoid: [
        'Excessive caffeine which may increase cramping.',
        'Refined sugars that cause rapid blood sugar crashes.',
        'Salty packaged foods that promote fluid retention.'
      ],
      move: [
        'Gentle restorative yoga (Child’s pose, Supta Baddha Konasana).',
        'Soft 15-minute walks in fresh air.',
        'Pelvic floor relaxation and light stretching.'
      ],
      rest: [
        'Aim for 8–9 hours of sleep with a warm hot water bottle.',
        'Take a warm Epsom salt bath to relax sore muscles.',
        'Practice deep belly breathing or guided meditation.'
      ]
    },
    {
      id: 'follicular',
      title: 'Follicular Phase',
      daysTag: 'DAYS 6–13 • RISING ENERGY & FRESH START',
      icon: Sprout,
      iconBg: '#E6F4EA',
      iconColor: '#34A853',
      activeColor: '#34A853',
      description: 'Estrogen levels rise as follicles mature. Your energy, mood, and stamina steadily climb.',
      quickTips: [
        'Eat fermented & probiotic foods',
        'Try dynamic cardio & power yoga',
        'Journal creative goals & projects',
        'Socialize and spark fresh ideas'
      ],
      nourish: [
        'Fermented foods like kimchi, kefir, and yogurt for gut health.',
        'Fresh cruciferous vegetables (broccoli, sprouts, cauliflower).',
        'Lean proteins like tofu, fish, eggs, and beans.',
        'Antioxidant-rich berries and citrus fruits.'
      ],
      avoid: [
        'Heavy, overly greasy meals that dull natural vitality.',
        'Skipping meals while your metabolic rate is building.'
      ],
      move: [
        'Dynamic cardio, cycling, or energetic power yoga.',
        'Strength training with moderate weights.',
        'Trying new fitness classes or social sports.'
      ],
      rest: [
        'Journal creative ideas and set monthly goals.',
        'Socialize and connect with friends.',
        'Maintain 7–8 hours of consistent sleep.'
      ]
    },
    {
      id: 'ovulation',
      title: 'Ovulatory Phase',
      daysTag: 'DAYS 14–16 • PEAK CONFIDENCE & RADIANCE',
      icon: Flower2,
      iconBg: '#FFE5EC',
      iconColor: '#C23B68',
      activeColor: '#C23B68',
      description: 'Estrogen peaks and LH surges to release an egg. You may feel most communicative, energetic, and magnetic.',
      quickTips: [
        'Boost protein & healthy fats',
        'Stay hydrated',
        'Engage in light strength training',
        'Embrace your social & creative energy'
      ],
      nourish: [
        'Fiber-rich foods (quinoa, chia seeds, oats) to bind excess estrogen.',
        'Raw veggies, fresh salads, and cooling smoothies.',
        'Zinc-rich foods like sesame seeds and almonds.',
        'Plenty of clean water and coconut water.'
      ],
      avoid: [
        'Over-snacking on processed sweets.',
        'Alcohol which can strain liver estrogen metabolism.'
      ],
      move: [
        'High-intensity interval training (HIIT) and spin workouts.',
        'Full body weight training and dance classes.',
        'Peak endurance exercises.'
      ],
      rest: [
        'Channel social energy into community activities.',
        'Cooling evening wind-down rituals.',
        'Hydrate well before and after intense workouts.'
      ]
    },
    {
      id: 'luteal',
      title: 'Luteal Phase',
      daysTag: 'DAYS 17–28 • SLOWING DOWN & NESTING',
      icon: Moon,
      iconBg: '#F3E8FF',
      iconColor: '#8B5CF6',
      activeColor: '#8B5CF6',
      description: 'Progesterone climbs. Metabolic rate increases slightly, while PMS symptoms may surface near the end.',
      quickTips: [
        'Eat B6 & magnesium rich foods',
        'Switch to Pilates or steady walks',
        'Prioritize early bedtimes & quiet',
        'Use lavender aromatherapy for calm'
      ],
      nourish: [
        'Complex carbohydrates like sweet potatoes, brown rice, and oats.',
        'Vitamin B6 foods (bananas, chickpeas, walnuts) to reduce PMS.',
        'Magnesium-rich foods to prevent cravings and anxiety.',
        'Herbal teas like peppermint or raspberry leaf.'
      ],
      avoid: [
        'High caffeine which exacerbates anxiety and breast tenderness.',
        'Excess sodium that worsens bloating.',
        'Refined sugar triggers for PMS mood swings.'
      ],
      move: [
        'Moderate Pilates, mat work, or steady-state walking.',
        'Swimming and low-impact toning.',
        'Listen to body fatigue and dial back intensity.'
      ],
      rest: [
        'Prioritize early bedtimes and quiet evenings.',
        'Organize your personal space and nest comfortably.',
        'Use aromatherapy (lavender, clary sage) for calmness.'
      ]
    }
  ];

  const current = phases.find((p) => p.id === activePhase) || phases[2];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 4 Phase Navigation Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9999px',
          border: '1px solid #FAD4DE',
          padding: '6px',
          boxShadow: '0 4px 16px rgba(236, 115, 143, 0.08)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {phases.map((p) => {
          const Icon = p.icon;
          const isSelected = activePhase === p.id;
          const isCurrentActive = currentPhase === p.id || (p.id === 'ovulation' && !currentPhase);

          return (
            <div
              key={p.id}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <button
                type="button"
                onClick={() => setActivePhase(p.id)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: isSelected ? p.activeColor : 'transparent',
                  color: isSelected ? '#FFFFFF' : '#38232A',
                  fontSize: '0.925rem',
                  fontWeight: isSelected ? '700' : '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isSelected ? '0 6px 18px rgba(194, 59, 104, 0.3)' : 'none'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : p.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={15} color={isSelected ? '#FFFFFF' : p.iconColor} />
                </div>
                <span>{p.title}</span>
              </button>

              {/* Active Phase Pill Badge below tab button */}
              {isCurrentActive && isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-10px',
                    backgroundColor: '#FFE5EC',
                    color: p.activeColor,
                    border: '1px solid #FAD4DE',
                    fontSize: '0.675rem',
                    fontWeight: '700',
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    whiteSpace: 'nowrap',
                    zIndex: 2
                  }}
                >
                  {t("lifestylePage.activePhaseLabel", "Active Phase")}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Phase Care Guide Card Container */}
      <div
        style={{
          backgroundColor: '#FFF0F4',
          backgroundImage: 'linear-gradient(135deg, #FFF0F4 0%, #FFE5EC 100%)',
          borderRadius: '24px',
          border: '1px solid #FAD4DE',
          padding: '32px 36px',
          boxShadow: '0 10px 30px rgba(236, 115, 143, 0.08)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="phase-guide-main-card"
      >
        <style>{`
          @media (max-width: 900px) {
            .phase-guide-main-card {
              grid-template-columns: 1fr !important;
              padding: 24px !important;
            }
          }
        `}</style>

        {/* Left Side: Title & Description */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          {/* Ovum / Cell Graphic */}
          <div style={{ flexShrink: 0 }}>
            <OvumCellIllustration />
          </div>

          <div>
            {/* Days Tag Pill */}
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: current.activeColor,
                backgroundColor: '#FFFFFF',
                border: '1px solid #FAD4DE',
                padding: '4px 12px',
                borderRadius: '9999px',
                marginBottom: '10px'
              }}
            >
              {current.daysTag}
            </span>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.1rem',
                fontWeight: '700',
                color: '#3E242B',
                lineHeight: 1.2,
                margin: '0 0 10px 0'
              }}
            >
              {current.title} Care Guide
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: '0.975rem',
                color: '#7D626C',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              {current.description}
            </p>
          </div>
        </div>

        {/* Right Side: Quick Tips Card */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            border: '1px solid #FAD4DE',
            padding: '24px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: current.activeColor }}>
            <Sparkles size={16} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0, color: '#38232A' }}>
              {t("lifestylePage.quickTips", "Quick Tips")}
            </h4>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
            {current.quickTips.map((tip, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#38232A'
                }}
              >
                <Check size={16} color={current.activeColor} strokeWidth={3} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          {/* Cursive right caption */}
          <span
            style={{
              position: 'absolute',
              right: '-10px',
              bottom: '-12px',
              fontFamily: "'Caveat', 'Dancing Script', cursive",
              fontSize: '1.35rem',
              fontWeight: '700',
              color: current.activeColor,
              transform: 'rotate(-6deg)'
            }}
          >
            {t("lifestylePage.feelYourBest", "Feel your best ! ♡")}
          </span>
        </div>
      </div>

      {/* 4 Care Pillars Grid: Nourish, Avoid, Move, Rest */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}
        className="lifestyle-4-pillars-grid"
      >
        <style>{`
          @media (max-width: 1100px) {
            .lifestyle-4-pillars-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 640px) {
            .lifestyle-4-pillars-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* 1. NOURISH & HYDRATE (Soft Pink) */}
        <div
          style={{
            backgroundColor: '#FFF0F4',
            borderRadius: '24px',
            border: '1px solid #FAD4DE',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(236, 115, 143, 0.05)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFE5EC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Utensils size={18} color="#EC738F" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '700', color: '#3E242B', margin: 0 }}>
                {t("lifestylePage.nourishTitle", "Nourish & Hydrate")}
              </h3>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {current.nourish.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.825rem', color: '#38232A', lineHeight: 1.4 }}>
                  <Check size={14} color="#EC738F" strokeWidth={3} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <FoodSaladIllustration />
          </div>
        </div>

        {/* 2. MINIMIZE OR AVOID (Soft Purple/Pink) */}
        <div
          style={{
            backgroundColor: '#FAF5FF',
            borderRadius: '24px',
            border: '1px solid #E9D5FF',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(168, 85, 247, 0.05)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#F3E8FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ban size={18} color="#A855F7" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '700', color: '#3E242B', margin: 0 }}>
                {t("lifestylePage.avoidTitle", "Minimize or Avoid")}
              </h3>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {current.avoid.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.825rem', color: '#38232A', lineHeight: 1.4 }}>
                  <Check size={14} color="#A855F7" strokeWidth={3} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <AvoidSweetsIllustration />
          </div>
        </div>

        {/* 3. MOVEMENT & FITNESS (Soft Warm Yellow) */}
        <div
          style={{
            backgroundColor: '#FFFBEB',
            borderRadius: '24px',
            border: '1px solid #FDE68A',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(245, 158, 11, 0.05)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Activity size={18} color="#D97706" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '700', color: '#3E242B', margin: 0 }}>
                {t("lifestylePage.moveTitle", "Movement & Fitness")}
              </h3>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {current.move.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.825rem', color: '#38232A', lineHeight: 1.4 }}>
                  <Check size={14} color="#D97706" strokeWidth={3} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <FitnessDumbbellsIllustration />
          </div>
        </div>

        {/* 4. REST & SELF-CARE (Soft Blue) */}
        <div
          style={{
            backgroundColor: '#F0F9FF',
            borderRadius: '24px',
            border: '1px solid #BAE6FD',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(14, 165, 233, 0.05)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#E0F2FE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Moon size={18} color="#0EA5E9" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '700', color: '#3E242B', margin: 0 }}>
                {t("lifestylePage.restTitle", "Rest & Self-Care")}
              </h3>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {current.rest.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.825rem', color: '#38232A', lineHeight: 1.4 }}>
                  <Check size={14} color="#0EA5E9" strokeWidth={3} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <SleepMaskIllustration />
          </div>
        </div>
      </div>

      {/* Bottom Quote Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 24px',
          backgroundColor: '#FFF5F8',
          border: '1px solid #FAD4DE',
          borderRadius: '9999px',
          color: '#C23B68',
          fontSize: '0.875rem',
          fontWeight: '600',
          gap: '8px',
          marginTop: '8px'
        }}
      >
        <Sparkles size={16} color="#C23B68" />
        <span>{t("lifestylePage.rememberNote", "Remember: Every phase is powerful. You just need the right support ♡")}</span>
      </div>
    </div>
  );
}
