import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SakhiLogo from '../../components/Brand/SakhiLogo';
import CycleRing from '../../components/CycleRing/CycleRing';
import LoginForm from '../../components/AuthForm/LoginForm';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = (userObj) => {
    login(userObj.email, 'password123');
    navigate('/cycle');
  };

  return (
    <div className="login-page" style={{ minHeight: '100vh', display: 'flex', width: '100%' }}>
      <style>{`
        .login-page {
          background-color: var(--background);
        }
        .login-split {
          display: flex;
          width: 100%;
          min-height: 100vh;
        }
        .login-left {
          flex: 1.1;
          background-color: var(--surface-soft);
          border-right: 1px solid var(--border);
          padding: 48px 64px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .login-right {
          flex: 1;
          padding: 48px 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--background);
        }
        .login-hero-content {
          margin: auto 0;
          max-width: 440px;
        }

        @media (max-width: 900px) {
          .login-split {
            flex-direction: column;
          }
          .login-left {
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding: 40px 24px;
            align-items: center;
            text-align: center;
            flex: initial;
          }
          .login-right {
            padding: 40px 24px 60px 24px;
            flex: initial;
          }
        }
      `}</style>

      <div className="login-split">
        <div className="login-left">
          <SakhiLogo size="large" />

          <div className="login-hero-content">
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)', marginBottom: '16px' }}>
              A private space to understand your cycle.
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px' }}>
              Track your period quietly and effortlessly with total privacy and calm clarity.
            </p>

            <CycleRing isLoginVisual={true} size={210} />
          </div>

          <footer style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} Sakhi Cycle — Privacy First
          </footer>
        </div>

        <div className="login-right">
          <LoginForm onLoginSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
