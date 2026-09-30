import { useState, useEffect, useRef, useCallback } from 'react';
import { generateSakhiResponse } from '../utils/aiClient';

export interface BoloSakhiEngineState {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  transcript: string;
  response: string | null;
  error: string | null;
  audioLevels: number[];
}

export interface UseBoloSakhiEngineReturn extends BoloSakhiEngineState {
  startListening: () => Promise<void>;
  stopListening: () => void;
  sendVoiceQuery: (text: string) => Promise<void>;
  speakText: (text: string) => void;
  speakResponse: (text: string) => void;
  stopSpeaking: () => void;
  resetEngine: () => void;
}

const ERROR_FALLBACK_TEXT = 'माफ़ करना बहन, आपकी आवाज़ नहीं सुनाई दी. दोबारा बोलें.';

export const useBoloSakhiEngine = (): UseBoloSakhiEngineReturn => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([20, 20, 20, 20, 20, 20, 20]);

  const recognitionRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestTranscriptRef = useRef<string>('');
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // -------------------------------------------------------------
  // 1. Text-To-Speech (TTS Output) Setup
  // -------------------------------------------------------------
  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Load available voices & search for native female Hindi voice
    const voices = window.speechSynthesis.getVoices();
    const femaleHindiVoice = voices.find(
      (v) =>
        (v.lang.includes('hi') || v.lang.includes('hi-IN')) &&
        (v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('swara') ||
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('hi-in'))
    ) || voices.find((v) => v.lang.includes('hi') || v.lang.includes('hi-IN')) || null;

    if (femaleHindiVoice) {
      utterance.voice = femaleHindiVoice;
      utterance.lang = femaleHindiVoice.lang;
    } else {
      utterance.lang = 'hi-IN';
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (e) => {
      console.error('TTS error:', e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // -------------------------------------------------------------
  // 2. Gemini API / Sakhi AI Communication
  // -------------------------------------------------------------
  const sendVoiceQuery = useCallback(
    async (textInput: string) => {
      if (!textInput || !textInput.trim()) return;

      setIsProcessing(true);
      setError(null);
      stopSpeaking();

      const payload = {
        prompt: textInput,
        is_voice_widget: true,
        is_voice_input: true,
        timestamp: new Date().toISOString()
      };

      console.log('Sending voice payload to Sakhi AI:', payload);

      try {
        let aiResultText = '';

        // Attempt API route call first if available
        try {
          const apiRes = await fetch('/api/sakhi-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (apiRes.ok) {
            const data = await apiRes.json();
            if (data && data.response) {
              aiResultText = data.response;
            }
          }
        } catch (_apiErr) {
          // Fallback to local AI client if backend API route is not running
        }

        if (!aiResultText) {
          // Fallback to project's aiClient generateSakhiResponse
          aiResultText = await generateSakhiResponse(textInput, {
            is_voice_widget: true,
            is_voice_input: true
          });
        }

        setResponse(aiResultText);
        setIsProcessing(false);

        // Auto speak response using vernacular TTS
        speakText(aiResultText);
      } catch (err: any) {
        console.error('Sakhi AI API Error:', err);
        setIsProcessing(false);
        setError('एआई रेस्पॉन्स में त्रुटि आई।');
        speakText(ERROR_FALLBACK_TEXT);
      }
    },
    [speakText, stopSpeaking]
  );

  // -------------------------------------------------------------
  // 3. Speech Recognition (STT) Setup & Silence Detection
  // -------------------------------------------------------------
  const stopListening = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_e) {
        // ignore if already stopped
      }
    }

    // Stop microphone media tracks if active
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    setIsListening(false);

    // If there is captured text, trigger API call
    const capturedText = latestTranscriptRef.current.trim();
    if (capturedText) {
      sendVoiceQuery(capturedText);
    }
  }, [sendVoiceQuery]);

  const triggerSilenceDetection = useCallback(
    (currentTranscript: string) => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }

      // Auto-detect silence after 1.5s of no new speech
      silenceTimeoutRef.current = setTimeout(() => {
        if (currentTranscript && currentTranscript.trim().length > 0) {
          console.log('Silence detected (1.5s). Finalizing voice query:', currentTranscript);
          stopListening();
        }
      }, 1500);
    },
    [stopListening]
  );

  const startListening = useCallback(async () => {
    setError(null);
    setResponse(null);
    setTranscript('');
    latestTranscriptRef.current = '';
    stopSpeaking();

    // Explicitly request browser microphone permission first
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      }
    } catch (micErr) {
      console.error('Microphone permission denied:', micErr);
      setError(ERROR_FALLBACK_TEXT);
      speakText(ERROR_FALLBACK_TEXT);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition not available in browser. Triggering fallback.');
      setError('आपके ब्राउज़र में स्पीच रिकग्निशन उपलब्ध नहीं है।');
      speakText(ERROR_FALLBACK_TEXT);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Stop recording when user finishes speaking
      recognition.interimResults = true; // Show live interim results on screen
      recognition.lang = 'hi-IN'; // Default to Hindi, also supports en-IN Hinglish phrases

      // recognition.onstart: Set isListening = true and reset errors
      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      // recognition.onresult: Capture real-time speech results via event.results
      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }

        const trimmed = currentTranscript.trim();
        if (trimmed) {
          setTranscript(trimmed);
          latestTranscriptRef.current = trimmed;
          triggerSilenceDetection(trimmed);
        }
      };

      // recognition.onerror: Log microphone errors and update UI error state
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (
          event.error === 'not-allowed' ||
          event.error === 'no-speech' ||
          event.error === 'audio-capture' ||
          event.error === 'service-not-allowed'
        ) {
          setError(ERROR_FALLBACK_TEXT);
          speakText(ERROR_FALLBACK_TEXT);
        }
      };

      // recognition.onend: Trigger API call automatically with final transcript if present
      recognition.onend = () => {
        setIsListening(false);
        const finalCapturedText = latestTranscriptRef.current.trim();
        if (finalCapturedText) {
          sendVoiceQuery(finalCapturedText);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e: any) {
      console.error('Failed to start speech recognition:', e);
      setIsListening(false);
      setError(ERROR_FALLBACK_TEXT);
      speakText(ERROR_FALLBACK_TEXT);
    }
  }, [speakText, stopSpeaking, triggerSilenceDetection, sendVoiceQuery]);

  // -------------------------------------------------------------
  // 4. Audio Waveform Simulator effect when listening
  // -------------------------------------------------------------
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevels([
          Math.floor(Math.random() * 65) + 20,
          Math.floor(Math.random() * 85) + 15,
          Math.floor(Math.random() * 95) + 10,
          Math.floor(Math.random() * 90) + 10,
          Math.floor(Math.random() * 75) + 20,
          Math.floor(Math.random() * 80) + 15,
          Math.floor(Math.random() * 60) + 25
        ]);
      }, 120);
    } else {
      setAudioLevels([20, 20, 20, 20, 20, 20, 20]);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening]);

  // Pre-load synthesis voices on mount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const resetEngine = useCallback(() => {
    stopListening();
    stopSpeaking();
    setTranscript('');
    setResponse(null);
    setError(null);
    setIsProcessing(false);
  }, [stopListening, stopSpeaking]);

  return {
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
    speakResponse: speakText,
    stopSpeaking,
    resetEngine
  };
};

export default useBoloSakhiEngine;
