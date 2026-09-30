import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Sparkles, X, Volume2, Radio, AlertCircle, RefreshCw, Heart } from 'lucide-react';
import { useBoloSakhiEngine } from '../hooks/useBoloSakhiEngine';

export interface VoicePromptChip {
  id: string;
  hindiText: string;
  subText: string;
  sampleQuery: string;
}

const VOICE_PROMPTS: VoicePromptChip[] = [
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

export const BoloSakhiFloatingWidget: React.FC = () => {
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
    stopSpeaking,
    resetEngine
  } = useBoloSakhiEngine();

  const handleOpen = () => {
    setIsOpen(true);
    startListening();
  };

  const handleClose = () => {
    resetEngine();
    setIsOpen(false);
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleChipClick = (chip: VoicePromptChip) => {
    stopListening();
    sendVoiceQuery(chip.sampleQuery);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen ? (
          /* Floating Pill Button */
          <motion.button
            key="floating-pill"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0]
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              y: {
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            onClick={handleOpen}
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-xl hover:shadow-2xl hover:shadow-rose-400/40 active:scale-95 transition-all duration-300 border border-white/20 backdrop-blur-md cursor-pointer"
            aria-label="Open Bolo Sakhi Voice Assistant"
          >
            {/* Glowing effect ring behind button */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 blur-md opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse pointer-events-none" />

            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white">
              <Mic className="w-5 h-5 text-white animate-bounce" />
            </div>

            <span className="relative flex items-center gap-1.5 font-bold text-base tracking-wide drop-shadow-sm">
              <span>🗣️ बोलो सखी</span>
              <span className="text-xs font-medium opacity-90">(Bolo Sakhi)</span>
            </span>

            <div className="relative flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin-slow" />
            </div>
          </motion.button>
        ) : (
          /* Expanded Card / Bottom Sheet Overlay */
          <motion.div
            key="expanded-widget"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[360px] sm:w-[380px] rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-rose-100 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Card Header */}
            <div className="relative px-5 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/15 backdrop-blur-md">
                  <Radio className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight flex items-center gap-1.5">
                    बोलो सखी <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  </h3>
                  <p className="text-xs text-rose-100/90 font-medium">
                    आपकी अपनी पर्सनल AI वॉयस साथी
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close Voice Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Listening & Sound Visualizer Box */}
            <div className="p-5 flex flex-col items-center justify-center bg-gradient-to-b from-rose-50/60 to-white dark:from-zinc-900 dark:to-zinc-900/80 border-b border-rose-100/60 dark:border-zinc-800">
              {/* Central Mic Button */}
              <motion.button
                onClick={handleMicToggle}
                whileTap={{ scale: 0.95 }}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isListening
                    ? 'bg-gradient-to-tr from-rose-500 to-pink-500 shadow-lg shadow-rose-500/40 text-white'
                    : isProcessing
                    ? 'bg-amber-500 shadow-lg shadow-amber-500/40 text-white'
                    : isSpeaking
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/40 text-white'
                    : 'bg-rose-100 dark:bg-zinc-800 text-rose-500 hover:bg-rose-200 dark:hover:bg-zinc-700'
                }`}
              >
                {/* Concentric Pulse Rings when listening */}
                {isListening && (
                  <>
                    <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-60 pointer-events-none" />
                    <span className="absolute -inset-3 rounded-full bg-rose-400/20 animate-pulse pointer-events-none" />
                  </>
                )}

                {isListening ? (
                  <Mic className="w-9 h-9 text-white animate-pulse" />
                ) : isProcessing ? (
                  <RefreshCw className="w-8 h-8 text-white animate-spin" />
                ) : isSpeaking ? (
                  <Volume2 className="w-9 h-9 text-white animate-bounce" />
                ) : (
                  <MicOff className="w-8 h-8" />
                )}
              </motion.button>

              {/* Status Header */}
              <div className="mt-3 text-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    error
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200'
                      : isListening
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                      : isSpeaking
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : isProcessing
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      error
                        ? 'bg-amber-500'
                        : isListening
                        ? 'bg-rose-500 animate-ping'
                        : isSpeaking
                        ? 'bg-emerald-500 animate-pulse'
                        : 'bg-zinc-400'
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
              </div>

              {/* Animated Audio Waveform Visualizer */}
              <div className="flex items-center justify-center gap-1.5 h-10 mt-3 w-full px-8">
                {audioLevels.map((height, idx) => (
                  <motion.div
                    key={idx}
                    className={`w-1.5 rounded-full ${
                      isSpeaking
                        ? 'bg-gradient-to-t from-emerald-500 to-teal-400'
                        : 'bg-gradient-to-t from-rose-500 to-pink-400'
                    }`}
                    animate={{
                      height: isListening || isSpeaking ? `${height}%` : '8px'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                ))}
              </div>

              {/* Error Message Alert (If any) */}
              {error && (
                <div className="mt-2 w-full p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Live Transcript Box */}
              <div className="mt-3 w-full min-h-[48px] p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-rose-100 dark:border-zinc-700/60 shadow-inner text-center">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 italic">
                  {transcript ? (
                    `"${transcript}"`
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-500 not-italic text-xs">
                      उदाहरण: "मुझे पीरियड क्रैम्प्स हो रहे हैं, सखी"
                    </span>
                  )}
                </p>
              </div>

              {/* AI Response Display */}
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 w-full p-3.5 rounded-2xl bg-rose-500 text-white shadow-md text-sm leading-relaxed relative flex items-start gap-2.5"
                >
                  <Volume2
                    onClick={() => speakText(response)}
                    className="w-5 h-5 text-amber-200 shrink-0 mt-0.5 animate-pulse cursor-pointer hover:scale-110 transition-transform"
                    title="री-प्ले (Replay Voice)"
                  />
                  <div>
                    <p className="font-semibold text-xs text-rose-100 mb-0.5">सखी का जवाब:</p>
                    <p className="text-xs sm:text-sm font-medium">{response}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Vernacular Voice Chips Section */}
            <div className="p-4 bg-white dark:bg-zinc-900 flex flex-col gap-2">
              <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-1">
                क्विक वॉयस प्रॉम्ट्स (Quick Voice Prompts)
              </p>

              <div className="flex flex-col gap-2">
                {VOICE_PROMPTS.map((chip) => (
                  <motion.button
                    key={chip.id}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChipClick(chip)}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-rose-50/80 dark:bg-zinc-800/60 hover:bg-rose-100/80 dark:hover:bg-zinc-800 border border-rose-100/80 dark:border-zinc-700/50 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-white dark:bg-zinc-700 flex items-center justify-center text-xs text-rose-500 shadow-sm font-bold group-hover:scale-110 transition-transform">
                        🎙️
                      </span>
                      <div>
                        <span className="block text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-100">
                          {chip.hindiText}
                        </span>
                        <span className="block text-[11px] text-rose-500 dark:text-rose-400 font-medium">
                          {chip.subText}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-zinc-400 group-hover:text-rose-500 font-semibold px-2 py-1 rounded-full bg-white/80 dark:bg-zinc-700/80 border border-rose-100/50">
                      टैप करें →
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> 100% प्राइवेट व सुरक्षित
              </span>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="text-rose-500 font-bold hover:underline cursor-pointer"
                >
                  आवाज़ बंद करें
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoloSakhiFloatingWidget;
