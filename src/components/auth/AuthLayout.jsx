import React from 'react';
import SakhiLogo from '../Brand/SakhiLogo';
import CycleRing from '../CycleRing/CycleRing';
import { Shield, Lock, HeartHandshake } from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div className="sakhi-auth-wrapper">
      <style>{`
        .sakhi-auth-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          background-color: var(--background);
          font-family: var(--font-ui);
        }

        .auth-split-container {
          display: flex;
          width: 100%;
          min-height: 100vh;
        }

        .auth-brand-side {
          flex: 1.1;
          background-color: var(--surface-soft);
          border-right: 1px solid var(--border);
          padding: 56px 64px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .auth-brand-content {
          margin: auto 0;
          max-width: 460px;
          z-index: 2;
        }

        .auth-form-side {
          flex: 1;
          padding: 48px 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--surface);
          z-index: 2;
        }

        .auth-privacy-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.825rem;
          margin-bottom: 24px;
          backdrop-filter: blur(8px);
        }

        @media (max-width: 960px) {
          .auth-split-container {
            flex-direction: column;
          }
          .auth-brand-side {
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding: 40px 24px 32px 24px;
            align-items: center;
            text-align: center;
            flex: initial;
          }
          .auth-brand-content {
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .auth-form-side {
            padding: 36px 20px 60px 20px;
            flex: 1;
          }
        }
      `}</style>

      <div className="auth-split-container">
        {/* Brand Hero Panel */}
        <div className="auth-brand-side">
          <div style={{ position: 'relative', zIndex: 3 }}>
            <SakhiLogo size="large" />
          </div>

          <div className="auth-brand-content">
            <div className="auth-privacy-pill">
              <Lock size={14} color="var(--rose)" />
              <span>Your cycle. Your space. Your privacy.</span>
            </div>

            <h1 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '2.6rem', 
                color: 'var(--rose-dark)', 
                lineHeight: 1.2,
                marginBottom: '16px',
                fontWeight: '600' 
              }}
            >
              A calm, private space for your health.
            </h1>
            
            <p 
              style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '1.05rem', 
                lineHeight: '1.6', 
                marginBottom: '36px' 
              }}
            >
              Track your period, log symptoms, and understand your body with total peace of mind.
            </p>

            {/* Central Animated Cycle Ring Visual */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 24px 0' }}>
              <CycleRing isLoginVisual={true} size={210} />
            </div>

            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                color: 'var(--text-muted)', 
                fontSize: '0.825rem',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}
            >
              <HeartHandshake size={16} color="var(--rose)" />
              <span>Privacy-first architecture. Health data remains in your control.</span>
            </div>
          </div>

          <footer style={{ fontSize: '0.8rem', color: 'var(--text-muted)', position: 'relative', zIndex: 3 }}>
            © {new Date().getFullYear()} Sakhi Cycle — Built with Privacy
          </footer>
        </div>

        {/* Auth Form Host Panel */}
        <div className="auth-form-side">
          {children}
        </div>
      </div>
    </div>
  );
}
