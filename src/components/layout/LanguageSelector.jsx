import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Current active language object
  const currentLang = LANGUAGES[language] || LANGUAGES.en;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <style>{`
        @keyframes dropdownSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .lang-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(255, 255, 255, 0.95);
          padding: 7px 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 600;
          font-family: var(--font-ui);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(236, 115, 143, 0.08);
          backdrop-filter: blur(8px);
        }

        .lang-trigger-btn:hover, .lang-trigger-btn.open {
          background-color: #FFF0F4;
          border-color: var(--rose);
          box-shadow: 0 4px 14px rgba(236, 115, 143, 0.18);
        }

        .lang-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 210px;
          max-height: 380px;
          overflow-y: auto;
          background-color: #FFFFFF;
          border-radius: 18px;
          border: 1px solid rgba(250, 212, 222, 0.9);
          box-shadow: 0 12px 36px rgba(62, 36, 43, 0.18), 0 4px 12px rgba(236, 115, 143, 0.12);
          padding: 8px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 3px;
          animation: dropdownSlideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: thin;
          scrollbar-color: var(--rose-primary) transparent;
        }

        .lang-option-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 9px 12px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 500;
          font-family: var(--font-ui);
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .lang-option-btn:hover {
          background-color: rgba(255, 240, 243, 0.8);
          color: var(--rose-dark);
        }

        .lang-option-btn.active {
          background-color: #FFF0F4;
          color: var(--pink-vivid);
          font-weight: 700;
        }
      `}</style>

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`lang-trigger-btn ${isOpen ? 'open' : ''}`}
        aria-expanded={isOpen}
        aria-label={t('accessibility.selectLanguage')}
      >
        <Globe size={16} color="var(--rose)" style={{ flexShrink: 0 }} />
        <span>{currentLang.native}</span>
        <ChevronDown 
          size={14} 
          color="var(--text-secondary)" 
          style={{ 
            transition: 'transform 0.2s ease', 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            marginLeft: '2px'
          }} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="lang-dropdown-menu" role="menu">
          <div style={{ padding: '6px 10px 6px 10px', fontSize: '0.725rem', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {t('common.chooseLanguage')}
          </div>

          {Object.values(LANGUAGES).map((lang) => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`lang-option-btn ${isActive ? 'active' : ''}`}
                role="menuitem"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{lang.flag}</span>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.9rem', lineHeight: 1.2 }}>{lang.native}</span>
                    {lang.native !== lang.label && (
                      <span style={{ display: 'block', fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: '400' }}>
                        {lang.label}
                      </span>
                    )}
                  </div>
                </div>

                {isActive && <Check size={16} color="var(--pink-vivid)" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
