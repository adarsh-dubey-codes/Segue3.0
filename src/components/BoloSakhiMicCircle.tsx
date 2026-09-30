import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Volume2, Radio, Sparkles, RefreshCw, AlertCircle, Heart } from 'lucide-react';
import { useBoloSakhiEngine } from '../hooks/useBoloSakhiEngine';

export interface VoicePromptChip {
  id: string;
  hindiText: string;
  subText: string;
  sampleQuery: string;
}

const VOICE_CHIPS: VoicePromptChip[] = [
  {
    id: 'cramps',
    hindiText: 'दर्द में क्या करें?',
    subText: '(Cramp tips)',
    sampleQuery: 'दर्द में क्या करें? (Cramp tips)'
  },
  {
    id: 'period-date',
    hindiText: 'Period Date Check',
    subText: '(साइकिल ट्रैकिंग)',
    sampleQuery: 'मेरी अगली पीरियड डेट कब है?'
  },
  {
    id: 'doctor-connect',
    hindiText: 'Doctor se baat',
    subText: '(विशेषज्ञ सलाह)',
    sampleQuery: 'मुझे डॉक्टर से बात करनी है'
  }
];

export const BoloSakhiMicCircle: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    isListening,
    isProcessing,
    isSpeaking,
    transcript,
    response,
    error,
    audioLevels,
    startListening,
    stopListening,
    sendVoiceQuery,
    speakText,
    stopSpeaking,
    resetEngine
  } = useBoloSakhiEngine();

  const handleCircleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      startListening();
    } else {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    }
  };

  const handleClose = () => {
    resetEngine();
    setIsOpen(false);
  };

  const handleChipClick = (chip: VoicePromptChip) => {
    stopListening();
    sendVoiceQuery(chip.sampleQuery);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
      }}
      className="bolo-sakhi-mic-container"
    >
      <style>{`
        @media (max-width: 960px) {
          .bolo-sakhi-mic-container {
            bottom: 76px !important;
            right: 16px !important;
          }
        }
      `}</style>
      <AnimatePresence>
        {/* Transcript Overlay Drawer */}
        {isOpen && (
          <motion.div
            key="micro-modal-drawer"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              marginBottom: '16px',
              width: 'min(360px, 90vw)',
              borderRadius: '24px',
              backgroundColor: 'rgba(255, 245, 247, 0.97)',
              border: '1px solid #FAD4DE',
              padding: '16px',
              boxShadow: '0 20px 50px rgba(62, 36, 43, 0.18), 0 8px 24px rgba(236, 115, 143, 0.25)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F0D5DD' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '12px', backgroundColor: '#FFE5EC', color: '#EC738F' }}>
                  <Radio size={16} color="#EC738F" style={{ animation: 'pulse 2s infinite' }} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', color: '#38232A', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    बोलो सखी <Sparkles size={14} color="#EC738F" />
                  </h4>
                  <p style={{ fontSize: '0.725rem', color: '#7D626C', margin: 0 }}>
                    आपकी अपनी AI वॉयस साथी
                  </p>
                </div>
              </div>

              {/* Close ('X') Button */}
              <button
                type="button"
                onClick={handleClose}
                style={{
                  backgroundColor: '#FFE5EC',
                  color: '#EC738F',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Close Bolo Sakhi Drawer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Audio Wave & Status Body */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              {/* Status Badge */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.775rem',
                  fontWeight: '600',
                  backgroundColor: error ? '#FFF0F3' : isListening ? '#FFE5EC' : isSpeaking ? '#FFF0F3' : '#FFFFFF',
                  color: error ? '#D32F2F' : '#EC738F',
                  border: '1px solid #FAD4DE'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: error ? '#D32F2F' : isListening ? '#EC738F' : isSpeaking ? '#4E9F76' : '#9E828C'
                  }}
                />
                {error
                  ? 'त्रुटि (Error)'
                  : isListening
                  ? 'सखी सुन रही है... (Sakhi is listening...)'
                  : isProcessing
                  ? 'उत्तर तैयार हो रहा है... (Thinking...)'
                  : isSpeaking
                  ? 'सखी बोल रही है... (Sakhi is responding...)'
                  : 'माइक पर टैप करके बोलें (Tap mic to speak)'}
              </span>

              {/* Animated Waveform Visualizer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '32px', width: '100%' }}>
                {audioLevels.map((h, idx) => (
                  <motion.div
                    key={idx}
                    style={{ width: '6px', borderRadius: '9999px', backgroundColor: '#EC738F' }}
                    animate={{
                      height: isListening || isSpeaking ? `${h}%` : '6px'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                ))}
              </div>

              {/* Error Box */}
              {error && (
                <div style={{ width: '100%', padding: '10px', borderRadius: '12px', backgroundColor: '#FFF0F3', border: '1px solid #FAD4DE', color: '#D32F2F', fontSize: '0.775rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} color="#D32F2F" style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {/* Live Speech Text Box */}
              <div style={{ width: '100%', minHeight: '44px', backgroundColor: '#FFFFFF', border: '1px solid #F0D5DD', color: '#38232A', padding: '10px 12px', borderRadius: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.825rem', fontWeight: '500', color: '#38232A', fontStyle: 'italic', margin: 0 }}>
                  {transcript ? (
                    `"${transcript}"`
                  ) : (
                    <span style={{ color: '#9E828C', fontStyle: 'normal', fontSize: '0.775rem' }}>
                      "मुझे पीरियड में दर्द हो रहा है, सखी"
                    </span>
                  )}
                </p>
              </div>

              {/* AI Response Output Card */}
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '16px',
                    backgroundColor: '#6E2C4B',
                    color: '#FFFFFF',
                    boxShadow: '0 6px 16px rgba(110, 44, 75, 0.25)',
                    fontSize: '0.825rem',
                    lineHeight: '1.5',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}
                >
                  <Volume2
                    onClick={() => speakText(response)}
                    size={18}
                    color="#FFE5EC"
                    style={{ flexShrink: 0, marginTop: '2px', cursor: 'pointer' }}
                    title="री-प्ले (Replay)"
                  />
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '0.7rem', color: '#FFE5EC', marginBottom: '2px' }}>सखी का जवाब:</p>
                    <p style={{ fontWeight: '500', fontSize: '0.825rem', margin: 0, color: '#FFFFFF' }}>{response}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Voice Chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: '700', color: '#7D626C', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                क्विक वॉयस प्रॉम्ट्स (Quick Voice Prompts)
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {VOICE_CHIPS.map((chip) => (
                  <motion.button
                    key={chip.id}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChipClick(chip)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#38232A',
                      border: '1px solid #F0D5DD',
                      borderRadius: '16px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FFE5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                        🎙️
                      </span>
                      <div>
                        <span style={{ display: 'block', fontWeight: '700', color: '#38232A' }}>
                          {chip.hindiText}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.675rem', color: '#8C6C79' }}>
                          {chip.subText}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#EC738F', fontWeight: '600', padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#FFF0F3', border: '1px solid #FAD4DE' }}>
                      टैप करें →
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0D5DD', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: '#8C6C79' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart size={12} color="#EC738F" fill="#EC738F" /> 100% प्राइवेट व सुरक्षित
              </span>
              {isSpeaking && (
                <button
                  type="button"
                  onClick={stopSpeaking}
                  style={{ background: 'none', border: 'none', color: '#EC738F', fontWeight: '700', cursor: 'pointer' }}
                >
                  आवाज़ बंद करें
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Circle Button Container */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* "Bolo Sakhi" Pill Badge Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: '-14px',
            zIndex: 10,
            backgroundColor: '#FFFFFF',
            color: '#6E2C4B',
            border: '1px solid #FAD4DE',
            fontWeight: '700',
            padding: '2px 10px',
            borderRadius: '9999px',
            boxShadow: '0 4px 12px rgba(236, 115, 143, 0.25)',
            fontSize: '0.725rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>🗣️ बोलो सखी</span>
        </motion.div>

        {/* Floating Circular Mic Button */}
        <motion.button
          type="button"
          onClick={handleCircleClick}
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
            background: 'linear-gradient(135deg, #EC738F 0%, #D9486D 50%, #6E2C4B 100%)',
            boxShadow: '0 10px 30px rgba(236, 115, 143, 0.45), 0 4px 12px rgba(110, 44, 75, 0.3)',
            color: '#FFFFFF',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          aria-label="Bolo Sakhi Voice Assistant"
        >
          {isProcessing ? (
            <RefreshCw size={26} color="#FFFFFF" style={{ animation: 'spin 1s linear infinite' }} />
          ) : isSpeaking ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '22px' }}>
              <span style={{ width: '3px', height: '100%', backgroundColor: '#FFFFFF', borderRadius: '4px', animation: 'pulse 0.6s infinite' }} />
              <span style={{ width: '3px', height: '100%', backgroundColor: '#FFE5EC', borderRadius: '4px', animation: 'pulse 0.8s infinite' }} />
              <span style={{ width: '3px', height: '100%', backgroundColor: '#FFFFFF', borderRadius: '4px', animation: 'pulse 0.6s infinite' }} />
            </div>
          ) : (
            <Mic size={26} color="#FFFFFF" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default BoloSakhiMicCircle;
