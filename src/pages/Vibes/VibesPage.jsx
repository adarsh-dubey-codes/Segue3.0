import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { playlistsData, dailyAffirmations } from '../../data/affirmationsData';
import BreathingWidget from '../../components/vibes/BreathingWidget';
import { GirlMindfulCareIllustration } from '../../components/illustrations/VibesIllustrations';
import { Heart, RefreshCw, Music, ChevronRight, Sparkles } from 'lucide-react';

export default function VibesPage() {
  const { t } = useTranslation();
  const [affirmationIdx, setAffirmationIdx] = useState(0);
  const [selectedMood, setSelectedMood] = useState('Restful');

  const moods = ['Restful', 'Calm', 'Energetic', 'Happy'];

  const nextAffirmation = () => {
    setAffirmationIdx((prev) => (prev + 1) % dailyAffirmations.length);
  };

  const phaseCards = [
    {
      id: 'menstrual',
      title: 'Menstrual Phase',
      sub: 'Soothing sounds for your inner peace',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      mood: 'Restful'
    },
    {
      id: 'luteal',
      title: 'Luteal Phase',
      sub: 'Balance your mood & energy',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
      mood: 'Calm'
    },
    {
      id: 'follicular',
      title: 'Follicular Phase',
      sub: 'Feel light, fresh & motivated',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80',
      mood: 'Energetic'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#FDF3F5',
        backgroundImage: 'radial-gradient(ellipse at 10% 0%, #FFEBF0 0%, #FDF3F5 60%, #FAF0F4 100%)',
        minHeight: 'calc(100vh - 80px)',
        padding: '32px 24px 80px 24px'
      }}
    >
      <div style={{ maxWidth: '100%', padding: '0 clamp(12px, 2vw, 32px)', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* TOP HEADER SECTION */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            position: 'relative'
          }}
          className="vibes-header"
        >
          <style>{`
            @media (max-width: 840px) {
              .vibes-header {
                flex-direction: column !important;
                align-items: flex-start !important;
              }
              .vibes-header-art {
                align-self: center !important;
              }
            }
          `}</style>

          <div>
            {/* Top Accent Bar */}
            <div
              style={{
                width: '40px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: '#EC738F',
                marginBottom: '10px'
              }}
            />

            {/* Main Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.2rem',
                lineHeight: 1.1,
                fontWeight: '700',
                color: '#38232A',
                margin: '0 0 10px 0'
              }}
            >
              {t('vibesPage.title', 'Good Vibes & Mindful Care')}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: '#7D626C',
                fontSize: '1.05rem',
                maxWidth: '680px',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              {t('vibesPage.sub', 'Phase-oriented playlists, daily affirmations, and guided breathing.')}
            </p>
          </div>

          {/* Right Side Illustration & Cursive Text */}
          <div
            className="vibes-header-art"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0
            }}
          >
            <GirlMindfulCareIllustration />

            <div
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#C23B68',
                lineHeight: 1.2,
                transform: 'rotate(-4deg)'
              }}
            >
              {t('vibesPage.artCaption', 'Small Steps Big Changes ♡')}
            </div>
          </div>
        </div>

        {/* TOP ROW GRID: BREATHWORK & DAILY AFFIRMATION CARD */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            alignItems: 'stretch'
          }}
          className="vibes-top-cards-grid"
        >
          <style>{`
            @media (max-width: 900px) {
              .vibes-top-cards-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>

          {/* LEFT: GUIDED 4-4-4 BREATHWORK */}
          <BreathingWidget />

          {/* RIGHT: DAILY AFFIRMATION CARD */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #FAD4DE',
              boxShadow: '0 8px 24px rgba(236, 115, 143, 0.08)',
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              {/* Tag Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Heart size={18} color="#EC738F" fill="#EC738F" />
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    color: '#EC738F',
                    letterSpacing: '0.08em'
                  }}
                >
                  {t('vibesPage.dailyAffirmationCard', 'DAILY AFFIRMATION CARD')}
                </span>
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  color: '#3E242B',
                  lineHeight: '1.35',
                  fontWeight: '600',
                  margin: '12px 0 24px 0'
                }}
              >
                "{t(`vibesPage.affirmations.${affirmationIdx}`, dailyAffirmations[affirmationIdx])}"
              </p>
            </div>

            {/* Bottom Right New Affirmation Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <button
                type="button"
                onClick={nextAffirmation}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#3E242B',
                  border: '1px solid #FAD4DE',
                  borderRadius: '9999px',
                  padding: '10px 20px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#EC738F';
                  e.currentTarget.style.backgroundColor = '#FFF0F4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#FAD4DE';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                <RefreshCw size={14} color="#EC738F" />
                <span>{t('vibesPage.newAffirmation', 'New Affirmation')}</span>
              </button>
            </div>

            {/* Soft pink line heart background decoration */}
            <div style={{ position: 'absolute', bottom: '12px', left: '20px', pointerEvents: 'none', opacity: 0.35 }}>
              <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
                <path d="M10 25 C10 15, 20 10, 30 20 C40 10, 50 15, 50 25 C50 35, 30 45, 30 45 C30 45, 10 35, 10 25 Z" stroke="#EC738F" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: MOOD MATCH PLAYLISTS */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #FAD4DE',
            boxShadow: '0 8px 24px rgba(236, 115, 143, 0.08)',
            padding: '28px 32px'
          }}
        >
          {/* Header & Mood Pills Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFE5EC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Music size={20} color="#EC738F" />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    fontWeight: '700',
                    color: '#3E242B',
                    margin: 0
                  }}
                >
                  {t('vibesPage.moodMatchTitle', 'Mood Match Playlists')}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#7D626C', margin: '2px 0 0 0' }}>
                  {t('vibesPage.moodMatchSub', 'Select how you feel to get custom curated soundscapes.')}
                </p>
              </div>
            </div>

            {/* Mood Pills Selector */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {moods.map((m) => {
                const isSelected = selectedMood === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMood(m)}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '9999px',
                      border: isSelected ? 'none' : '1px solid #FAD4DE',
                      backgroundColor: isSelected ? '#801D46' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#38232A',
                      fontWeight: isSelected ? '700' : '500',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 14px rgba(128, 29, 70, 0.3)' : 'none'
                    }}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Playlists Row Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '18px'
            }}
            className="playlists-4-grid"
          >
            <style>{`
              @media (max-width: 1100px) {
                .playlists-4-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
              @media (max-width: 600px) {
                .playlists-4-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>

            {phaseCards.map((card) => (
              <a
                key={card.id}
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #FAD4DE',
                  borderRadius: '20px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#EC738F';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(236, 115, 143, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = '#FAD4DE';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: '#38232A',
                        margin: 0
                      }}
                    >
                      {card.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.725rem',
                        color: '#7D626C',
                        margin: '2px 0 0 0'
                      }}
                    >
                      {card.sub}
                    </p>
                  </div>
                </div>

                <ChevronRight size={16} color="#9E828C" />
              </a>
            ))}

            {/* 4th Card: Explore All Playlists */}
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#FFF0F4',
                border: '1px solid #FAD4DE',
                borderRadius: '20px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: '#D9486D',
                fontWeight: '700',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFE5EC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFF0F4';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Music size={18} color="#EC738F" />
                </div>
                <span>{t('vibesPage.exploreAllPlaylists', 'Explore All Playlists')}</span>
              </div>

              <ChevronRight size={18} color="#D9486D" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
