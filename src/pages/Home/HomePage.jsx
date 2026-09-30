import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { dailyAffirmations } from '../../data/affirmationsData';
import Button from '../../components/Button/Button';
import CycleSetupModal from '../../components/cycle/CycleSetupModal';
import DailyLogModal from '../../components/cycle/DailyLogModal';
import PhaseDetailModal from '../../components/cycle/PhaseDetailModal';
import VisualOnboarding from '../../components/home/VisualOnboarding';
import { 
  Sparkles, MessageCircle, PlayCircle, Home, Palette, Image as ImageIcon, 
  Target, Compass, Calendar, Smile, Utensils, Droplet, Heart
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { currentCycleDay, currentPhase, cycleLength } = useCycle();
  const { t } = useLanguage();

  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  return (
    <div className="home-wrapper" style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 20px 80px 20px' }}>
      <style>{`
        .home-main-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 24px;
          align-items: start;
        }

        /* LEFT SIDEBAR FEATURE CARD */
        .left-sidebar-card {
          background: linear-gradient(180deg, #FFF9FA 0%, #FFF0F4 100%);
          border: 1px solid #FAD4DE;
          border-radius: 28px;
          padding: 24px 20px;
          box-shadow: 0 8px 30px rgba(236, 115, 143, 0.06);
          position: sticky;
          top: 90px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 520px;
        }

        .option-pill-badge {
          display: inline-block;
          background-color: #EC738F;
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 20px;
          width: fit-content;
          margin-bottom: 12px;
          letter-spacing: 0.03em;
        }

        .sidebar-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          color: #38232A;
          margin-bottom: 24px;
        }

        .sidebar-feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sidebar-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.875rem;
          color: #634751;
          font-weight: 500;
          line-height: 1.3;
        }

        .sidebar-feature-icon {
          color: #EC738F;
          flex-shrink: 0;
        }

        .sidebar-flower-art {
          display: flex;
          justify-content: center;
          margin-top: auto;
          opacity: 0.85;
        }

        /* MAIN RIGHT CONTENT AREA */
        .right-content-area {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* HERO CARD BANNER */
        .hero-banner-card {
          background: linear-gradient(135deg, #FFFFFF 0%, #FFF2F5 45%, #FFE5EC 100%);
          border: 1px solid #FAD4DE;
          border-radius: 32px;
          padding: 36px 40px;
          box-shadow: 0 16px 45px rgba(236, 115, 143, 0.09);
          display: grid;
          grid-template-columns: 1.1fr 0.9fr 260px;
          gap: 24px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .sakhi-companion-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #FFE5EC;
          color: #EC738F;
          border: 1px solid rgba(236, 115, 143, 0.25);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 16px;
        }

        .hero-main-title {
          font-family: var(--font-display);
          font-size: 2.6rem;
          line-height: 1.15;
          color: #38232A;
          font-weight: 600;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }

        .hero-sub-text {
          font-size: 0.975rem;
          color: #7D626C;
          line-height: 1.55;
          margin-bottom: 28px;
          max-width: 440px;
        }

        .hero-buttons-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-setup-cycle {
          background-color: #EC738F !important;
          color: #FFFFFF !important;
          border-radius: 24px !important;
          padding: 12px 24px !important;
          font-size: 0.925rem !important;
          font-weight: 600 !important;
          box-shadow: 0 6px 20px rgba(236, 115, 143, 0.3) !important;
          border: none !important;
          transition: all 0.2s ease !important;
        }

        .btn-setup-cycle:hover {
          background-color: #D95B78 !important;
          transform: translateY(-2px);
        }

        .btn-talk-sakhi {
          background-color: #FFFFFF !important;
          color: #EC738F !important;
          border: 1.5px solid #FAD4DE !important;
          border-radius: 24px !important;
          padding: 12px 22px !important;
          font-size: 0.925rem !important;
          font-weight: 600 !important;
          transition: all 0.2s ease !important;
        }

        .btn-talk-sakhi:hover {
          background-color: #FFF2F5 !important;
          border-color: #EC738F !important;
        }

        .btn-visual-guide {
          background: none;
          border: none;
          color: #EC738F;
          font-size: 0.925rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          transition: transform 0.2s ease;
        }

        .btn-visual-guide:hover {
          transform: scale(1.04);
        }

        .hero-woman-illustration {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-woman-img {
          width: 100%;
          max-width: 240px;
          height: auto;
          border-radius: 20px;
          object-fit: cover;
          box-shadow: 0 10px 30px rgba(236, 115, 143, 0.12);
        }

        .hero-affirmation-card {
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid #FAD4DE;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 8px 25px rgba(236, 115, 143, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 160px;
          position: relative;
        }

        .affirmation-tag {
          font-size: 0.725rem;
          font-weight: 600;
          color: #A0828C;
          letter-spacing: 0.02em;
          margin-bottom: 8px;
          display: block;
        }

        .affirmation-quote-text {
          font-family: var(--font-display);
          font-size: 1.15rem;
          line-height: 1.4;
          color: #38232A;
          font-weight: 600;
          font-style: italic;
        }

        /* MIDDLE TWO CARDS GRID */
        .middle-cards-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 24px;
        }

        .period-phase-main-card {
          background-color: #FFFFFF;
          border: 1px solid #FAD4DE;
          border-radius: 28px;
          padding: 28px 32px;
          box-shadow: 0 10px 35px rgba(236, 115, 143, 0.06);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .phase-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #FFF0F4;
          color: #E85C7D;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 16px;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
          width: fit-content;
        }

        .phase-heading-title {
          font-family: var(--font-display);
          font-size: 1.9rem;
          color: #38232A;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .phase-progress-track {
          width: 100%;
          max-width: 420px;
          height: 6px;
          background-color: #FFE5EC;
          border-radius: 10px;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .phase-progress-fill {
          height: 100%;
          background-color: #EC738F;
          border-radius: 10px;
        }

        .next-period-subtext {
          font-size: 0.85rem;
          color: #7D626C;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .btn-view-details {
          background-color: #EC738F !important;
          color: #FFFFFF !important;
          border-radius: 24px !important;
          padding: 10px 22px !important;
          font-size: 0.875rem !important;
          font-weight: 600 !important;
          box-shadow: 0 4px 14px rgba(236, 115, 143, 0.25) !important;
          border: none !important;
          width: fit-content;
        }

        .motivational-quote-card {
          background: linear-gradient(135deg, #FFF5F7 0%, #FFEBEF 100%);
          border: 1px solid #FAD4DE;
          border-radius: 28px;
          padding: 32px 28px;
          box-shadow: 0 10px 35px rgba(236, 115, 143, 0.06);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cursive-quote-large {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.8rem;
          color: #D95B78;
          font-style: italic;
          margin-bottom: 14px;
          line-height: 1.3;
        }

        .cursive-quote-small {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.1rem;
          color: #8E6E79;
          font-style: italic;
          line-height: 1.4;
        }

        /* QUICK ACTIONS SECTION */
        .quick-actions-container {
          background-color: #FFFFFF;
          border: 1px solid #FAD4DE;
          border-radius: 28px;
          padding: 32px;
          box-shadow: 0 10px 35px rgba(236, 115, 143, 0.05);
        }

        .quick-actions-header-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          color: #38232A;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .quick-actions-header-sub {
          font-size: 0.875rem;
          color: #7D626C;
          margin-bottom: 24px;
        }

        .quick-actions-cards-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .quick-action-card-item {
          background-color: #FFF9FA;
          border: 1px solid #FAD4DE;
          border-radius: 20px;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.2s ease;
          cursor: pointer;
          text-decoration: none;
          min-height: 165px;
        }

        .quick-action-card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(236, 115, 143, 0.15);
          border-color: #EC738F;
          background-color: #FFFFFF;
        }

        .action-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .action-icon-wrapper.pink { background-color: #FFE5EC; color: #EC738F; }
        .action-icon-wrapper.yellow { background-color: #FEF3C7; color: #D97706; }
        .action-icon-wrapper.purple { background-color: #F3E8FF; color: #9333EA; }
        .action-icon-wrapper.green { background-color: #DCFCE7; color: #16A34A; }
        .action-icon-wrapper.blue { background-color: #E0F2FE; color: #0284C7; }

        .action-card-title {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          color: #38232A;
          margin-bottom: 4px;
        }

        .action-card-desc {
          font-size: 0.775rem;
          color: #7D626C;
          line-height: 1.35;
          margin-bottom: 16px;
        }

        .action-card-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #EC738F;
          margin-top: auto;
        }

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 1200px) {
          .hero-banner-card {
            grid-template-columns: 1fr 1fr;
          }
          .hero-affirmation-card {
            grid-column: span 2;
          }
          .quick-actions-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 960px) {
          .home-main-grid {
            grid-template-columns: 1fr !important;
          }
          .left-sidebar-card {
            position: relative;
            top: 0;
            min-height: auto;
          }
          .hero-banner-card {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
          .hero-affirmation-card {
            grid-column: span 1;
          }
          .middle-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .quick-actions-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .quick-actions-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* MAIN TWO COLUMN LAYOUT */}
      <div className="home-main-grid">
        
        {/* LEFT SIDEBAR FEATURE CARD */}
        <aside className="left-sidebar-card">
          <div>
            <span className="option-pill-badge">{t('hero.option1')}</span>
            <h2 className="sidebar-title">{t('hero.calmMinimal')}</h2>

            <ul className="sidebar-feature-list">
              <li className="sidebar-feature-item">
                <Home size={18} className="sidebar-feature-icon" />
                <span>{t('hero.cleanLayout')}</span>
              </li>
              <li className="sidebar-feature-item">
                <Palette size={18} className="sidebar-feature-icon" />
                <span>{t('hero.softPastels')}</span>
              </li>
              <li className="sidebar-feature-item">
                <ImageIcon size={18} className="sidebar-feature-icon" />
                <span>{t('hero.simpleIllus')}</span>
              </li>
              <li className="sidebar-feature-item">
                <Target size={18} className="sidebar-feature-icon" />
                <span>{t('hero.focusClarity')}</span>
              </li>
              <li className="sidebar-feature-item">
                <Compass size={18} className="sidebar-feature-icon" />
                <span>{t('hero.easyNav')}</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-flower-art">
            <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
              <path d="M45 110 Q42 70 30 30" stroke="#8E6E79" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M45 110 Q50 65 65 40" stroke="#8E6E79" strokeWidth="2" strokeLinecap="round" />
              <circle cx="30" cy="30" r="14" fill="#FAD4DE" opacity="0.8" />
              <circle cx="30" cy="30" r="7" fill="#EC738F" />
              <circle cx="65" cy="40" r="11" fill="#FAD4DE" opacity="0.8" />
              <circle cx="65" cy="40" r="5" fill="#EC738F" />
              <path d="M40 75 Q25 70 20 80 Q35 85 40 75 Z" fill="#A3B899" />
              <path d="M50 60 Q65 55 70 65 Q55 70 50 60 Z" fill="#A3B899" />
            </svg>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="right-content-area">

          {/* 1. HERO BANNER CARD */}
          <section className="hero-banner-card">
            <div>
              <div className="sakhi-companion-pill">
                <Sparkles size={14} color="#EC738F" />
                <span>{t('home.companionTag')}</span>
              </div>

              <h1 className="hero-main-title">
                {t('hero.title')}
              </h1>

              <p className="hero-sub-text">
                {t('hero.sub')}
              </p>

              <div className="hero-buttons-group">
                <Button 
                  variant="primary" 
                  className="btn-setup-cycle"
                  onClick={() => setIsSetupOpen(true)}
                >
                  {t('hero.setup')}
                </Button>

                <Button 
                  variant="outline" 
                  className="btn-talk-sakhi"
                  onClick={() => navigate('/chat')}
                  icon={<MessageCircle size={16} color="#EC738F" />}
                >
                  {t('hero.chat')}
                </Button>

                <button
                  type="button"
                  className="btn-visual-guide"
                  onClick={() => setIsOnboardingOpen(true)}
                >
                  <PlayCircle size={17} />
                  <span>{t('hero.visualGuide')}</span>
                </button>
              </div>
            </div>

            <div className="hero-woman-illustration">
              <img 
                src="/images/cycle/cycle-phase-woman.jpg" 
                alt="Woman holding heart" 
                className="hero-woman-img" 
              />
            </div>

            <div className="hero-affirmation-card">
              <span className="affirmation-tag">{t('home.affirmationTag')}</span>
              <p className="affirmation-quote-text">
                {t('home.affirmationText')}
              </p>
              <div style={{ position: 'absolute', bottom: '12px', right: '14px', opacity: 0.35 }}>
                <Heart size={20} fill="#EC738F" color="#EC738F" />
              </div>
            </div>
          </section>

          {/* 2. MIDDLE TWO CARDS ROW */}
          <section className="middle-cards-grid">
            
            {/* LEFT CARD: PERIOD PHASE */}
            <div className="period-phase-main-card">
              <div>
                <div className="phase-badge-pill">
                  <span style={{ fontSize: '0.85rem' }}>🩸</span>
                  <span>{t('home.dayOfTotal', { day: currentCycleDay, total: cycleLength })}</span>
                </div>

                <h2 className="phase-heading-title">{t('home.phaseTitle', { phase: currentPhase })}</h2>

                <div className="phase-progress-track">
                  <div 
                    className="phase-progress-fill" 
                    style={{ width: `${Math.min(100, Math.round((currentCycleDay / cycleLength) * 100))}%` }} 
                  />
                </div>

                <p className="next-period-subtext">
                  {t('home.nextPeriodCountdown', { days: Math.max(1, cycleLength - currentCycleDay) })}
                </p>

                <Button 
                  variant="primary" 
                  className="btn-view-details"
                  onClick={() => setIsDetailModalOpen(true)}
                >
                  {t('common.viewDetails')} &rarr;
                </Button>
              </div>

              {/* Flower accent decoration */}
              <div style={{ position: 'absolute', bottom: '16px', right: '20px', pointerEvents: 'none' }}>
                <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
                  <path d="M35 85 Q30 50 45 20" stroke="#8E6E79" strokeWidth="2" />
                  <circle cx="45" cy="20" r="10" fill="#FAD4DE" />
                  <circle cx="45" cy="20" r="5" fill="#EC738F" />
                  <path d="M35 60 Q20 55 18 65 Q30 68 35 60 Z" fill="#A3B899" />
                </svg>
              </div>
            </div>

            {/* RIGHT CARD: MOTIVATIONAL QUOTE */}
            <div className="motivational-quote-card">
              <p className="cursive-quote-large">{t('home.quoteLarge')}</p>
              <p className="cursive-quote-small">{t('home.quoteSmall')}</p>
              
              <div style={{ position: 'absolute', bottom: '12px', right: '16px', opacity: 0.8 }}>
                <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
                  <path d="M25 55 Q20 30 35 15" stroke="#8E6E79" strokeWidth="1.5" />
                  <circle cx="35" cy="15" r="7" fill="#FAD4DE" />
                  <circle cx="35" cy="15" r="3.5" fill="#EC738F" />
                </svg>
              </div>
            </div>

          </section>

          {/* 3. QUICK ACTIONS SECTION */}
          <section className="quick-actions-container">
            <h2 className="quick-actions-header-title">{t('home.quickActionsTitle')}</h2>
            <p className="quick-actions-header-sub">{t('home.quickActionsSub')}</p>

            <div className="quick-actions-cards-grid">
              
              {/* 1. MY CYCLE */}
              <Link to="/cycle" className="quick-action-card-item">
                <div className="action-icon-wrapper pink">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="action-card-title">{t('home.myCycleTitle')}</h3>
                  <p className="action-card-desc">{t('home.myCycleDesc')}</p>
                </div>
                <span className="action-card-link">{t('home.openBtn')}</span>
              </Link>

              {/* 2. HOW I FEEL */}
              <div className="quick-action-card-item" onClick={() => setIsLogOpen(true)}>
                <div className="action-icon-wrapper yellow">
                  <Smile size={20} />
                </div>
                <div>
                  <h3 className="action-card-title">{t('home.howIFeelTitle')}</h3>
                  <p className="action-card-desc">{t('home.howIFeelDesc')}</p>
                </div>
                <span className="action-card-link">{t('home.openBtn')}</span>
              </div>

              {/* 3. TALK TO SAKHI */}
              <Link to="/chat" className="quick-action-card-item">
                <div className="action-icon-wrapper purple">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="action-card-title">{t('home.talkToSakhiTitle')}</h3>
                  <p className="action-card-desc">{t('home.talkToSakhiDesc')}</p>
                </div>
                <span className="action-card-link">{t('home.openBtn')}</span>
              </Link>

              {/* 4. EAT WELL */}
              <Link to="/lifestyle" className="quick-action-card-item">
                <div className="action-icon-wrapper green">
                  <Utensils size={20} />
                </div>
                <div>
                  <h3 className="action-card-title">{t('home.eatWellTitle')}</h3>
                  <p className="action-card-desc">{t('home.eatWellDesc')}</p>
                </div>
                <span className="action-card-link">{t('home.openBtn')}</span>
              </Link>

              {/* 5. DRINK WATER */}
              <Link to="/lifestyle" className="quick-action-card-item">
                <div className="action-icon-wrapper blue">
                  <Droplet size={20} />
                </div>
                <div>
                  <h3 className="action-card-title">{t('home.drinkWaterTitle')}</h3>
                  <p className="action-card-desc">{t('home.drinkWaterDesc')}</p>
                </div>
                <span className="action-card-link">{t('home.openBtn')}</span>
              </Link>

            </div>
          </section>

        </main>
      </div>

      {/* MODALS */}
      <CycleSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
      <DailyLogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
      <VisualOnboarding isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
      <PhaseDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} phase={currentPhase} />
    </div>
  );
}
