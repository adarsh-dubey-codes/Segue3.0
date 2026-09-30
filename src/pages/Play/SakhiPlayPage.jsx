import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Heart, Brain, Flower2, Sparkles, HelpCircle, CheckCircle2, 
  RotateCcw, Trophy, Volume2, VolumeX, Flame, RefreshCw, Smile, Award
} from 'lucide-react';
import Button from '../../components/Button/Button';

export default function SakhiPlayPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('daily'); // 'affirmation', 'mood', 'bloom', 'bubble', 'wheel', 'myth', 'daily'

  return (
    <div style={{ backgroundColor: '#FFF5F7', minHeight: 'calc(100vh - 80px)', padding: '28px 16px 80px' }}>
      <style>{`
        .sakhi-play-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Top Ribbon Bar */
        .ribbon-bar-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        .ribbon-bar {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1.2vw, 12px);
          background: rgba(255, 255, 255, 0.95);
          padding: 8px 16px;
          border-radius: 50px;
          border: 1.5px solid #FAD4DE;
          box-shadow: 0 4px 20px rgba(236, 115, 143, 0.12);
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 100%;
        }
        .ribbon-bar::-webkit-scrollbar {
          display: none;
        }

        .ribbon-btn {
          background: none;
          border: none;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: clamp(0.8rem, 0.9vw, 0.95rem);
          font-weight: 600;
          color: #7D626C;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .ribbon-btn:hover {
          color: #C23B68;
          background-color: #FFEBF0;
        }
        .ribbon-btn.active {
          color: #B9345D;
          background-color: #FFE5EC;
          box-shadow: 0 2px 8px rgba(185, 52, 93, 0.15);
        }

        .ribbon-btn-highlight {
          background: linear-gradient(135deg, #B9345D 0%, #E05282 100%);
          color: #FFFFFF !important;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(185, 52, 93, 0.35);
        }
        .ribbon-btn-highlight:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(185, 52, 93, 0.45);
        }
      `}</style>

      <div className="sakhi-play-container">
        
        {/* Top Feature Ribbon Bar (Matching user screenshot) */}
        <div className="ribbon-bar-wrapper">
          <div className="ribbon-bar">
            <button 
              className={`ribbon-btn ${activeTab === 'affirmation' ? 'active' : ''}`}
              onClick={() => setActiveTab('affirmation')}
            >
              <Heart size={16} color="#E05282" fill={activeTab === 'affirmation' ? '#E05282' : 'none'} />
              <span>Affirmation</span>
            </button>

            <button 
              className={`ribbon-btn ${activeTab === 'mood' ? 'active' : ''}`}
              onClick={() => setActiveTab('mood')}
            >
              <Brain size={16} color="#9333EA" />
              <span>Mood Match</span>
            </button>

            <button 
              className={`ribbon-btn ${activeTab === 'bloom' ? 'active' : ''}`}
              onClick={() => setActiveTab('bloom')}
            >
              <Flower2 size={16} color="#E05282" />
              <span>Memory Bloom</span>
            </button>

            <button 
              className={`ribbon-btn ${activeTab === 'bubble' ? 'active' : ''}`}
              onClick={() => setActiveTab('bubble')}
            >
              <span style={{ fontSize: '1rem' }}>🫧</span>
              <span>Bubble Calm</span>
            </button>

            <button 
              className={`ribbon-btn ${activeTab === 'wheel' ? 'active' : ''}`}
              onClick={() => setActiveTab('wheel')}
            >
              <span style={{ fontSize: '1rem' }}>🌷</span>
              <span>Care Wheel</span>
            </button>

            <button 
              className={`ribbon-btn ${activeTab === 'myth' ? 'active' : ''}`}
              onClick={() => setActiveTab('myth')}
            >
              <span style={{ fontSize: '1rem' }}>🎀</span>
              <span>Myth or Fact</span>
            </button>

            <button 
              className={`ribbon-btn ribbon-btn-highlight ${activeTab === 'daily' ? 'active' : ''}`}
              onClick={() => setActiveTab('daily')}
            >
              <Sparkles size={16} color="#FFFFFF" />
              <span>Daily Challenge</span>
            </button>
          </div>
        </div>

        {/* Dynamic Game Component Render */}
        {activeTab === 'daily' && <DailyChallengeGame />}
        {activeTab === 'affirmation' && <AffirmationGame />}
        {activeTab === 'mood' && <MoodMatchGame />}
        {activeTab === 'bloom' && <MemoryBloomGame />}
        {activeTab === 'bubble' && <BubbleCalmGame />}
        {activeTab === 'wheel' && <CareWheelGame />}
        {activeTab === 'myth' && <MythOrFactGame />}

      </div>
    </div>
  );
}

/* ==========================================================================
   1. DAILY CHALLENGE GAME (Small Daily Wins - Matching User Screenshot)
   ========================================================================== */
function DailyChallengeGame() {
  const [completed, setCompleted] = useState({});

  const challenges = [
    {
      id: 'hydration',
      icon: '💧',
      title: 'Hydration Glow Check 💧',
      desc: 'Drink at least 4 glasses of room temperature or warm water today.',
      bg: '#E0F2FE'
    },
    {
      id: 'silence',
      icon: '🌸',
      title: '5 Minutes for Yourself 🌸',
      desc: 'Sit in silence, breathe deeply, and disconnect from all chores for 5 undisturbed minutes.',
      bg: '#FFEBF0'
    },
    {
      id: 'compress',
      icon: '🌿',
      title: 'Warm Compress Ritual 🌿',
      desc: 'Apply a warm water bag or heating pad for 10 minutes to soothe pelvic tension.',
      bg: '#E8F5E9'
    },
    {
      id: 'stretch',
      icon: '🧘‍♀️',
      title: 'Gentle Cat-Cow Stretch 🧘‍♀️',
      desc: 'Do 2 minutes of gentle cat-cow spine stretches to relieve lower back stiffness.',
      bg: '#FEF3C7'
    },
    {
      id: 'tea',
      icon: '🍵',
      title: 'Soothing Chamomile / Ginger Sip 🍵',
      desc: 'Enjoy a warm cup of herbal tea without sugar to calm digestion.',
      bg: '#F3E8FF'
    }
  ];

  const toggleComplete = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', border: '1.5px solid #FAD4DE', boxShadow: '0 10px 30px rgba(185, 52, 93, 0.06)' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', letterSpacing: '0.06em', marginBottom: '8px' }}>
          <Sparkles size={16} />
          <span>DAILY SAKHI CHALLENGES</span>
          <Sparkles size={16} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: '#3E242B', fontWeight: '700', marginBottom: '8px' }}>
          Small Daily Wins
        </h2>
        <p style={{ color: '#7D626C', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Tiny self-care commitments to show up for your mind and body today.
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ backgroundColor: '#FFF0F4', borderRadius: '50px', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', border: '1px solid #FAD4DE' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: '#B9345D' }}>
          <Flame size={18} color="#B9345D" />
          <span>Today's Streak Progress: {completedCount} / {challenges.length} Wins</span>
        </div>
        <div style={{ width: '160px', height: '10px', backgroundColor: '#FFFFFF', borderRadius: '10px', overflow: 'hidden', border: '1px solid #FAD4DE' }}>
          <div style={{ width: `${(completedCount / challenges.length) * 100}%`, height: '100%', backgroundColor: '#B9345D', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* List of Challenge Cards (Matching Screenshot) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {challenges.map((c) => {
          const isDone = !!completed[c.id];
          return (
            <div 
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                borderRadius: '20px',
                border: isDone ? '1.5px solid #2E7D32' : '1.5px solid #FAD4DE',
                backgroundColor: isDone ? '#F1F8E9' : '#FFFFFF',
                boxShadow: '0 4px 14px rgba(185, 52, 93, 0.04)',
                transition: 'all 0.25s ease',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '260px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                  {c.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#3E242B', marginBottom: '4px' }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#7D626C', margin: 0, lineHeight: 1.4 }}>
                    {c.desc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleComplete(c.id)}
                style={{
                  backgroundColor: isDone ? '#2E7D32' : '#FFFFFF',
                  color: isDone ? '#FFFFFF' : '#B9345D',
                  border: isDone ? 'none' : '1.5px solid #B9345D',
                  borderRadius: '50px',
                  padding: '10px 22px',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isDone ? '0 4px 12px rgba(46, 125, 50, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <CheckCircle2 size={16} color={isDone ? '#FFFFFF' : '#B9345D'} />
                <span>{isDone ? 'Completed ✓' : 'Tap to Complete'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================================
   2. AFFIRMATION GAME (Interactive Daily Affirmation Card Generator)
   ========================================================================== */
function AffirmationGame() {
  const affirmations = [
    { text: "My body is wise, resilient, and knows how to restore itself.", category: "Self-Compassion" },
    { text: "I release guilt for resting. Resting is essential work for my hormonal health.", category: "Rest & Recovery" },
    { text: "My period is a natural sign of vitality, strength, and rhythm.", category: "Body Positivity" },
    { text: "I honor my changing mood and honor my boundaries with love.", category: "Emotional Wellbeing" },
    { text: "I am patient with my body as it moves through every unique cycle phase.", category: "Mindfulness" }
  ];

  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const nextAffirmation = () => {
    setIndex((prev) => (prev + 1) % affirmations.length);
    setCopied(false);
  };

  const current = affirmations[index];

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '40px 24px', border: '1.5px solid #FAD4DE', textAlign: 'center', boxShadow: '0 10px 30px rgba(185, 52, 93, 0.06)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '12px' }}>
        <Heart size={18} color="#B9345D" fill="#B9345D" />
        <span>DAILY SAKHI AFFIRMATIONS</span>
      </div>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '24px' }}>
        Nurture Your Mind Today
      </h2>

      {/* Affirmation Card */}
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
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#B9345D', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: '#FFFFFF', padding: '4px 14px', borderRadius: '50px', border: '1px solid #FAD4DE' }}>
          {current.category}
        </span>

        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#3E242B', fontWeight: '600', lineHeight: 1.5, margin: '24px 0' }}>
          "{current.text}"
        </p>

        <span style={{ fontSize: '1.5rem' }}>🌸</span>
      </div>

      <div style={{ display: 'flex', justifyCenter: 'center', gap: '12px', justifyContent: 'center' }}>
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
          <span>Draw Another Affirmation</span>
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. MOOD MATCH GAME (Memory Pair Card Game)
   ========================================================================== */
function MoodMatchGame() {
  const cardsData = [
    { id: 1, icon: '☕', name: 'Warm Herbal Tea' },
    { id: 2, icon: '🧘‍♀️', name: 'Gentle Yoga' },
    { id: 3, icon: '😴', name: 'Deep Rest' },
    { id: 4, icon: '🍫', name: 'Dark Cocoa' },
    { id: 5, icon: '♨️', name: 'Heating Pad' },
    { id: 6, icon: '💧', name: 'Hydration' }
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
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', border: '1.5px solid #FAD4DE', textAlign: 'center', boxShadow: '0 10px 30px rgba(185, 52, 93, 0.06)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <Brain size={18} color="#9333EA" />
        <span>MOOD & CARE MATCHING GAME</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '8px' }}>
        Match the Self-Care Pairs
      </h2>
      <p style={{ color: '#7D626C', fontSize: '0.95rem', marginBottom: '24px' }}>
        Moves: <strong>{moves}</strong> • Matched: <strong>{matched.length} / {cardsData.length}</strong>
      </p>

      {/* Grid */}
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
          🎉 Wonderful job! You completed Mood Match in {moves} moves!
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
        Reset & Play Again
      </button>
    </div>
  );
}

/* ==========================================================================
   4. MEMORY BLOOM GAME (Flower Pattern Sequence Game)
   ========================================================================== */
function MemoryBloomGame() {
  const flowers = [
    { id: 0, name: 'Rose', icon: '🌹', color: '#FFD1DC' },
    { id: 1, name: 'Tulip', icon: '🌷', color: '#FFE5EC' },
    { id: 2, name: 'Blossom', icon: '🌸', color: '#F3E8FF' },
    { id: 3, name: 'Sunflower', icon: '🌻', color: '#FEF3C7' }
  ];

  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [score, setScore] = useState(0);
  const [activeFlower, setActiveFlower] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusText, setStatusText] = useState("Tap Start to begin Memory Bloom!");

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
    setStatusText("Watch the flowers bloom...");
    for (let i = 0; i < seq.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      setActiveFlower(seq[i]);
      await new Promise((r) => setTimeout(r, 600));
      setActiveFlower(null);
    }
    setStatusText("Your turn! Repeat the blooming pattern.");
  };

  const handleFlowerClick = (id) => {
    if (!isPlaying) return;

    setActiveFlower(id);
    setTimeout(() => setActiveFlower(null), 250);

    const nextInput = [...playerInput, id];
    setPlayerInput(nextInput);

    const currentIndex = nextInput.length - 1;
    if (nextInput[currentIndex] !== sequence[currentIndex]) {
      setStatusText(`Game Over! Final Score: ${score}. Tap Start to try again!`);
      setIsPlaying(false);
      return;
    }

    if (nextInput.length === sequence.length) {
      setScore((s) => s + 1);
      setStatusText("Great pattern recognition! Next round incoming...");
      setTimeout(() => addNextStep(sequence), 1000);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', border: '1.5px solid #FAD4DE', textAlign: 'center', boxShadow: '0 10px 30px rgba(185, 52, 93, 0.06)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <Flower2 size={18} color="#E05282" />
        <span>FLORAL MEMORY BLOOM</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '4px' }}>
        Repeat the Blooming Pattern
      </h2>
      <p style={{ color: '#7D626C', fontSize: '0.95rem', marginBottom: '20px' }}>
        Streak Score: <strong style={{ color: '#B9345D', fontSize: '1.2rem' }}>{score}</strong>
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
          Start Memory Bloom
        </button>
      )}
    </div>
  );
}

/* ==========================================================================
   5. BUBBLE CALM GAME (Stress Relief Bubble Popper)
   ========================================================================== */
function BubbleCalmGame() {
  const thoughts = [
    "Unclench your jaw",
    "Deep breath in...",
    "Soft belly",
    "You are safe",
    "Release shoulder tension",
    "Warmth & comfort",
    "Be gentle with yourself",
    "Relax your forehead",
    "Drop your shoulders",
    "Slow, calm exhale"
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
  const [activeThought, setActiveThought] = useState("Tap any bubble to pop away anxiety and release tension.");

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
    setActiveThought("Tap any bubble to pop away anxiety and release tension.");
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', border: '1.5px solid #FAD4DE', textAlign: 'center', boxShadow: '0 10px 30px rgba(185, 52, 93, 0.06)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.1rem' }}>🫧</span>
        <span>BUBBLE CALM ANXIETY POPPER</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '4px' }}>
        Pop Away Stress & Cramp Tension
      </h2>
      <p style={{ color: '#7D626C', fontSize: '0.95rem', marginBottom: '20px' }}>
        Bubbles Popped: <strong style={{ color: '#B9345D' }}>{popCount}</strong>
      </p>

      {/* Thought banner */}
      <div style={{ backgroundColor: '#FFF0F4', padding: '14px 24px', borderRadius: '50px', color: '#B9345D', fontWeight: '700', fontSize: '1rem', display: 'inline-block', marginBottom: '28px', border: '1px solid #FAD4DE' }}>
        ✨ "{activeThought}"
      </div>

      {/* Bubble Grid */}
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
        Replenish Bubbles
      </button>
    </div>
  );
}

/* ==========================================================================
   6. CARE WHEEL GAME (Spinning Wheel of Self-Care Rewards)
   ========================================================================== */
function CareWheelGame() {
  const rewards = [
    { title: "15 Min Power Nap 😴", color: "#FFE5EC" },
    { title: "Chamomile Tea ☕", color: "#F3E8FF" },
    { title: "Heating Pad Ritual ♨️", color: "#FFEBF0" },
    { title: "Dark Cacao Treat 🍫", color: "#FEF3C7" },
    { title: "Comfort Playlist 🎧", color: "#E0F2FE" },
    { title: "Gentle Stretching 🧘", color: "#E8F5E9" }
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
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', border: '1.5px solid #FAD4DE', textAlign: 'center', boxShadow: '0 10px 30px rgba(185, 52, 93, 0.06)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.1rem' }}>🌷</span>
        <span>SELF-CARE COMFORT WHEEL</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '24px' }}>
        Spin for Your Comfort Reward
      </h2>

      {/* Wheel Visual */}
      <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 28px' }}>
        <div 
          style={{ 
            position: 'absolute', 
            top: '-12px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 10, 
            fontSize: '1.6rem' 
          }}
        >
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
          <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#B9345D' }}>🌸</div>
        </div>
      </div>

      {selectedReward && (
        <div style={{ backgroundColor: '#FFF0F4', padding: '14px 24px', borderRadius: '50px', color: '#B9345D', fontWeight: '700', fontSize: '1.1rem', marginBottom: '20px', border: '1px solid #FAD4DE' }}>
          🎁 You Won: {selectedReward}!
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
        {spinning ? 'Spinning...' : 'Spin the Care Wheel 🌷'}
      </button>
    </div>
  );
}

/* ==========================================================================
   7. MYTH OR FACT GAME (Menstrual Health Trivia)
   ========================================================================== */
function MythOrFactGame() {
  const quizData = [
    {
      question: "Myth or Fact: You should avoid exercising during your period.",
      answer: "Myth",
      explanation: "Light exercises like walking or yoga release endorphins that naturally alleviate menstrual cramps and boost mood!"
    },
    {
      question: "Myth or Fact: Warm water or heating pads reduce pelvic muscle spasms.",
      answer: "Fact",
      explanation: "Heat increases blood flow to the uterine muscles, relaxing contractions and easing pain effectively."
    },
    {
      question: "Myth or Fact: Eating dark chocolate can help satisfy cravings and provide magnesium.",
      answer: "Fact",
      explanation: "Pure dark cacao is rich in magnesium and antioxidants, helping relax muscles and enhance serotonin levels."
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
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', border: '1.5px solid #FAD4DE', textAlign: 'center', boxShadow: '0 10px 30px rgba(185, 52, 93, 0.06)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.1rem' }}>🎀</span>
        <span>MYTH OR FACT TRIVIA</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '8px' }}>
        Menstrual Health Knowledge Check
      </h2>
      <p style={{ color: '#7D626C', fontSize: '0.95rem', marginBottom: '24px' }}>
        Score: <strong style={{ color: '#B9345D' }}>{score}</strong>
      </p>

      {/* Card */}
      <div style={{ backgroundColor: '#FFF0F4', borderRadius: '20px', padding: '28px', maxWidth: '600px', margin: '0 auto 28px', border: '1.5px solid #FAD4DE' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#3E242B', lineHeight: 1.5, marginBottom: '24px' }}>
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
            Myth 🚫
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
            Fact ✅
          </button>
        </div>

        {selectedAnswer && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '14px', border: '1px solid #FAD4DE' }}>
            <div style={{ fontWeight: '700', color: selectedAnswer === current.answer ? '#2E7D32' : '#B9345D', marginBottom: '6px' }}>
              {selectedAnswer === current.answer ? '🎉 Correct!' : '💡 Learning Moment:'}
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
          Next Question →
        </button>
      )}
    </div>
  );
}
