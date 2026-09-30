import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SakhiLogo from '../Brand/SakhiLogo';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Heart, Activity, MessageCircle, Sparkles, Play, 
  Stethoscope, Users, User, Music, LogOut 
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: Heart },
    { to: '/cycle', label: t('nav.cycle'), icon: Activity },
    { to: '/chat', label: t('nav.chat'), icon: MessageCircle },
    { to: '/lifestyle', label: t('nav.lifestyle'), icon: Sparkles },
    { to: '/products', label: t('nav.products'), icon: Play },
    { to: '/doctors', label: t('nav.doctors'), icon: Stethoscope },
    { to: '/forum', label: t('nav.forum'), icon: Users },
    { to: '/buddy', label: t('nav.buddy'), icon: User },
    { to: '/vibes', label: t('nav.vibes'), icon: Music }
  ];

  return (
    <header className="sakhi-navbar">
      <style>{`
        .sakhi-navbar {
          background-color: var(--background);
          border-bottom: 1px solid rgba(250, 212, 222, 0.4);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 12px 0;
        }
        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          background-color: rgba(255, 255, 255, 0.7);
          padding: 4px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(250, 212, 222, 0.5);
          backdrop-filter: blur(8px);
        }
        .nav-item-link {
          text-decoration: none;
          color: #5C434B;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .nav-item-link:hover {
          color: #E85C7D;
          background-color: rgba(255, 229, 236, 0.6);
        }
        .nav-item-link.active {
          color: #FFFFFF !important;
          background-color: #EC738F !important;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(236, 115, 143, 0.35);
        }
        .nav-item-link.active svg {
          stroke: #FFFFFF !important;
          fill: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1180px) {
          .navbar-links {
            display: none;
          }
        }
      `}</style>

      <div className="navbar-container">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <SakhiLogo size="medium" />
        </NavLink>

        <nav>
          <ul className="navbar-links">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink 
                    to={link.to} 
                    className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                    end={link.to === '/'}
                  >
                    <Icon size={15} color={link.to === '/' ? '#EC738F' : '#7D626C'} />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LanguageSelector />

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {user.isGuest ? (
                <span 
                  style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    padding: '4px 10px', 
                    borderRadius: 'var(--radius-full)', 
                    backgroundColor: 'var(--pink-primary)', 
                    color: 'var(--pink-vivid)',
                    border: '1px solid var(--border)',
                    letterSpacing: '0.02em'
                  }}
                  title="Guest mode data is saved locally on this browser."
                >
                  {t('nav.guestMode')}
                </span>
              ) : (
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {user.name}
                </span>
              )}

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                style={{
                  background: 'none',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '7px 14px',
                  fontSize: '0.825rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <LogOut size={14} />
                {t('nav.signOut')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: '#EC738F',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '8px 20px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(236, 115, 143, 0.3)'
              }}
            >
              {t('nav.signIn')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
