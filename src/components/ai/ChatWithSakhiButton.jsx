import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SakhiChat from './SakhiChat';

export default function ChatWithSakhiButton() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const localizedChatLabel = t('nav.chat', { defaultValue: 'Chat with Sakhi' });

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      {/* Desktop Hover Tooltip */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              right: '76px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#3E242B',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '20px',
              boxShadow: '0 4px 14px rgba(62, 36, 43, 0.25)',
              fontSize: '0.8rem',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 10001
            }}
          >
            <span>💬 {localizedChatLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular Chat Icon Button with Breathing Scale (Section #12 of Prompt) */}
      <motion.button
        type="button"
        onClick={toggleChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={!isOpen ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={!isOpen ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : {}}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'relative',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #EC738F 0%, #D9486D 50%, #B83256 100%)',
          boxShadow: '0 10px 30px rgba(236, 115, 143, 0.45), 0 4px 12px rgba(110, 44, 75, 0.3)',
          color: '#FFFFFF',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          cursor: 'pointer',
          transition: 'all 0.25s ease'
        }}
        aria-label={localizedChatLabel}
        title={localizedChatLabel}
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
          <X size={26} color="#FFFFFF" strokeWidth={2.5} />
        ) : (
          <MessageCircle size={26} color="#FFFFFF" strokeWidth={2.2} />
        )}
      </motion.button>

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
                right: 24px;
                bottom: 172px;
                width: 440px;
                height: 640px;
                max-height: calc(100vh - 200px);
                max-width: calc(100vw - 32px);
              }
              @media (max-width: 960px) {
                .sakhi-chat-overlay-container {
                  right: 12px !important;
                  left: 12px !important;
                  bottom: 224px !important;
                  width: auto !important;
                  height: min(580px, calc(100vh - 240px)) !important;
                  max-width: 100% !important;
                }
              }
              @media (max-width: 480px) {
                .sakhi-chat-overlay-container {
                  right: 8px !important;
                  left: 8px !important;
                  bottom: 216px !important;
                  height: min(540px, calc(100vh - 230px)) !important;
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

