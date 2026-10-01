import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRewards } from '../../context/RewardsContext';
import { 
  Heart, Brain, Flower2, Sparkles, HelpCircle, CheckCircle2, 
  RotateCcw, Trophy, Volume2, VolumeX, Flame, RefreshCw, Smile, Award,
  Check, Droplets, Sun, Utensils
} from 'lucide-react';

export default function SakhiPlayPage() {
  const { t } = useLanguage();
  const { addCoins, streak } = useRewards();
  const [activeTab, setActiveTab] = useState('daily'); // 'daily', 'affirmation', 'mood', 'bloom', 'bubble', 'wheel', 'myth'

  return (
    <div style={{ backgroundColor: '#FFF5F8', minHeight: 'calc(100vh - 70px)', padding: '24px clamp(16px, 3vw, 48px) 80px' }}>
      <style>{`
        .sakhi-play-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Hero Banner */
        .hero-banner-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 20px 32px;
          background: linear-gradient(180deg, rgba(255, 240, 244, 0.6) 0%, rgba(255, 255, 255, 0.9) 100%);
          border-radius: 28px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .hero-center-content {
          text-align: center;
          flex: 1;
          z-index: 2;
          padding: 0 16px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.825rem;
          font-weight: 800;
          color: #B9345D;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 3.2vw, 2.8rem);
          font-weight: 800;
          color: #3E242B;
          margin: 0 0 10px;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .hero-subtitle {
          color: #7D626C;
          font-size: clamp(0.9rem, 1.1vw, 1.05rem);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .hero-side-illustration {
          width: 180px;
          height: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .handwritten-note {
          font-family: 'Caveat', 'Dancing Script', cursive;
          font-size: 1.35rem;
          color: #C23B68;
          font-weight: 600;
          text-align: center;
          line-height: 1.2;
          white-space: nowrap;
          pointer-events: none;
        }

        /* Main White Card Container */
        .play-main-card {
          background: #FFFFFF;
          border-radius: 28px;
          border: 1.5px solid #FAD4DE;
          box-shadow: 0 12px 36px rgba(185, 52, 93, 0.07);
          padding: clamp(20px, 2.5vw, 36px);
        }

        /* Streak Bar */
        .streak-progress-bar {
          background-color: #FFF0F4;
          border-radius: 9999px;
          border: 1px solid #FAD4DE;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .streak-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          font-weight: 800;
          color: #B9345D;
        }

        .streak-flame-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FFE5EC;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(185, 52, 93, 0.15);
        }

        .streak-flower-track {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #FFFFFF;
          padding: 6px 16px;
          border-radius: 9999px;
          border: 1px solid #FAD4DE;
        }

        .flower-node {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          transition: all 0.25s ease;
        }
        .flower-node.completed {
          background: #FFE5EC;
          box-shadow: 0 0 8px rgba(185, 52, 93, 0.3);
        }

        /* Category Tabs Ribbon Bar */
        .category-ribbon-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }

        .category-ribbon {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          padding: 6px 10px;
          border-radius: 9999px;
          border: 1.5px solid #FAD4DE;
          box-shadow: 0 4px 18px rgba(185, 52, 93, 0.06);
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 100%;
        }
        .category-ribbon::-webkit-scrollbar {
          display: none;
        }

        .category-tab-btn {
          background: none;
          border: none;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: clamp(0.8rem, 0.85vw, 0.9rem);
          font-weight: 600;
          color: #5C434B;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .category-tab-btn:hover {
          color: #B9345D;
          background-color: #FFF0F4;
        }
        .category-tab-btn.active {
          color: #FFFFFF !important;
          background-color: #B9345D !important;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(185, 52, 93, 0.35);
        }

        .category-tab-btn-highlight {
          background: linear-gradient(135deg, #B9345D 0%, #D84371 100%);
          color: #FFFFFF !important;
          padding: 8px 18px;
          border-radius: 9999px;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(185, 52, 93, 0.3);
        }
        .category-tab-btn-highlight:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(185, 52, 93, 0.4);
        }

        /* Challenge List Item Row (Matching exact user screenshot) */
        .challenge-item-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-radius: 20px;
          border: 1.5px solid #FAD4DE;
          background-color: #FFFFFF;
          box-shadow: 0 3px 12px rgba(185, 52, 93, 0.04);
          transition: all 0.2s ease;
          gap: 16px;
          margin-bottom: 14px;
        }
        .challenge-item-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(185, 52, 93, 0.09);
        }
        .challenge-item-card.completed {
          background-color: #F8FAF7;
          border-color: #A3D9A5;
        }

        .challenge-left-info {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .challenge-number-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #FFE5EC;
          color: #B9345D;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .challenge-number-badge.done {
          background-color: #E8F5E9;
          color: #2E7D32;
        }

        .challenge-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .challenge-title-text {
          font-size: 1rem;
          font-weight: 700;
          color: #3E242B;
          margin-bottom: 3px;
        }

        .challenge-sub-text {
          font-size: 0.825rem;
          color: #7D626C;
          margin: 0;
          line-height: 1.35;
        }

        .challenge-action-btn {
          background-color: #FFFFFF;
          color: #B9345D;
          border: 1.5px solid #B9345D;
          border-radius: 9999px;
          padding: 9px 20px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .challenge-action-btn:hover {
          background-color: #FFF0F4;
          transform: translateY(-1px);
        }
        .challenge-action-btn.done-btn {
          background-color: #2E7D32;
          color: #FFFFFF;
          border-color: #2E7D32;
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.25);
        }

        @media (max-width: 768px) {
          .hero-side-illustration {
            display: none;
          }
          .challenge-item-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .challenge-action-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="sakhi-play-wrapper">
        
        {/* Hero Header Section (Matching exact user screenshot with cute illustrations & notes) */}
        <div className="hero-banner-container">
          
          {/* Left Side: Cute Avatar Illustration + Note */}
          <div className="hero-side-illustration">
            <span className="handwritten-note" style={{ marginBottom: '6px' }}>
              Small habits...<br />Big changes .♡
            </span>
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#FFE5EC" />
              {/* Hair */}
              <path d="M25 45C25 25 35 15 50 15C65 15 75 25 75 45C75 55 72 65 72 75H28C28 65 25 55 25 45Z" fill="#3E242B" />
              {/* Face */}
              <circle cx="50" cy="45" r="20" fill="#FFD4C4" />
              {/* Blushes */}
              <circle cx="42" cy="48" r="3" fill="#FF8DA1" opacity="0.6" />
              <circle cx="58" cy="48" r="3" fill="#FF8DA1" opacity="0.6" />
              {/* Closed Eyes */}
              <path d="M41 43C42 45 44 45 45 43" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" />
              <path d="M55 43C56 45 58 45 59 43" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" />
              {/* Gentle Smile */}
              <path d="M47 52C49 54 51 54 53 52" stroke="#B9345D" strokeWidth="2" strokeLinecap="round" />
              {/* Dress / Top */}
              <path d="M30 75C30 65 40 62 50 62C60 62 70 65 70 75V95H30V75Z" fill="#B9345D" />
              {/* Hands folded over heart */}
              <ellipse cx="50" cy="72" rx="10" ry="6" fill="#FFD4C4" />
              {/* Flowers around */}
              <circle cx="22" cy="30" r="5" fill="#FF8DA1" />
              <circle cx="78" cy="30" r="5" fill="#FF8DA1" />
              <circle cx="82" cy="65" r="4" fill="#FAD4DE" />
            </svg>
          </div>

          {/* Center Banner Content */}
          <div className="hero-center-content">
            <div className="hero-badge">
              <Sparkles size={15} color="#B9345D" />
              <span>{t('play.dailyChallenge', { defaultValue: 'DAILY SAKHI CHALLENGES' })}</span>
              <span>🌸</span>
            </div>
            <h1 className="hero-title">
              {t('play.title', { defaultValue: 'Small Daily Wins' })}
            </h1>
            <p className="hero-subtitle">
              {t('play.subtitle', { defaultValue: 'Tiny self-care commitments to show up for your mind and body today.' })}
            </p>
          </div>

          {/* Right Side: Floral Bouquet Illustration + Note */}
          <div className="hero-side-illustration">
            <span className="handwritten-note" style={{ marginBottom: '6px' }}>
              A healthier<br />you, every day .♡
            </span>
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#FFF0F4" />
              {/* Main Center Rose */}
              <circle cx="50" cy="45" r="16" fill="#C23B68" />
              <circle cx="50" cy="45" r="10" fill="#E05282" />
              <circle cx="50" cy="45" r="5" fill="#FFE5EC" />
              {/* Side Flowers */}
              <circle cx="32" cy="58" r="12" fill="#FF8DA1" />
              <circle cx="68" cy="58" r="12" fill="#FF8DA1" />
              {/* Leaves */}
              <path d="M20 40C20 40 30 30 40 40C30 50 20 40 20 40Z" fill="#4CAF50" />
              <path d="M80 40C80 40 70 30 60 40C70 50 80 40 80 40Z" fill="#4CAF50" />
              <path d="M45 75C45 75 50 85 55 75C50 65 45 75 45 75Z" fill="#81C784" />
            </svg>
          </div>

        </div>

        {/* Main Card Container */}
        <div className="play-main-card">
          
          {/* 1. Streak Progress Bar (Matching user screenshot) */}
          <DailyStreakProgressBar />

          {/* 2. Category Ribbon Tabs */}
          <div className="category-ribbon-wrapper">
            <div className="category-ribbon">
              
              <button 
                type="button"
                className={`category-tab-btn ${activeTab === 'affirmation' ? 'active' : ''}`}
                onClick={() => setActiveTab('affirmation')}
              >
                <Heart size={15} color={activeTab === 'affirmation' ? '#FFFFFF' : '#B9345D'} fill={activeTab === 'affirmation' ? '#FFFFFF' : 'none'} />
                <span>{t('play.affirmation.title', { defaultValue: 'Affirmation' })}</span>
              </button>

              <button 
                type="button"
                className={`category-tab-btn ${activeTab === 'mood' ? 'active' : ''}`}
                onClick={() => setActiveTab('mood')}
              >
                <Brain size={15} color={activeTab === 'mood' ? '#FFFFFF' : '#9333EA'} />
                <span>{t('play.moodMatch.title', { defaultValue: 'Mood Match' })}</span>
                <Sparkles size={12} color={activeTab === 'mood' ? '#FFFFFF' : '#9333EA'} />
              </button>

              <button 
                type="button"
                className={`category-tab-btn ${activeTab === 'bloom' ? 'active' : ''}`}
                onClick={() => setActiveTab('bloom')}
              >
                <Flower2 size={15} color={activeTab === 'bloom' ? '#FFFFFF' : '#B9345D'} />
                <span>{t('play.memoryBloom.title', { defaultValue: 'Memory Bloom' })}</span>
              </button>

              <button 
                type="button"
                className={`category-tab-btn ${activeTab === 'bubble' ? 'active' : ''}`}
                onClick={() => setActiveTab('bubble')}
              >
                <span>🫧</span>
                <span>{t('play.bubbleCalm.title', { defaultValue: 'Bubble Calm' })}</span>
              </button>

              <button 
                type="button"
                className={`category-tab-btn ${activeTab === 'wheel' ? 'active' : ''}`}
                onClick={() => setActiveTab('wheel')}
              >
                <span>🌿</span>
                <span>{t('play.careWheel.title', { defaultValue: 'Care Wheel' })}</span>
              </button>

              <button 
                type="button"
                className={`category-tab-btn ${activeTab === 'myth' ? 'active' : ''}`}
                onClick={() => setActiveTab('myth')}
              >
                <span>🥊</span>
                <span>{t('play.mythFact.title', { defaultValue: 'Myth or Fact' })}</span>
              </button>

              <button 
                type="button"
                className={`category-tab-btn category-tab-btn-highlight ${activeTab === 'daily' ? 'active' : ''}`}
                onClick={() => setActiveTab('daily')}
              >
                <Sparkles size={15} color="#FFFFFF" />
                <span>{t('play.dailyChallenge', { defaultValue: 'Daily Challenge' })}</span>
                <Sparkles size={12} color="#FFFFFF" />
              </button>

            </div>
          </div>

          {/* 3. Render Selected View */}
          {activeTab === 'daily' && <DailyChallengeList />}
          {activeTab === 'affirmation' && <AffirmationGame />}
          {activeTab === 'mood' && <MoodMatchGame />}
          {activeTab === 'bloom' && <MemoryBloomGame />}
          {activeTab === 'bubble' && <BubbleCalmGame />}
          {activeTab === 'wheel' && <CareWheelGame />}
          {activeTab === 'myth' && <MythOrFactGame />}

        </div>

      </div>
    </div>
  );
}

/* ==========================================================================
   STREAK PROGRESS BAR COMPONENT (Matching user screenshot)
   ========================================================================== */
function DailyStreakProgressBar() {
  const { t } = useLanguage();
  const [completedWins, setCompletedWins] = useState(0);

  // Listen to custom completion events
  useEffect(() => {
    function handleWinUpdate(e) {
      if (typeof e.detail === 'number') {
        setCompletedWins(e.detail);
      }
    }
    window.addEventListener('sakhi-win-updated', handleWinUpdate);
    return () => window.removeEventListener('sakhi-win-updated', handleWinUpdate);
  }, []);

  return (
    <div className="streak-progress-bar">
      <div className="streak-title-wrap">
        <div className="streak-flame-circle">
          <Flame size={18} color="#B9345D" />
        </div>
        <span>{t('play.dailyStreak', { defaultValue: "Today's Streak Progress" })}: {completedWins} / 5</span>
      </div>

      <div className="streak-flower-track">
        {[1, 2, 3, 4, 5].map((idx) => {
          const isDone = idx <= completedWins;
          return (
            <div key={idx} className={`flower-node ${isDone ? 'completed' : ''}`}>
              <span>{isDone ? '🌺' : '🌸'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================================
   DAILY CHALLENGE LIST (Matching user screenshot)
   ========================================================================== */
function DailyChallengeList() {
  const { t } = useLanguage();
  const { addCoins } = useRewards();
  const [completedMap, setCompletedMap] = useState({
    hydration: false,
    silence: false,
    compress: false,
    stretch: false,
    tea: false
  });

  const challenges = [
    {
      id: 'hydration',
      num: 1,
      icon: '💧',
      title: t('events.categories.lifestyle', { defaultValue: 'Hydration Glow Check 💧' }),
      desc: t('events.types.dietChange', { defaultValue: 'Drink at least 4 glasses of room temperature or warm water today.' }),
      iconBg: '#E0F2FE'
    },
    {
      id: 'silence',
      num: 2,
      icon: '🌸',
      title: t('floatingPhrases.breathe', { defaultValue: '5 Minutes for Yourself 🌸' }),
      desc: t('floatingPhrases.restIsProductive', { defaultValue: 'Sit in silence, breathe deeply, and disconnect from all chores for 5 undisturbed minutes.' }),
      iconBg: '#FFEBF0'
    },
    {
      id: 'compress',
      num: 3,
      icon: '🌿',
      title: t('events.types.cramps', { defaultValue: 'Warm Compress Ritual 🌿' }),
      desc: t('events.types.pain', { defaultValue: 'Apply a warm water bag or heating pad for 10 minutes to soothe pelvic tension.' }),
      iconBg: '#E8F5E9'
    },
    {
      id: 'stretch',
      num: 4,
      icon: '🧘‍♀️',
      title: t('events.types.exercise', { defaultValue: 'Gentle Cat-Cow Stretch 🧘‍♀️' }),
      desc: t('events.types.exerciseChange', { defaultValue: 'Do 2 minutes of gentle cat-cow spine stretches to relieve lower back stiffness.' }),
      iconBg: '#FEF3C7'
    },
    {
      id: 'tea',
      num: 5,
      icon: '🍵',
      title: t('events.types.dietChange', { defaultValue: 'Soothing Herbal Tea 🍵' }),
      desc: t('events.types.dietChange', { defaultValue: 'Enjoy a warm cup of herbal tea without sugar to calm digestion.' }),
      iconBg: '#F3E8FF'
    }
  ];

  const toggleComplete = (id) => {
    setCompletedMap((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const winCount = Object.values(next).filter(Boolean).length;
      
      // Dispatch custom win update event for header bar
      window.dispatchEvent(new CustomEvent('sakhi-win-updated', { detail: winCount }));
      
      if (next[id]) {
        addCoins(20); // Award Sakhi Coins for self care win
      }
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {challenges.map((c) => {
        const isDone = !!completedMap[c.id];
        return (
          <div 
            key={c.id} 
            className={`challenge-item-card ${isDone ? 'completed' : ''}`}
          >
            <div className="challenge-left-info">
              {/* Number Circle Badge */}
              <div className={`challenge-number-badge ${isDone ? 'done' : ''}`}>
                {c.num}
              </div>

              {/* Icon Square Box */}
              <div 
                className="challenge-icon-box"
                style={{ backgroundColor: c.iconBg }}
              >
                {c.icon}
              </div>

              {/* Title and Description */}
              <div>
                <div className="challenge-title-text">
                  {c.title}
                </div>
                <p className="challenge-sub-text">
                  {c.desc}
                </p>
              </div>
            </div>

            {/* Tap to Complete Action Button */}
            <button
              type="button"
              onClick={() => toggleComplete(c.id)}
              className={`challenge-action-btn ${isDone ? 'done-btn' : ''}`}
            >
              {isDone ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>{t('play.congrats', { defaultValue: 'Completed ✓ (+20 Coins)' })}</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>{t('common.tapHere', { defaultValue: 'Tap to Complete' })}</span>
                </>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   AFFIRMATION GAME
   ========================================================================== */
function AffirmationGame() {
  const { t } = useLanguage();
  const affirmations = [
    { text: t('play.affirmation.card1', { defaultValue: "My body is wise, resilient, and knows how to restore itself." }), category: "Self-Compassion" },
    { text: t('play.affirmation.card2', { defaultValue: "I release guilt for resting. Resting is essential work for my hormonal health." }), category: "Rest & Recovery" },
    { text: t('play.affirmation.card3', { defaultValue: "My period is a natural sign of vitality, strength, and rhythm." }), category: "Body Positivity" },
    { text: t('floatingPhrases.bodyListening', { defaultValue: "I honor my changing mood and honor my boundaries with love." }), category: "Emotional Wellbeing" },
    { text: t('floatingPhrases.honorRhythm', { defaultValue: "I am patient with my body as it moves through every unique cycle phase." }), category: "Mindfulness" }
  ];

  const [index, setIndex] = useState(0);

  const nextAffirmation = () => {
    setIndex((prev) => (prev + 1) % affirmations.length);
  };

  const current = affirmations[index];

  return (
    <div style={{ padding: '24px 16px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '12px' }}>
        <Heart size={18} color="#B9345D" fill="#B9345D" />
        <span>{t('play.affirmation.title', { defaultValue: 'DAILY SAKHI AFFIRMATIONS' })}</span>
      </div>

      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '24px' }}>
        {t('play.affirmation.desc', { defaultValue: 'Nurture Your Mind Today' })}
      </h2>

      <div 
        style={{
          backgroundColor: '#FFF0F4',
          borderRadius: '24px',
          padding: '40px 28px',
          border: '2px dashed #FAD4DE',
          maxWidth: '680px',
          margin: '0 auto 28px',
          position: 'relative'
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#B9345D', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: '#FFFFFF', padding: '6px 16px', borderRadius: '50px', border: '1px solid #FAD4DE' }}>
          {current.category}
        </span>

        <p style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.6rem', color: '#3E242B', fontWeight: '600', lineHeight: 1.5, margin: '24px 0' }}>
          "{current.text}"
        </p>

        <span style={{ fontSize: '1.8rem' }}>🌸</span>
      </div>

      <button
        onClick={nextAffirmation}
        style={{
          backgroundColor: '#B9345D',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 28px',
          fontSize: '0.95rem',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 14px rgba(185, 52, 93, 0.3)'
        }}
      >
        <RefreshCw size={16} />
        <span>{t('play.affirmation.draw', { defaultValue: 'Draw Another Affirmation' })}</span>
      </button>
    </div>
  );
}

/* ==========================================================================
   MOOD MATCH GAME
   ========================================================================== */
function MoodMatchGame() {
  const { t } = useLanguage();
  const cardsData = [
    { id: 1, icon: '☕', name: t('events.types.dietChange', { defaultValue: 'Warm Herbal Tea' }) },
    { id: 2, icon: '🧘‍♀️', name: t('events.types.exercise', { defaultValue: 'Gentle Yoga' }) },
    { id: 3, icon: '😴', name: t('events.types.poorSleep', { defaultValue: 'Deep Rest' }) },
    { id: 4, icon: '🍫', name: t('events.types.cravings', { defaultValue: 'Dark Cocoa' }) },
    { id: 5, icon: '♨️', name: t('events.types.pain', { defaultValue: 'Heating Pad' }) },
    { id: 6, icon: '💧', name: t('common.water', { defaultValue: 'Hydration' }) }
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const duplicated = [...cardsData, ...cardsData].map((c, i) => ({ ...c, key: i }));
    const shuffled = duplicated.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].id)) return;

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextFlipped;
      if (cards[firstIdx].id === cards[secondIdx].id) {
        setMatched((prev) => [...prev, cards[firstIdx].id]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const isWon = matched.length === cardsData.length;

  return (
    <div style={{ padding: '24px 16px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <Brain size={18} color="#9333EA" />
        <span>{t('play.moodMatch.title', { defaultValue: 'MOOD & CARE MATCHING GAME' })}</span>
      </div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '8px' }}>
        {t('play.moodMatch.desc', { defaultValue: 'Match the Self-Care Pairs' })}
      </h2>
      <p style={{ color: '#7D626C', fontSize: '0.95rem', marginBottom: '24px' }}>
        {t('play.moodMatch.matches', { count: matched.length, total: cardsData.length, defaultValue: `Matches: ${matched.length} / ${cardsData.length}` })}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', maxWidth: '520px', margin: '0 auto 28px' }}>
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(card.id);
          return (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              style={{
                height: '90px',
                borderRadius: '16px',
                border: '1.5px solid #FAD4DE',
                backgroundColor: isFlipped ? '#FFEBF0' : '#FFFFFF',
                fontSize: isFlipped ? '2rem' : '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px rgba(185, 52, 93, 0.06)'
              }}
            >
              {isFlipped ? card.icon : '🌸'}
            </button>
          );
        })}
      </div>

      {isWon && (
        <div style={{ backgroundColor: '#E8F5E9', padding: '16px 24px', borderRadius: '16px', color: '#2E7D32', fontWeight: '700', marginBottom: '20px', border: '1px solid #C8E6C9' }}>
          🎉 {t('play.congrats', { defaultValue: 'Wonderful job! You completed Mood Match!' })}
        </div>
      )}

      <button
        onClick={initGame}
        style={{
          backgroundColor: '#B9345D',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50px',
          padding: '10px 24px',
          fontWeight: '700',
          fontSize: '0.9rem',
          cursor: 'pointer'
        }}
      >
        {t('play.restart', { defaultValue: 'Reset & Play Again' })}
      </button>
    </div>
  );
}

/* ==========================================================================
   MEMORY BLOOM GAME
   ========================================================================== */
function MemoryBloomGame() {
  const { t } = useLanguage();
  const flowers = [
    { id: 0, name: 'Rose', icon: '🌹' },
    { id: 1, name: 'Tulip', icon: '🌷' },
    { id: 2, name: 'Blossom', icon: '🌸' },
    { id: 3, name: 'Sunflower', icon: '🌻' }
  ];

  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [score, setScore] = useState(0);
  const [activeFlower, setActiveFlower] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusText, setStatusText] = useState(t('play.memoryBloom.desc', { defaultValue: "Tap Start to begin Memory Bloom!" }));

  const startGame = () => {
    setSequence([]);
    setPlayerInput([]);
    setScore(0);
    setIsPlaying(true);
    addNextStep([]);
  };

  const addNextStep = (currentSeq) => {
    const nextRandom = Math.floor(Math.random() * 4);
    const newSeq = [...currentSeq, nextRandom];
    setSequence(newSeq);
    setPlayerInput([]);
    playSequence(newSeq);
  };

  const playSequence = async (seq) => {
    setStatusText(t('garden.bloomingSoon', { defaultValue: "Watch the flowers bloom..." }));
    for (let i = 0; i < seq.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      setActiveFlower(seq[i]);
      await new Promise((r) => setTimeout(r, 600));
      setActiveFlower(null);
    }
    setStatusText(t('common.tapHere', { defaultValue: "Your turn! Repeat the blooming pattern." }));
  };

  const handleFlowerClick = (id) => {
    if (!isPlaying) return;

    setActiveFlower(id);
    setTimeout(() => setActiveFlower(null), 250);

    const nextInput = [...playerInput, id];
    setPlayerInput(nextInput);

    const currentIndex = nextInput.length - 1;
    if (nextInput[currentIndex] !== sequence[currentIndex]) {
      setStatusText(t('play.tryAgain', { defaultValue: `Game Over! Final Score: ${score}. Tap Start to try again!` }));
      setIsPlaying(false);
      return;
    }

    if (nextInput.length === sequence.length) {
      setScore((s) => s + 1);
      setStatusText(t('play.congrats', { defaultValue: "Great pattern recognition! Next round incoming..." }));
      setTimeout(() => addNextStep(sequence), 1000);
    }
  };

  return (
    <div style={{ padding: '24px 16px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <Flower2 size={18} color="#E05282" />
        <span>{t('play.memoryBloom.title', { defaultValue: 'FLORAL MEMORY BLOOM' })}</span>
      </div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '4px' }}>
        {t('play.memoryBloom.desc', { defaultValue: 'Repeat the Blooming Pattern' })}
      </h2>
      <p style={{ color: '#7D626C', fontSize: '0.95rem', marginBottom: '20px' }}>
        {t('play.score', { score, defaultValue: `Streak Score: ${score}` })}
      </p>

      <div style={{ backgroundColor: '#FFF0F4', padding: '10px 20px', borderRadius: '50px', color: '#B9345D', fontWeight: '600', display: 'inline-block', marginBottom: '24px' }}>
        {statusText}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '320px', margin: '0 auto 28px' }}>
        {flowers.map((f) => (
          <button
            key={f.id}
            onClick={() => handleFlowerClick(f.id)}
            style={{
              height: '110px',
              borderRadius: '20px',
              border: activeFlower === f.id ? '3px solid #B9345D' : '1.5px solid #FAD4DE',
              backgroundColor: activeFlower === f.id ? '#FFE5EC' : '#FFFFFF',
              fontSize: '2.5rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: activeFlower === f.id ? '0 0 20px rgba(185, 52, 93, 0.4)' : '0 4px 10px rgba(185, 52, 93, 0.04)',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{f.icon}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#7D626C', marginTop: '4px' }}>{f.name}</span>
          </button>
        ))}
      </div>

      {!isPlaying && (
        <button
          onClick={startGame}
          style={{
            backgroundColor: '#B9345D',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 32px',
            fontWeight: '700',
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(185, 52, 93, 0.3)'
          }}
        >
          {t('play.startPlay', { defaultValue: 'Start Memory Bloom' })}
        </button>
      )}
    </div>
  );
}

/* ==========================================================================
   BUBBLE CALM GAME
   ========================================================================== */
function BubbleCalmGame() {
  const { t } = useLanguage();
  const thoughts = [
    t('floatingPhrases.breathe', { defaultValue: "Unclench your jaw" }),
    t('floatingPhrases.breathe', { defaultValue: "Deep breath in..." }),
    t('floatingPhrases.takeItSlow', { defaultValue: "Soft belly" }),
    t('floatingPhrases.doingOkay', { defaultValue: "You are safe" }),
    t('floatingPhrases.listenToBody', { defaultValue: "Release shoulder tension" }),
    t('floatingPhrases.gentleEnergy', { defaultValue: "Warmth & comfort" }),
    t('floatingPhrases.takeItSlow', { defaultValue: "Be gentle with yourself" }),
    t('floatingPhrases.restIsProductive', { defaultValue: "Relax your forehead" }),
    t('floatingPhrases.listenToBody', { defaultValue: "Drop your shoulders" }),
    t('floatingPhrases.breathe', { defaultValue: "Slow, calm exhale" })
  ];

  const [bubbles, setBubbles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      popped: false,
      thought: thoughts[i % thoughts.length],
      color: ['#FFEBF0', '#E0F2FE', '#E8F5E9', '#F3E8FF', '#FEF3C7'][i % 5]
    }))
  );

  const [popCount, setPopCount] = useState(0);
  const [activeThought, setActiveThought] = useState(t('play.bubbleCalm.desc', { defaultValue: "Tap any bubble to pop away anxiety and release tension." }));

  const popBubble = (id, thought) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setPopCount((c) => c + 1);
    setActiveThought(thought);
  };

  const resetBubbles = () => {
    setBubbles((prev) => prev.map((b) => ({ ...b, popped: false })));
    setPopCount(0);
    setActiveThought(t('play.bubbleCalm.desc', { defaultValue: "Tap any bubble to pop away anxiety and release tension." }));
  };

  return (
    <div style={{ padding: '24px 16px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.1rem' }}>🫧</span>
        <span>{t('play.bubbleCalm.title', { defaultValue: 'BUBBLE CALM ANXIETY POPPER' })}</span>
      </div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '4px' }}>
        {t('play.bubbleCalm.desc', { defaultValue: 'Pop Away Stress & Cramp Tension' })}
      </h2>
      <p style={{ color: '#7D626C', fontSize: '0.95rem', marginBottom: '20px' }}>
        {t('play.bubbleCalm.popped', { count: popCount, defaultValue: `Bubbles Popped: ${popCount}` })}
      </p>

      <div style={{ backgroundColor: '#FFF0F4', padding: '14px 24px', borderRadius: '50px', color: '#B9345D', fontWeight: '700', fontSize: '1rem', display: 'inline-block', marginBottom: '28px', border: '1px solid #FAD4DE' }}>
        ✨ "{activeThought}"
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
        {bubbles.map((b) => (
          <button
            key={b.id}
            disabled={b.popped}
            onClick={() => popBubble(b.id, b.thought)}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: b.popped ? '1px dashed #DDD' : '2px solid rgba(250, 212, 222, 0.9)',
              backgroundColor: b.popped ? 'transparent' : b.color,
              opacity: b.popped ? 0.25 : 1,
              cursor: b.popped ? 'default' : 'pointer',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: b.popped ? 'none' : '0 6px 16px rgba(185, 52, 93, 0.12)',
              transition: 'transform 0.15s ease, opacity 0.3s ease'
            }}
          >
            {b.popped ? '✨' : '🫧'}
          </button>
        ))}
      </div>

      <button
        onClick={resetBubbles}
        style={{
          backgroundColor: '#B9345D',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50px',
          padding: '10px 24px',
          fontWeight: '700',
          fontSize: '0.9rem',
          cursor: 'pointer'
        }}
      >
        {t('play.restart', { defaultValue: 'Replenish Bubbles' })}
      </button>
    </div>
  );
}

/* ==========================================================================
   CARE WHEEL GAME
   ========================================================================== */
function CareWheelGame() {
  const { t } = useLanguage();
  const rewards = [
    { title: t('events.types.poorSleep', { defaultValue: "15 Min Power Nap 😴" }) },
    { title: t('events.types.dietChange', { defaultValue: "Chamomile Tea ☕" }) },
    { title: t('events.types.cramps', { defaultValue: "Heating Pad Ritual ♨️" }) },
    { title: t('events.types.cravings', { defaultValue: "Dark Cacao Treat 🍫" }) },
    { title: t('floatingPhrases.gentleEnergy', { defaultValue: "Comfort Playlist 🎧" }) },
    { title: t('events.types.exercise', { defaultValue: "Gentle Stretching 🧘" }) }
  ];

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedReward, setSelectedReward] = useState(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedReward(null);

    const randomDeg = 1440 + Math.floor(Math.random() * 360);
    const newRotation = rotation + randomDeg;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const normalized = (newRotation % 360);
      const index = Math.floor(((360 - normalized) % 360) / 60);
      setSelectedReward(rewards[index].title);
    }, 3000);
  };

  return (
    <div style={{ padding: '24px 16px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.1rem' }}>🌷</span>
        <span>{t('play.careWheel.title', { defaultValue: 'SELF-CARE COMFORT WHEEL' })}</span>
      </div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '24px' }}>
        {t('play.careWheel.desc', { defaultValue: 'Spin for Your Comfort Reward' })}
      </h2>

      <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 28px' }}>
        <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, fontSize: '1.6rem' }}>
          👇
        </div>

        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '4px solid #B9345D',
            boxShadow: '0 8px 24px rgba(185, 52, 93, 0.2)',
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 3s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#FFF0F4'
          }}
        >
          <div style={{ fontSize: '2.5rem' }}>🌸</div>
        </div>
      </div>

      {selectedReward && (
        <div style={{ backgroundColor: '#FFF0F4', padding: '14px 24px', borderRadius: '50px', color: '#B9345D', fontWeight: '700', fontSize: '1.1rem', marginBottom: '20px', border: '1px solid #FAD4DE' }}>
          🎁 {t('play.congrats', { defaultValue: 'You Won' })}: {selectedReward}!
        </div>
      )}

      <button
        onClick={spinWheel}
        disabled={spinning}
        style={{
          backgroundColor: '#B9345D',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 32px',
          fontWeight: '700',
          fontSize: '0.95rem',
          cursor: spinning ? 'default' : 'pointer',
          boxShadow: '0 4px 14px rgba(185, 52, 93, 0.3)'
        }}
      >
        {spinning ? t('play.careWheel.spinning', { defaultValue: 'Spinning...' }) : t('play.careWheel.spin', { defaultValue: 'Spin the Care Wheel 🌷' })}
      </button>
    </div>
  );
}

/* ==========================================================================
   MYTH OR FACT GAME
   ========================================================================== */
function MythOrFactGame() {
  const { t } = useLanguage();
  const quizData = [
    {
      question: t('play.mythFact.q1', { defaultValue: "Myth or Fact: You should avoid exercising during your period." }),
      answer: "Myth",
      explanation: t('play.mythFact.e1', { defaultValue: "Light exercises like walking or yoga release endorphins that naturally alleviate menstrual cramps and boost mood!" })
    },
    {
      question: t('play.mythFact.q2', { defaultValue: "Myth or Fact: Warm water or heating pads reduce pelvic muscle spasms." }),
      answer: "Fact",
      explanation: t('play.mythFact.e2', { defaultValue: "Heat increases blood flow to the uterine muscles, relaxing contractions and easing pain effectively." })
    },
    {
      question: t('play.mythFact.q3', { defaultValue: "Myth or Fact: Eating dark chocolate can help satisfy cravings and provide magnesium." }),
      answer: "Fact",
      explanation: t('play.mythFact.e3', { defaultValue: "Pure dark cacao is rich in magnesium and antioxidants, helping relax muscles and enhance serotonin levels." })
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const current = quizData[currentIndex];

  const handleAnswer = (ans) => {
    setSelectedAnswer(ans);
    if (ans === current.answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentIndex((prev) => (prev + 1) % quizData.length);
  };

  return (
    <div style={{ padding: '24px 16px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.1rem' }}>🥊</span>
        <span>{t('play.mythFact.title', { defaultValue: 'MYTH OR FACT TRIVIA' })}</span>
      </div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '8px' }}>
        {t('play.mythFact.desc', { defaultValue: 'Menstrual Health Knowledge Check' })}
      </h2>
      <p style={{ color: '#7D626C', fontSize: '0.95rem', marginBottom: '24px' }}>
        {t('play.score', { score, defaultValue: `Score: ${score}` })}
      </p>

      <div style={{ backgroundColor: '#FFF0F4', borderRadius: '20px', padding: '28px', maxWidth: '680px', margin: '0 auto 28px', border: '1.5px solid #FAD4DE' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#3E242B', lineHeight: 1.5, marginBottom: '24px' }}>
          {current.question}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => handleAnswer("Myth")}
            disabled={selectedAnswer !== null}
            style={{
              padding: '12px 32px',
              borderRadius: '50px',
              border: '2px solid #B9345D',
              backgroundColor: selectedAnswer === 'Myth' ? '#B9345D' : '#FFFFFF',
              color: selectedAnswer === 'Myth' ? '#FFFFFF' : '#B9345D',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            {t('play.mythFact.myth', { defaultValue: 'Myth' })} 🚫
          </button>
          <button
            onClick={() => handleAnswer("Fact")}
            disabled={selectedAnswer !== null}
            style={{
              padding: '12px 32px',
              borderRadius: '50px',
              border: '2px solid #2E7D32',
              backgroundColor: selectedAnswer === 'Fact' ? '#2E7D32' : '#FFFFFF',
              color: selectedAnswer === 'Fact' ? '#FFFFFF' : '#2E7D32',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            {t('play.mythFact.fact', { defaultValue: 'Fact' })} ✅
          </button>
        </div>

        {selectedAnswer && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '14px', border: '1px solid #FAD4DE' }}>
            <div style={{ fontWeight: '700', color: selectedAnswer === current.answer ? '#2E7D32' : '#B9345D', marginBottom: '6px' }}>
              {selectedAnswer === current.answer ? t('play.mythFact.correct', { defaultValue: '🎉 Correct!' }) : t('play.mythFact.incorrect', { defaultValue: '💡 Learning Moment:' })}
            </div>
            <p style={{ fontSize: '0.9rem', color: '#5C434B', margin: 0, lineHeight: 1.5 }}>
              {current.explanation}
            </p>
          </div>
        )}
      </div>

      {selectedAnswer && (
        <button
          onClick={nextQuestion}
          style={{
            backgroundColor: '#B9345D',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50px',
            padding: '10px 28px',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          {t('common.next', { defaultValue: 'Next Question →' })}
        </button>
      )}
    </div>
  );
}
