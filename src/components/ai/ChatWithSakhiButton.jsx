import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles, Edit3 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SakhiChat from './SakhiChat';

export default function ChatWithSakhiButton() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        left: '24px', 
        bottom: '24px', 
        zIndex: 9999,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
      }}
      className="likho-sakhi-container"
    >
      <style>{`
        @media (max-width: 960px) {
          .likho-sakhi-container {
            left: 16px !important;
            bottom: 76px !important;
          }
        }
        @keyframes spinText {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Floating Circular Container wrapping Icon & Circular Text */}
      <div style={{ position: 'relative', width: '84px', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Fascinating Circular SVG Curved Text Ring wrapping around the Icon */}
        {!isOpen && (
          <svg 
            viewBox="0 0 100 100" 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none',
              animation: 'spinText 20s linear infinite'
            }}
          >
            <path id="circlePathLikho" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
            <text fill="#B9345D" fontSize="9" fontWeight="800" letterSpacing="0.8px">
              <textPath href="#circlePathLikho" startOffset="0%">
                ✦ LIKHO SAKHI ✦ लिखो सखी ✦
              </textPath>
            </text>
          </svg>
        )}

        {/* Circular Floating Action Button */}
        <motion.button
          type="button"
          onClick={toggleChat}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={!isOpen ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={!isOpen ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : {}}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'relative',
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #EC738F 0%, #D9486D 50%, #B83256 100%)',
            boxShadow: '0 10px 25px rgba(236, 115, 143, 0.45), 0 4px 12px rgba(110, 44, 75, 0.25)',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            zIndex: 2
          }}
          aria-label="Likho Sakhi - Text Chat"
          title="Likho Sakhi (लिखो सखी)"
        >
          {isHovered && !isOpen && (
            <Sparkles
              size={13}
              color="#FFD1DC"
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                animation: 'sparklePulse 2s ease-in-out infinite'
              }}
            />
          )}
          {isOpen ? (
            <X size={24} color="#FFFFFF" strokeWidth={2.5} />
          ) : (
            <Edit3 size={24} color="#FFFFFF" strokeWidth={2.2} />
          )}
        </motion.button>
      </div>

      {/* Hugging Compact Rounded Badge beneath button */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            marginTop: '-6px',
            backgroundColor: '#FFFFFF',
            color: '#3E242B',
            padding: '3px 10px',
            borderRadius: '9999px',
            border: '1.5px solid #FAD4DE',
            boxShadow: '0 4px 12px rgba(236, 115, 143, 0.2)',
            fontSize: '0.75rem',
            fontWeight: '800',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            zIndex: 3
          }}
          onClick={toggleChat}
        >
          <span>✍️ लिखो सखी</span>
        </motion.div>
      )}

      {/* Floating Sakhi Chat Window Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sakhi-chat-drawer"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="sakhi-chat-overlay-container"
            style={{
              position: 'fixed',
              zIndex: 10000,
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(90, 30, 50, 0.22), 0 0 0 1px rgba(250, 212, 222, 0.6)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <style>{`
              .sakhi-chat-overlay-container {
                left: 24px;
                bottom: 100px;
                width: 440px;
                height: 640px;
                max-height: calc(100vh - 130px);
                max-width: calc(100vw - 32px);
              }
              @media (max-width: 960px) {
                .sakhi-chat-overlay-container {
                  left: 12px !important;
                  right: 12px !important;
                  bottom: 150px !important;
                  width: auto !important;
                  height: min(580px, calc(100vh - 170px)) !important;
                  max-width: 100% !important;
                }
              }
              @media (max-width: 480px) {
                .sakhi-chat-overlay-container {
                  left: 8px !important;
                  right: 8px !important;
                  bottom: 140px !important;
                  height: min(540px, calc(100vh - 150px)) !important;
                }
              }
            `}</style>

            {/* Close Button Header overlay */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 20,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 235, 240, 0.9)',
                border: '1px solid #FAD4DE',
                color: '#EC738F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EC738F';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 235, 240, 0.9)';
                e.currentTarget.style.color = '#EC738F';
              }}
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>

            {/* Existing SakhiChat Component */}
            <div style={{ flex: 1, minHeight: 0, height: '100%' }}>
              <SakhiChat />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
