import React from 'react';
import SakhiLogo from '../../components/Brand/SakhiLogo';
import CycleRing from '../../components/CycleRing/CycleRing';
import LoginForm from '../../components/AuthForm/LoginForm';

export default function LoginPage({ onLoginSuccess }) {
  return (
    <div className="login-page" style={{ minHeight: '100vh', display: 'flex', width: '100%' }}>
      <style>{`
        .login-page {
          background-color: var(--bg-primary);
        }
        .login-split {
          display: flex;
          width: 100%;
          min-height: 100vh;
        }
        .login-left {
          flex: 1.1;
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          padding: 48px 64px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .login-right {
          flex: 1;
          padding: 48px 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-primary);
        }
        .login-hero-content {
          margin: auto 0;
          max-width: 440px;
        }
        
        /* Mobile / Tablet Responsive Adjustments */
        @media (max-width: 900px) {
          .login-split {
            flex-direction: column;
          }
          .login-left {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            padding: 40px 24px;
            align-items: center;
            text-align: center;
            flex: initial;
          }
          .login-right {
            padding: 40px 24px 60px 24px;
            flex: initial;
          }
          .login-hero-content {
            margin: 24px 0 32px 0;
          }
        }
      `}</style>

      <div className="login-split">
        {/* LEFT SIDE - Brand & Editorial Cycle Visual */}
        <div className="login-left">
          <div className="login-brand-header">
            <SakhiLogo size="large" />
          </div>

          <div className="login-hero-content">
            <h1 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                lineHeight: '1.2',
                color: 'var(--deep-plum)',
                marginBottom: '16px',
                fontWeight: '500'
              }}
            >
              A private space to understand your cycle.
            </h1>
            <p 
              style={{
                color: 'var(--text-muted)',
                fontSize: '1.05rem',
                lineHeight: '1.6',
                marginBottom: '40px',
                fontWeight: '400'
              }}
            >
              Track your period quietly and effortlessly with total privacy and calm clarity.
            </p>

            {/* Refined Circular Cycle Arc Visual */}
            <div style={{ margin: '20px 0' }}>
              <CycleRing isLoginVisual={true} size={210} />
            </div>
          </div>

          <footer style={{ fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.8 }}>
            © {new Date().getFullYear()} Sakhi Cycle — Privacy First
          </footer>
        </div>

        {/* RIGHT SIDE - Login Form Area */}
        <div className="login-right">
          <LoginForm onLoginSuccess={onLoginSuccess} />
        </div>
      </div>
    </div>
  );
}
