import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { dailyAffirmations } from '../../data/affirmationsData';
import Button from '../../components/Button/Button';
import HeroArt3D from '../../components/home/HeroArt3D';
import CycleSetupModal from '../../components/cycle/CycleSetupModal';
import DailyLogModal from '../../components/cycle/DailyLogModal';
import CyclePhaseVisual from '../../components/cycle/CyclePhaseVisual';
import VisualOnboarding from '../../components/home/VisualOnboarding';
import FeatureIllustration from '../../components/illustrations/FeatureIllustration';
import { 
  Sparkles, MessageCircle, HelpCircle, ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { currentCycleDay, currentPhase } = useCycle();
  const { t } = useLanguage();

  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Today's affirmation
  const randomAffirmation = dailyAffirmations[new Date().getDate() % dailyAffirmations.length];

  const features = [
    { key: 'cycle', title: t('feature.cycle.title'), desc: t('feature.cycle.desc'), link: '/cycle' },
    { key: 'mood', title: t('feature.mood.title'), desc: t('feature.mood.desc'), action: () => setIsLogOpen(true) },
    { key: 'chat', title: t('feature.chat.title'), desc: t('feature.chat.desc'), link: '/chat' },
    { key: 'eat', title: t('feature.eat.title'), desc: t('feature.eat.desc'), link: '/lifestyle' },
    { key: 'move', title: t('feature.move.title'), desc: t('feature.move.desc'), link: '/lifestyle' },
    { key: 'doctor', title: t('feature.doctor.title'), desc: t('feature.doctor.desc'), link: '/doctors' },
    { key: 'buddy', title: t('feature.buddy.title'), desc: t('feature.buddy.desc'), link: '/buddy' },
    { key: 'vibes', title: t('feature.vibes.title'), desc: t('feature.vibes.desc'), link: '/vibes' },
    { key: 'water', title: t('feature.water.title'), desc: t('feature.water.desc'), link: '/lifestyle' }
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
          margin-bottom: 40px;
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
        }
        .visual-card-item {
          background-color: #FFFFFF;
          border-radius: 24px;
          padding: 24px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          cursor: pointer;
        }
        .visual-card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(236, 115, 143, 0.18);
          border-color: #EC738F;
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
          <div>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
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
              <Sparkles size={15} color="#EC738F" />
              <span>Sakhi Companion</span>
            </div>

            <h1 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.1rem',
                lineHeight: '1.18',
                color: '#38232A',
                fontWeight: '600',
                marginBottom: '18px',
                letterSpacing: '-0.02em'
              }}
            >
              {t('hero.title')}
            </h1>

            <p 
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.1rem',
                color: '#7D626C',
                lineHeight: '1.65',
                marginBottom: '32px',
                maxWidth: '520px'
              }}
            >
              {t('hero.sub')}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button 
                variant="primary" 
                className="cta-btn-primary"
                onClick={() => navigate('/cycle')}
              >
                {t('hero.setup')} &rarr;
              </Button>

              <Button 
                variant="outline" 
                onClick={() => navigate('/chat')}
                icon={<MessageCircle size={18} color="#EC738F" />}
                style={{ borderRadius: 'var(--radius-full)', padding: '14px 24px' }}
              >
                {t('hero.chat')}
              </Button>

              <button
                type="button"
                onClick={() => setIsOnboardingOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--rose)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px'
                }}
              >
                <HelpCircle size={17} />
                <span>{t('hero.visualGuide')}</span>
              </button>
            </div>
          </div>

          <div>
            <HeroArt3D affirmation={randomAffirmation} />
          </div>
        </div>
      </section>

      {/* DYNAMIC VISUAL CYCLE PHASE CARD */}
      <section style={{ marginBottom: '40px' }}>
        <CyclePhaseVisual
          currentPhase={currentPhase}
          currentDay={currentCycleDay}
          onPhaseSelect={() => navigate('/cycle')}
        />
      </section>

      {/* VISUAL-FIRST FEATURE DISCOVERY GRID */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: '#38232A', margin: 0 }}>
            Visual Exploration
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Tap any visual to open
          </span>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {features.map((item) => {
            const Content = (
              <>
                <div>
                  <FeatureIllustration name={item.key} size={64} style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#38232A', marginTop: '16px', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#7D626C', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px', color: '#EC738F', fontWeight: '600', fontSize: '0.85rem' }}>
                  <span>Open</span>
                  <ArrowRight size={14} />
                </div>
              </>
            );

            if (item.link) {
              return (
                <Link key={item.key} to={item.link} className="visual-card-item" aria-label={item.title}>
                  {Content}
                </Link>
              );
            }

            return (
              <div key={item.key} onClick={item.action} className="visual-card-item" role="button" tabIndex={0} aria-label={item.title}>
                {Content}
              </div>
            );
          })}
        </div>
      </section>

      <CycleSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
      <DailyLogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
      <VisualOnboarding isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
    </div>
  );
}
