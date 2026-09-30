import React, { useState } from 'react';
import { playlistsData, dailyAffirmations } from '../../data/affirmationsData';
import BreathingWidget from '../../components/vibes/BreathingWidget';
import Button from '../../components/Button/Button';
import { useLanguage } from '../../context/LanguageContext';
import { Music, Heart, Sparkles, Smile, RefreshCw, Volume2 } from 'lucide-react';

export default function VibesPage() {
  const { t } = useLanguage();
  const [affirmationIdx, setAffirmationIdx] = useState(0);
  const [selectedMood, setSelectedMood] = useState('Restful');

  const moods = ['Restful', 'Calm', 'Energetic', 'Happy'];

  const nextAffirmation = () => {
    setAffirmationIdx((prev) => (prev + 1) % dailyAffirmations.length);
  };

  const filteredPlaylists = playlistsData.filter((p) => p.mood === selectedMood);

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)' }}>
          {t('vibesPage.title')}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          {t('vibesPage.sub')}
        </p>
      </div>

      {/* TOP ROW: BREATHING WIDGET + DAILY AFFIRMATION CARD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <style>{`
          @media (max-width: 820px) {
            .vibes-top-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        
        {/* BREATHWORK WIDGET */}
        <BreathingWidget />

        {/* AFFIRMATION CARD */}
        <div 
          style={{
            backgroundColor: 'var(--surface-soft)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 32px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Heart size={20} color="var(--rose)" fill="var(--rose)" />
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--rose)', letterSpacing: '0.08em' }}>
                {t('vibesPage.dailyAffirmation')}
              </span>
            </div>

            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--rose-dark)', lineHeight: '1.4', margin: '16px 0 24px 0' }}>
              "{dailyAffirmations[affirmationIdx]}"
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={nextAffirmation} icon={<RefreshCw size={14} />}>
              {t('vibesPage.newAffirmation')}
            </Button>
          </div>
        </div>
      </div>

      {/* MOOD MATCHER & PLAYLISTS */}
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--rose-dark)' }}>
              {t('vibesPage.moodMatch')}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              {t('vibesPage.moodSub')}
            </p>
          </div>

          {/* Mood Pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {moods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedMood(m)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid ${selectedMood === m ? 'var(--rose)' : 'var(--border)'}`,
                  backgroundColor: selectedMood === m ? 'var(--rose-dark)' : 'var(--surface-soft)',
                  color: selectedMood === m ? '#FFFFFF' : 'var(--text-primary)',
                  fontWeight: selectedMood === m ? '700' : '500',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Playlists Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {(filteredPlaylists.length > 0 ? filteredPlaylists : playlistsData).map((pl) => (
            <div
              key={pl.id}
              style={{
                backgroundColor: 'var(--surface-soft)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge-tag">{t('vibesPage.phaseTag', { phase: pl.phase })}</span>
                  <Volume2 size={16} color="var(--rose)" />
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--rose-dark)', marginBottom: '4px' }}>
                  {pl.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                  {pl.description}
                </p>
              </div>

              <iframe
                title={pl.title}
                src={pl.embedUrl}
                width="100%"
                height="80"
                frameBorder="0"
                allow="encrypted-media"
                style={{ borderRadius: '12px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
