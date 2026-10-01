import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles, Edit3 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SakhiChat from './SakhiChat';

export default function ChatWithSakhiButton() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const localizedChatLabel = t('nav.likhoSakhi', { defaultValue: 'Likho Sakhi (लिखो सखी)' });

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
        alignItems: 'flex-start',
        gap: '8px'
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
      `}</style>

      {/* Persistent / Hover Badge Pill - Likho Sakhi */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#3E242B',
            padding: '5px 14px',
            borderRadius: '9999px',
            border: '1.5px solid #FAD4DE',
            boxShadow: '0 4px 14px rgba(236, 115, 143, 0.25)',
            fontSize: '0.825rem',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
          onClick={toggleChat}
        >
          <span style={{ fontSize: '14px' }}>✍️</span>
          <span>लिखो सखी (Likho Sakhi)</span>
        </motion.div>
      )}

      {/* Floating Circular Chat Button on Left */}
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
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #EC738F 0%, #D9486D 50%, #B83256 100%)',
          boxShadow: '0 10px 30px rgba(236, 115, 143, 0.45), 0 4px 12px rgba(110, 44, 75, 0.3)',
          color: '#FFFFFF',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          cursor: 'pointer',
          transition: 'all 0.25s ease'
        }}
        aria-label="Likho Sakhi - Text Chat"
        title="Likho Sakhi (लिखो सखी)"
      >
        {isHovered && !isOpen && (
          <Sparkles
            size={14}
            color="#FFD1DC"
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
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

      {/* Floating Sakhi Chat Window Drawer Overlay (Anchored to Left) */}
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
                bottom: 96px;
                width: 440px;
                height: 640px;
                max-height: calc(100vh - 120px);
                max-width: calc(100vw - 32px);
              }
              @media (max-width: 960px) {
                .sakhi-chat-overlay-container {
                  left: 12px !important;
                  right: 12px !important;
                  bottom: 148px !important;
                  width: auto !important;
                  height: min(580px, calc(100vh - 160px)) !important;
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
