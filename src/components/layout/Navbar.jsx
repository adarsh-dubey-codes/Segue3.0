import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SakhiLogo from '../Brand/SakhiLogo';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Home, Calendar, MessageCircle, Utensils, ShoppingBag, 
  Stethoscope, Users, User, Sun, LogOut 
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/cycle', label: t('nav.cycle'), icon: Calendar },
    { to: '/chat', label: t('nav.chat'), icon: MessageCircle },
    { to: '/lifestyle', label: t('nav.lifestyle'), icon: Utensils },
    { to: '/products', label: t('nav.products'), icon: ShoppingBag },
    { to: '/doctors', label: t('nav.doctors'), icon: Stethoscope },
    { to: '/forum', label: t('nav.forum'), icon: Users },
    { to: '/buddy', label: t('nav.buddy'), icon: User },
    { to: '/vibes', label: t('nav.vibes'), icon: Sun }
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
          padding: 10px 0;
        }
        .navbar-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .navbar-logo-wrap {
          flex-shrink: 0;
        }
        .navbar-nav-wrap {
          flex: 1;
          display: flex;
          justify-content: center;
          min-width: 0;
          margin: 0 8px;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: clamp(2px, 0.4vw, 6px);
          list-style: none;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 4px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(250, 212, 222, 0.7);
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 12px rgba(236, 115, 143, 0.06);
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 100%;
        }
        .navbar-links::-webkit-scrollbar {
          display: none;
        }
        .nav-item-link {
          text-decoration: none;
          color: #5C434B;
          font-size: clamp(0.725rem, 0.82vw, 0.85rem);
          font-weight: 500;
          padding: 7px clamp(8px, 0.85vw, 14px);
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nav-item-link:hover {
          color: #C23B68;
          background-color: rgba(255, 229, 236, 0.6);
        }
        .nav-item-link.active {
          color: #FFFFFF !important;
          background-color: #B9345D !important;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(185, 52, 93, 0.35);
        }
        .nav-item-link.active svg {
          stroke: #FFFFFF !important;
          fill: none !important;
        }
        .navbar-right-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        @media (max-width: 960px) {
          .navbar-nav-wrap {
            display: none;
          }
        }
      `}</style>

      <div className="navbar-container">
        <div className="navbar-logo-wrap">
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <SakhiLogo size="medium" />
          </NavLink>
        </div>

        <nav className="navbar-nav-wrap">
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
                    <Icon size={15} color={link.to === '/' ? '#C23B68' : '#7D626C'} />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="navbar-right-actions">
          <LanguageSelector />

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {user.isGuest ? (
                <span 
                  style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    padding: '4px 12px', 
                    borderRadius: 'var(--radius-full)', 
                    backgroundColor: '#FFEBF0', 
                    color: '#C23B68',
                    border: '1px solid #FAD4DE',
                    letterSpacing: '0.02em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title={t('nav.guestModeTooltip')}
                >
                  <User size={13} color="#C23B68" />
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
                backgroundColor: '#B9345D',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '8px 20px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(185, 52, 93, 0.3)'
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
