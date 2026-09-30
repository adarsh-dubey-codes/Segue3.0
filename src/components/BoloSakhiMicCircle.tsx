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
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      <AnimatePresence>
        {/* Transcript Overlay Drawer (Micro-Card) */}
        {isOpen && (
          <motion.div
            key="micro-modal-drawer"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-4 w-[340px] sm:w-[370px] rounded-3xl bg-rose-50/95 border border-rose-200/80 p-4 shadow-xl shadow-rose-100/80 backdrop-blur-md flex flex-col gap-3.5"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-pink-200/60">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-xl bg-pink-100 text-rose-600">
                  <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight text-rose-900 flex items-center gap-1">
                    बोलो सखी <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
                  </h4>
                  <p className="text-[11px] text-rose-700/80 font-medium">
                    आपकी अपनी AI वॉयस साथी
                  </p>
                </div>
              </div>

              {/* Close ('X') Button */}
              <button
                onClick={handleClose}
                className="bg-pink-100 text-rose-700 hover:bg-pink-200 rounded-full p-1.5 transition-colors cursor-pointer"
                aria-label="Close Bolo Sakhi Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Audio Wave & Status Body */}
            <div className="flex flex-col items-center justify-center gap-2.5">
              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  error
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : isListening
                    ? 'bg-pink-100 text-rose-800 border border-pink-200'
                    : isSpeaking
                    ? 'bg-rose-100 text-rose-900 border border-rose-200'
                    : isProcessing
                    ? 'bg-pink-100 text-pink-900 border border-pink-200'
                    : 'bg-white text-rose-800 border border-pink-100'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    error
                      ? 'bg-amber-500'
                      : isListening
                      ? 'bg-rose-400 animate-ping'
                      : isSpeaking
                      ? 'bg-rose-500 animate-pulse'
                      : 'bg-pink-300'
                  }`}
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

              {/* Animated Waveform Visualizer (Pastel Pink Glowing Bars) */}
              <div className="flex items-center justify-center gap-1.5 h-8 w-full px-6">
                {audioLevels.map((h, idx) => (
                  <motion.div
                    key={idx}
                    className="w-1.5 rounded-full bg-rose-400 animate-pulse"
                    animate={{
                      height: isListening || isSpeaking ? `${h}%` : '6px'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                ))}
              </div>

              {/* Error Box */}
              {error && (
                <div className="w-full p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Live Speech Text Box */}
              <div className="w-full min-h-[46px] bg-white/80 border border-pink-100 text-rose-950 p-3 rounded-2xl shadow-sm text-center">
                <p className="text-xs sm:text-sm font-medium text-rose-900 italic">
                  {transcript ? (
                    `"${transcript}"`
                  ) : (
                    <span className="text-pink-400 not-italic text-xs font-normal">
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
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 text-white shadow-md text-xs sm:text-sm leading-relaxed relative flex items-start gap-2.5"
                >
                  <Volume2
                    onClick={() => speakText(response)}
                    className="w-4 h-4 text-pink-100 shrink-0 mt-0.5 animate-pulse cursor-pointer hover:scale-110 transition-transform"
                    title="री-प्ले (Replay)"
                  />
                  <div>
                    <p className="font-bold text-[11px] text-rose-100 mb-0.5">सखी का जवाब:</p>
                    <p className="font-medium text-xs sm:text-sm text-white">{response}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Voice Chips */}
            <div className="flex flex-col gap-1.5 pt-1">
              <p className="text-[11px] font-bold text-rose-800/70 uppercase tracking-wider px-1">
                क्विक वॉयस प्रॉम्ट्स (Quick Voice Prompts)
              </p>
              <div className="flex flex-col gap-1.5">
                {VOICE_CHIPS.map((chip) => (
                  <motion.button
                    key={chip.id}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChipClick(chip)}
                    className="bg-white text-rose-700 border border-pink-200 hover:bg-rose-100/80 rounded-2xl p-2.5 text-xs font-medium shadow-sm transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-xs text-rose-600 font-bold">
                        🎙️
                      </span>
                      <div>
                        <span className="block font-bold text-rose-900">
                          {chip.hindiText}
                        </span>
                        <span className="block text-[10px] text-rose-500 font-medium">
                          {chip.subText}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-rose-500 group-hover:text-rose-700 font-semibold px-2 py-0.5 rounded-full bg-pink-50 border border-pink-100">
                      टैप करें →
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-pink-200/60 flex items-center justify-between text-[10px] text-rose-700/70 font-medium">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-400" /> 100% प्राइवेट व सुरक्षित
              </span>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  आवाज़ बंद करें
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Circle Button Container */}
      <div className="relative flex flex-col items-center">
        {/* "Bolo Sakhi" Pill Badge Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-3 z-10 bg-white/95 text-rose-600 border border-pink-200 font-bold px-3 py-0.5 rounded-full shadow-sm text-xs animate-bounce tracking-wide pointer-events-none select-none flex items-center gap-1"
        >
          <span>🗣️ बोलो सखी</span>
        </motion.div>

        {/* Floating Circular Mic Button (w-16 h-16 rounded-full) */}
        <motion.button
          onClick={handleCircleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-rose-400 via-pink-400 to-rose-300 shadow-lg shadow-rose-200/60 text-white cursor-pointer transition-all duration-300 ${
            !isListening && !isSpeaking ? 'ring-4 ring-pink-200/70 animate-pulse' : ''
          }`}
          aria-label="Bolo Sakhi Voice Assistant"
        >
          {/* Recording State: Pastel Pink Ripple Waves */}
          {isListening && (
            <>
              <span className="absolute inset-0 rounded-full bg-pink-300/60 animate-ping pointer-events-none" />
              <span className="absolute -inset-2 rounded-full bg-pink-200/40 animate-pulse pointer-events-none" />
            </>
          )}

          {/* Icon Content */}
          {isProcessing ? (
            <RefreshCw className="w-7 h-7 text-white animate-spin" />
          ) : isSpeaking ? (
            /* Speaking State: Animated 3-Bar Equalizer in Pastel Tones */
            <div className="flex items-center gap-1 h-6 px-1">
              <span className="w-1 bg-white rounded-full h-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 bg-rose-100 rounded-full h-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 bg-white rounded-full h-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <Mic className="w-7 h-7 text-white" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default BoloSakhiMicCircle;
