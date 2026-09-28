import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCycle } from '../../context/CycleContext';
import { dailyAffirmations } from '../../data/affirmationsData';
import Button from '../../components/Button/Button';
import HeroArt3D from '../../components/home/HeroArt3D';
import CycleSetupModal from '../../components/cycle/CycleSetupModal';
import DailyLogModal from '../../components/cycle/DailyLogModal';
import { 
  Calendar, MessageCircle, Sparkles, ShoppingBag, Stethoscope, 
  Users, User, Music, ArrowRight, Activity, Heart, Shield
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { cycleSetup, currentCycleDay, currentPhase } = useCycle();
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);

  // Today's affirmation
  const randomAffirmation = dailyAffirmations[new Date().getDate() % dailyAffirmations.length];

  const features = [
    { title: 'Cycle Tracker', desc: 'Log mood, flow & symptoms gently.', link: '/cycle', icon: Activity, color: '#EC738F' },
    { title: 'Sakhi AI', desc: 'Ask anything about your body, gently.', link: '/chat', icon: MessageCircle, color: '#6C5CE7' },
    { title: 'Lifestyle & Diet', desc: 'Phase-aware nutrition & movement.', link: '/lifestyle', icon: Sparkles, color: '#E09F3E' },
    { title: 'Period Products', desc: 'How-to videos, cups & eco guides.', link: '/products', icon: ShoppingBag, color: '#4E9F76' },
    { title: '24/7 Gynaecologists', desc: 'Verified specialists near you.', link: '/doctors', icon: Stethoscope, color: '#0984E3' },
    { title: 'Anonymous Forum', desc: 'Share experiences — no names.', link: '/forum', icon: Users, color: '#EC738F' },
    { title: 'Buddy System', desc: 'Connect with a cycle pen-pal.', link: '/buddy', icon: User, color: '#E84393' },
    { title: 'Good Vibes', desc: 'Music, affirmations & breathwork.', link: '/vibes', icon: Music, color: '#E09F3E' }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 80px 24px' }}>
      <style>{`
        .hero-split-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 40px;
          align-items: center;
        }
        .hero-outer-card {
          background: linear-gradient(135deg, #FFFFFF 0%, #FFF2F5 45%, #FFE2E9 100%);
          border-radius: 32px;
          padding: 48px 56px;
          border: 1px solid rgba(250, 212, 222, 0.7);
          box-shadow: 0 20px 50px rgba(236, 115, 143, 0.12);
          margin-bottom: 48px;
        }
        .cta-btn-primary {
          background-color: #EC738F !important;
          color: #FFFFFF !important;
          border-radius: var(--radius-full) !important;
          padding: 14px 28px !important;
          font-size: 1rem !important;
          font-weight: 600 !important;
          box-shadow: 0 6px 20px rgba(236, 115, 143, 0.35) !important;
          transition: all 0.2s ease !important;
        }
        .cta-btn-primary:hover {
          background-color: #D95B78 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(236, 115, 143, 0.45) !important;
        }
        .cta-btn-secondary {
          background-color: #FFFFFF !important;
          color: #38232A !important;
          border: 1px solid rgba(250, 212, 222, 0.9) !important;
          border-radius: var(--radius-full) !important;
          padding: 14px 28px !important;
          font-size: 1rem !important;
          font-weight: 600 !important;
          box-shadow: 0 4px 12px rgba(236, 115, 143, 0.08) !important;
          transition: all 0.2s ease !important;
        }
        .cta-btn-secondary:hover {
          background-color: #FFF0F3 !important;
          border-color: #EC738F !important;
          transform: translateY(-2px);
        }

        @media (max-width: 960px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-outer-card {
            padding: 32px 24px !important;
            border-radius: 24px !important;
          }
        }
      `}</style>

      {/* MAIN HERO OUTER CONTAINER CARD */}
      <section className="hero-outer-card">
        <div className="hero-split-grid">
          {/* LEFT SIDE: HEADLINE, BADGE, DESCRIPTIONS & CTAS */}
          <div>
            {/* Pill Badge */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#FFE5EC',
                color: '#EC738F',
                fontSize: '0.825rem',
                fontWeight: '600',
                marginBottom: '20px',
                border: '1px solid rgba(236, 115, 143, 0.25)'
              }}
            >
              <Sparkles size={14} color="#EC738F" />
              <span>Hello beautiful</span>
            </div>

            {/* Main Headline */}
            <h1 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.35rem',
                lineHeight: '1.15',
                color: '#38232A',
                fontWeight: '500',
                marginBottom: '20px',
                letterSpacing: '-0.02em'
              }}
            >
              Bloom in every <span style={{ color: '#EC738F', fontStyle: 'italic' }}>phase</span> of you.
            </h1>

            {/* Supporting Description */}
            <p 
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.1rem',
                color: '#7D626C',
                lineHeight: '1.65',
                marginBottom: '36px',
                maxWidth: '500px'
              }}
            >
              Track your cycle, talk to <strong>Sakhi AI</strong>, find a buddy, and care for yourself with warm, science-backed guidance.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button 
                variant="primary" 
                className="cta-btn-primary"
                onClick={() => navigate('/cycle')}
              >
                Set up my cycle &rarr;
              </Button>

              <Button 
                variant="outline" 
                className="cta-btn-secondary"
                onClick={() => navigate('/chat')}
                icon={<MessageCircle size={18} color="#EC738F" />}
              >
                Chat with Sakhi
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE: 3D ARTWORK & AFFIRMATION OVERLAY */}
          <div>
            <HeroArt3D affirmation={randomAffirmation} />
          </div>
        </div>
      </section>

      {/* DYNAMIC CYCLE CONTEXT CARD */}
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '32px 40px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div>
          <span style={{ fontSize: '0.775rem', fontWeight: '700', textTransform: 'uppercase', color: '#EC738F', letterSpacing: '0.08em' }}>
            Active Cycle Phase
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#38232A', margin: '4px 0 8px 0' }}>
            Day {currentCycleDay} • {currentPhase.toUpperCase()} PHASE
          </h2>
          <p style={{ color: '#7D626C', fontSize: '0.95rem', maxWidth: '540px' }}>
            Add your last period date and average cycle length to unlock predictions, insights, and phase-aware tips.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline" onClick={() => setIsSetupOpen(true)}>
            Edit Setup
          </Button>
          <Button variant="primary" className="cta-btn-primary" onClick={() => setIsLogOpen(true)} icon={<Sparkles size={16} />}>
            Log Today's Care
          </Button>
        </div>
      </div>

      {/* FEATURE DISCOVERY MODULES GRID */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', color: '#38232A', marginBottom: '24px' }}>
          Explore Sakhi Companion
        </h3>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.link}
                style={{
                  textDecoration: 'none',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                className="feature-card"
              >
                <div>
                  <div 
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--surface-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <Icon size={22} color={item.color} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#38232A', marginBottom: '6px' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: '#7D626C', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px', color: '#EC738F', fontWeight: '600', fontSize: '0.85rem' }}>
                  <span>Open</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <CycleSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
      <DailyLogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
    </div>
  );
}
