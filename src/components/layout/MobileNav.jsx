import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Home, Calendar, Bot, Menu, X, Sparkles, ShoppingBag, 
  Stethoscope, Users, CreditCard, MessageSquare 
} from 'lucide-react';

export default function MobileNav() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainTabs = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/cycle', label: t('nav.cycle'), icon: Calendar },
    { to: '/doctors', label: t('nav.doctors'), icon: Stethoscope },
    { to: '/forum', label: t('nav.forum'), icon: MessageSquare }
  ];

  const exploreLinks = [
    { to: '/doctors', label: 'Find Gynac', icon: Stethoscope },
    { to: '/forum', label: 'Safe Forum', icon: MessageSquare },
    { to: '/products', label: 'Products', icon: ShoppingBag },
    { to: '/payables', label: 'Payables', icon: CreditCard }
  ];

  return (
    <>
      <style>{`
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background-color: #FFFFFF;
          border-top: 1px solid var(--border);
          z-index: 99;
          box-shadow: 0 -4px 16px rgba(90, 48, 66, 0.06);
        }
        .mobile-nav-items {
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: space-around;
        }
        .mobile-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.725rem;
          font-weight: 500;
          width: 20%;
          background: none;
          border: none;
          cursor: pointer;
        }
        .mobile-tab.active {
          color: var(--rose-dark);
          font-weight: 700;
        }

        @media (max-width: 960px) {
          .mobile-bottom-nav {
            display: block;
          }
        }
      `}</style>

      <nav className="mobile-bottom-nav">
        <div className="mobile-nav-items">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) => `mobile-tab ${isActive ? 'active' : ''}`}
                end={tab.to === '/'}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </NavLink>
            );
          })}

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`mobile-tab ${isMenuOpen ? 'active' : ''}`}
            aria-label={t('accessibility.openMenu')}
          >
            <Menu size={20} />
            <span>Explore</span>
          </button>
        </div>
      </nav>

      {/* Slide-Up Overlay Menu */}
      {isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            backgroundColor: 'rgba(53, 38, 46, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              boxShadow: 'var(--shadow-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: '#B9345D', fontSize: '1.25rem', fontWeight: '700' }}>
                ✨ Explore Sanctuaries
              </h3>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)' }}
                aria-label={t('accessibility.closeMenu')}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              {exploreLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-soft)',
                      textDecoration: 'none',
                      color: 'var(--rose-dark)',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    <Icon size={18} color="var(--rose)" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
