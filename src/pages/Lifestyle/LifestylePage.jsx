import React from 'react';
import { useTranslation } from 'react-i18next';
import PhaseGuide from '../../components/lifestyle/PhaseGuide';
import { GirlStretchingIllustration } from '../../components/illustrations/EatAndMoveIllustrations';

export default function LifestylePage() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        backgroundColor: '#FDF3F5',
        backgroundImage: 'radial-gradient(ellipse at 10% 0%, #FFEBF0 0%, #FDF3F5 60%, #FAF0F4 100%)',
        minHeight: 'calc(100vh - 80px)',
        padding: '32px 24px 80px 24px'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Top Page Header with Girl Stretching Illustration */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            position: 'relative'
          }}
          className="eat-move-header"
        >
          <style>{`
            @media (max-width: 768px) {
              .eat-move-header {
                flex-direction: column !important;
                align-items: flex-start !important;
              }
              .eat-move-illustration {
                align-self: center !important;
              }
            }
          `}</style>

          <div>
            {/* Cursive Subscript */}
            <p
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                fontSize: '1.45rem',
                fontWeight: '600',
                color: '#EC738F',
                margin: '0 0 4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {t("lifestyle.tagline", "Healthy Choices ✦ Happier You ♡")}
            </p>

            {/* Display Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.2rem',
                lineHeight: 1.1,
                fontWeight: '700',
                color: '#3E242B',
                margin: '0 0 12px 0'
              }}
            >
              {t("lifestyle.title", "Eat & Move for Your Phase")}
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
              {t("lifestyle.subtitle", "Personalized nutrition, gentle exercises, and self-care tips tailored to your current cycle phase.")}
            </p>
          </div>

          {/* Right Side Illustration & Cursive Text */}
          <div
            className="eat-move-illustration"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0
            }}
          >
            <GirlStretchingIllustration />

            <div
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#C23B68',
                lineHeight: 1.2,
                transform: 'rotate(6deg)'
              }}
            >
              {t("lifestyle.illustrationQuote", "Your cycle, Your power")}
            </div>
          </div>
        </div>

        {/* Phase Care Guide & 4 Pillars Grid */}
        <PhaseGuide />

      </div>
    </div>
  );
}
