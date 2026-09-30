import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import SakhiLogo from '../Brand/SakhiLogo';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Home, Calendar, MessageCircle, Utensils, ShoppingBag, 
  Stethoscope, Users, User, LogOut, ChevronDown, ChevronUp,
  Sparkles, Gamepad2, Video, Scale, CreditCard, Award, ArrowRight, MessageSquare
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExploreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsExploreOpen(false);
  }, [location.pathname]);

  // Main top nav links (Find Doctor, Forum, Products, Buddy, Vibes removed from top bar)
  const navLinks = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/cycle', label: t('nav.cycle'), icon: Calendar },
    { to: '/lifestyle', label: t('nav.lifestyle'), icon: Utensils },
    { to: '/products', label: t('nav.products'), icon: ShoppingBag },
    { to: '/doctors', label: t('nav.doctors'), icon: Stethoscope },
    { to: '/forum', label: t('nav.forum'), icon: Users },
    { to: '/buddy', label: t('nav.buddy'), icon: User },
    { to: '/vibes', label: t('nav.vibes'), icon: Sun }
  ];

  // Features inside the Explore Dropdown
  const exploreSanctuaries = [
    {
      id: 'play',
      title: 'Sakhi Play',
      subtitle: 'Fun quizzes & games',
      icon: Gamepad2,
      iconBg: '#FFE5EC',
      iconColor: '#C23B68',
      path: '/lifestyle'
    },
    {
      id: 'videos',
      title: 'Sakhi Videos',
      subtitle: 'Doctor video guidance',
      icon: Video,
      iconBg: '#F0F4FF',
      iconColor: '#3B82F6',
      path: '/lifestyle'
    },
    {
      id: 'marketplace',
      title: 'Marketplace (Products)',
      subtitle: 'Ethical period care',
      icon: ShoppingBag,
      iconBg: '#F3E8FF',
      iconColor: '#9333EA',
      path: '/products'
    },
    {
      id: 'compare',
      title: 'Product Compare',
      subtitle: 'Pads vs cups vs disks',
      icon: Scale,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      path: '/products'
    },
    {
      id: 'gynac',
      title: 'Find Gynac',
      subtitle: 'Verified specialists',
      icon: Stethoscope,
      iconBg: '#E0F2FE',
      iconColor: '#0284C7',
      path: '/doctors'
    },
    {
      id: 'forum',
      title: 'Safe Forum',
      subtitle: 'Anonymous community & support',
      icon: MessageSquare,
      iconBg: '#E8F5E9',
      iconColor: '#2E7D32',
      path: '/forum'
    },
    {
      id: 'payables',
      title: 'Payables',
      subtitle: 'Period care subscription & payments',
      icon: CreditCard,
      iconBg: '#FFEBF0',
      iconColor: '#B9345D',
      path: '/payables'
    },
    {
      id: 'rewards',
      title: 'Sakhi Rewards',
      subtitle: 'Tokens, streaks & badges',
      icon: Award,
      iconBg: '#FEF9C3',
      iconColor: '#CA8A04',
      path: '/lifestyle'
    }
  ];

  const isExploreActive = ['/products', '/doctors', '/forum', '/payables'].includes(location.pathname);

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
          gap: clamp(4px, 0.6vw, 8px);
          list-style: none;
          background-color: rgba(255, 255, 255, 0.95);
          padding: 4px clamp(6px, 0.8vw, 12px);
          border-radius: var(--radius-full);
          border: 1px solid rgba(250, 212, 222, 0.7);
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 12px rgba(236, 115, 143, 0.06);
        }
        .nav-item-link {
          text-decoration: none;
          color: #5C434B;
          font-size: clamp(0.8rem, 0.85vw, 0.9rem);
          font-weight: 500;
          padding: 7px clamp(10px, 1vw, 16px);
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

        /* Explore Button Pill */
        .explore-trigger-btn {
          background: #FFFFFF;
          border: 1.5px solid #FAD4DE;
          color: #B9345D;
          font-size: clamp(0.8rem, 0.85vw, 0.9rem);
          font-weight: 600;
          padding: 7px 16px;
          border-radius: var(--radius-full);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(185, 52, 93, 0.08);
        }
        .explore-trigger-btn:hover, .explore-trigger-btn.open {
          border-color: #B9345D;
          background-color: #FFF0F4;
          box-shadow: 0 4px 14px rgba(185, 52, 93, 0.18);
        }

        /* Explore Dropdown Menu Card */
        .explore-dropdown-card {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          width: 360px;
          background-color: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(250, 212, 222, 0.8);
          box-shadow: 0 20px 50px rgba(62, 36, 43, 0.15);
          padding: 20px;
          z-index: 200;
          animation: slideDownFade 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDownFade {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .explore-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 14px;
          text-decoration: none;
          transition: background-color 0.15s ease;
          cursor: pointer;
        }
        .explore-item-row:hover {
          background-color: #FFF0F4;
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

        {/* Main Navbar Links */}
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

            {/* Explore Dropdown Menu Pill */}
            <li style={{ position: 'relative' }} ref={dropdownRef}>
              <button 
                type="button"
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className={`explore-trigger-btn ${isExploreOpen || isExploreActive ? 'open' : ''}`}
                aria-expanded={isExploreOpen}
              >
                <Sparkles size={16} color="#B9345D" />
                <span>Explore</span>
                {isExploreOpen ? <ChevronUp size={15} color="#B9345D" /> : <ChevronDown size={15} color="#B9345D" />}
              </button>

              {/* Explore Dropdown Card */}
              {isExploreOpen && (
                <div className="explore-dropdown-card">
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #FAD4DE' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: '#B9345D', letterSpacing: '0.04em' }}>
                      <Sparkles size={15} color="#B9345D" />
                      <span>EXPLORE SANCTUARIES</span>
                    </div>
                    <span style={{ fontSize: '0.9rem' }}>🌸</span>
                  </div>

                  {/* List of Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '340px', overflowY: 'auto' }}>
                    {exploreSanctuaries.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.id}
                          to={item.path}
                          className="explore-item-row"
                          onClick={() => setIsExploreOpen(false)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div 
                              style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '10px', 
                                backgroundColor: item.iconBg, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flexShrink: 0
                              }}
                            >
                              <Icon size={18} color={item.iconColor} />
                            </div>
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#3E242B' }}>
                                {item.title}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#7D626C' }}>
                                {item.subtitle}
                              </div>
                            </div>
                          </div>
                          <span style={{ color: '#B9345D', fontWeight: '700', fontSize: '1.1rem' }}>›</span>
                        </NavLink>
                      );
                    })}
                  </div>

                  {/* Footer Link */}
                  <div style={{ borderTop: '1px solid #FAD4DE', marginTop: '12px', paddingTop: '12px', textAlign: 'center' }}>
                    <NavLink
                      to="/lifestyle"
                      onClick={() => setIsExploreOpen(false)}
                      style={{ 
                        color: '#B9345D', 
                        fontWeight: '700', 
                        fontSize: '0.85rem', 
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>View All Features Hub</span>
                      <ArrowRight size={14} />
                    </NavLink>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
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
