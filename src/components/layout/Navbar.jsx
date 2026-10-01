import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import SakhiLogo from '../Brand/SakhiLogo';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRewards } from '../../context/RewardsContext';

import EmergencySOSModal from '../modals/EmergencySOSModal';
import UserProfileModal from '../modals/UserProfileModal';
import StreakRewardsModal from '../modals/StreakRewardsModal';
import NotificationsPopover from './NotificationsPopover';

import { 
  Home, Calendar, ShoppingBag, Stethoscope, User, LogOut, 
  ChevronDown, ChevronUp, Sparkles, Gamepad2, Video, CreditCard, 
  ArrowRight, MessageSquare, Bell, Flame, ShieldAlert, Utensils, Sun, Users, MessageCircle
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { streak, coins, unreadCount } = useRewards();
  const navigate = useNavigate();
  const location = useLocation();

  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isStreakOpen, setIsStreakOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExploreOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsExploreOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);

  // Main top nav links (Exact match to target mockup)
  const navLinks = [
    { to: '/', label: t('nav.home', 'Home'), icon: Home },
    { to: '/cycle', label: t('nav.cycle', 'My Cycle'), icon: Calendar },
    { to: '/play', label: t('nav.play', 'Play & Games ✨'), icon: Gamepad2 },
    { to: '/lifestyle', label: t('nav.lifestyle', 'Eat & Move'), icon: Utensils }
  ];

  // Explore Dropdown Sanctuaries
  const exploreSanctuaries = [
    {
      id: 'play',
      title: 'Sakhi Play',
      subtitle: 'Fun quizzes & games',
      icon: Gamepad2,
      iconBg: '#FFE5EC',
      iconColor: '#C23B68',
      path: '/play'
    },
    {
      id: 'videos',
      title: 'Sakhi Videos',
      subtitle: 'Doctor video guidance',
      icon: Video,
      iconBg: '#F0F4FF',
      iconColor: '#3B82F6',
      path: '/videos'
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
      id: 'partner',
      title: 'Partner Portal',
      subtitle: 'NGO, SHG & Rural Program Portal',
      icon: Users,
      iconBg: '#E0F2FE',
      iconColor: '#0284C7',
      path: '/partner'
    }
  ];

  const isExploreActive = ['/products', '/doctors', '/forum', '/payables', '/videos'].includes(location.pathname);

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
          max-width: 100%;
          margin: 0;
          padding: 0 clamp(16px, 2.5vw, 40px);
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

        /* SOS Red Alert Button Pill */
        .sos-btn {
          background: #FFF1F2;
          border: 1.5px solid #FECDD3;
          color: #BE123C;
          font-size: clamp(0.8rem, 0.85vw, 0.9rem);
          font-weight: 800;
          padding: 7px 16px;
          border-radius: var(--radius-full);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(225, 29, 72, 0.12);
        }
        .sos-btn:hover {
          background: #FFE4E6;
          border-color: #E11D48;
          transform: translateY(-1px);
        }

        /* Profile Button Pill */
        .profile-btn {
          background: #FFFFFF;
          border: 1.5px solid #FAD4DE;
          color: #3E242B;
          font-size: clamp(0.8rem, 0.85vw, 0.9rem);
          font-weight: 700;
          padding: 7px 16px;
          border-radius: var(--radius-full);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .profile-btn:hover {
          background: #FFF0F4;
          border-color: #B9345D;
        }

        /* Streak & Coins Pill */
        .streak-coins-pill {
          background: linear-gradient(135deg, #FFFDF0 0%, #FFF7F9 100%);
          border: 1.5px solid #FEF08A;
          color: #3E242B;
          font-size: 0.85rem;
          font-weight: 800;
          padding: 5px 14px;
          border-radius: var(--radius-full);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 10px rgba(224, 159, 62, 0.12);
          transition: all 0.2s ease;
        }
        .streak-coins-pill:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(224, 159, 62, 0.22);
        }

        /* Notification Bell Button */
        .notif-bell-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid #FAD4DE;
          color: #5C434B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }
        .notif-bell-btn:hover {
          background: #FFF0F4;
          color: #B9345D;
        }

        .navbar-right-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Explore Dropdown Card & Scrollbar */
        .explore-dropdown-card {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          width: 320px;
          background: #FFFFFF;
          border: 1.5px solid #FAD4DE;
          border-radius: 20px;
          padding: 16px 12px 16px 16px;
          box-shadow: 0 12px 36px rgba(185, 52, 93, 0.16);
          z-index: 1000;
          animation: exploreFadeInDown 0.2s ease-out;
        }

        @keyframes exploreFadeInDown {
          from {
            opacity: 0;
            transform: translate(-50%, -8px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .explore-scroll-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 250px;
          overflow-y: auto;
          padding-right: 6px;
          scrollbar-width: thin;
          scrollbar-color: #71717A #F4F4F5;
        }

        /* Custom Scrollbar (Exact match to prompt mockup) */
        .explore-scroll-container::-webkit-scrollbar {
          width: 10px;
        }

        .explore-scroll-container::-webkit-scrollbar-track {
          background: #F4F4F5;
          border-radius: 10px;
        }

        .explore-scroll-container::-webkit-scrollbar-thumb {
          background: #71717A;
          border-radius: 10px;
          border: 2px solid #F4F4F5;
        }

        .explore-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #52525B;
        }

        /* Top and Bottom Scrollbar Arrows (▲ and ▼) */
        .explore-scroll-container::-webkit-scrollbar-button:single-button:vertical:decrement {
          background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='%2352525B'><polygon points='12,4 2,20 22,20'/></svg>") no-repeat center;
          background-size: 8px 8px;
          height: 12px;
          display: block;
        }

        .explore-scroll-container::-webkit-scrollbar-button:single-button:vertical:increment {
          background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='%2352525B'><polygon points='12,20 2,4 22,4'/></svg>") no-repeat center;
          background-size: 8px 8px;
          height: 12px;
          display: block;
        }

        .explore-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .explore-item-row:hover {
          background-color: #FFF0F4;
        }

        .explore-item-arrow {
          color: #B9345D;
          font-weight: 700;
          font-size: 1.1rem;
          transition: transform 0.15s ease;
        }

        .explore-item-row:hover .explore-item-arrow {
          transform: translateX(3px);
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

        {/* Main Navbar Links + SOS + Profile */}
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
                  <div className="explore-scroll-container">
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
                          <span className="explore-item-arrow">›</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </li>

            {/* 🚨 Emergency SOS Pill Button */}
            <li>
              <button
                type="button"
                className="sos-btn"
                onClick={() => setIsSOSOpen(true)}
                title="Emergency Helpline & SOS Care"
              >
                <span>🚨</span>
                <span>SOS</span>
              </button>
            </li>

            {/* 👤 My Profile Pill Button */}
            <li>
              <button
                type="button"
                className="profile-btn"
                onClick={() => setIsProfileOpen(true)}
                title="My Sakhi Profile"
              >
                <User size={15} color="#3E242B" />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Actions: Coins & Streak Pill + Bell + Language */}
        <div className="navbar-right-actions">
          {/* Sakhi Coins & Streak Counter Pill (✨ 1,250 🔥 7d) */}
          <button
            type="button"
            className="streak-coins-pill"
            onClick={() => setIsStreakOpen(true)}
            title="Daily Streak & Sakhi Coins"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={15} color="#CA8A04" />
              <span>{coins.toLocaleString()}</span>
            </span>

            <span 
              style={{ 
                backgroundColor: '#FFE5EC', 
                color: '#BE123C', 
                borderRadius: '9999px', 
                padding: '2px 8px', 
                fontSize: '0.775rem',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              🔥 {streak}d
            </span>
          </button>

          {/* Notifications Bell Icon with Badge Counter */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              type="button"
              className="notif-bell-btn"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    backgroundColor: '#E11D48',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover Menu */}
            <NotificationsPopover isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
          </div>

          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>

      {/* Emergency SOS Modal */}
      <EmergencySOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />

      {/* User Profile Modal */}
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Daily Streak & Coins Modal */}
      <StreakRewardsModal isOpen={isStreakOpen} onClose={() => setIsStreakOpen(false)} />
    </header>
  );
}
