/**
 * Centralized Sakhi Cycle Visual & Illustration Registry
 * 
 * Defines vector asset schemas, color accents, and SVG renderers
 * for low-literacy visual recognition across the entire app.
 */

export const ILLUSTRATION_REGISTRY = {
  // Feature Cards
  'feature.cycle': {
    symbol: '🩸 📅',
    color: '#EC738F',
    bg: '#FFF0F3',
    ariaLabel: 'My Cycle Tracker Visual'
  },
  'feature.mood': {
    symbol: '😊 🌺',
    color: '#E09F3E',
    bg: '#FEF9EF',
    ariaLabel: 'How I Feel Visual'
  },
  'feature.chat': {
    symbol: '💬 👩🏻‍💻',
    color: '#6C5CE7',
    bg: '#F3F0FF',
    ariaLabel: 'Talk to Sakhi Visual'
  },
  'feature.eat': {
    symbol: '🥗 🍎',
    color: '#4E9F76',
    bg: '#EFFFF6',
    ariaLabel: 'Eat Well Nutrition Visual'
  },
  'feature.move': {
    symbol: '🧘‍♀️ 😴',
    color: '#E85C7D',
    bg: '#FFF0F5',
    ariaLabel: 'Move and Rest Care Visual'
  },
  'feature.doctor': {
    symbol: '👩‍⚕️ 🩺',
    color: '#0984E3',
    bg: '#EBF7FF',
    ariaLabel: 'Find a Doctor Visual'
  },
  'feature.buddy': {
    symbol: '🫂 🤝',
    color: '#E84393',
    bg: '#FFF0F7',
    ariaLabel: 'Cycle Buddy Sisterhood Visual'
  },
  'feature.vibes': {
    symbol: '🎧 🎵',
    color: '#E09F3E',
    bg: '#FFFBF0',
    ariaLabel: 'Good Vibes Relaxation Visual'
  },
  'feature.water': {
    symbol: '💧 🥤',
    color: '#00CEC9',
    bg: '#E6FCFC',
    ariaLabel: 'Drink Water Hydration Visual'
  },

  // Cycle Phases Visual Progression: 🩸 → 🌱 → ☀️ → 🌙
  'phase.period': {
    symbol: '🩸',
    label: 'Period Phase',
    color: '#EC738F',
    bg: '#FFE5EC',
    ariaLabel: 'Period Phase Drop Visual'
  },
  'phase.follicular': {
    symbol: '🌱',
    label: 'Follicular Phase',
    color: '#4E9F76',
    bg: '#EFFFF6',
    ariaLabel: 'Follicular Growth Sprout Visual'
  },
  'phase.ovulation': {
    symbol: '☀️',
    label: 'Ovulation Phase',
    color: '#E09F3E',
    bg: '#FEF9EF',
    ariaLabel: 'Ovulation Peak Sun Visual'
  },
  'phase.luteal': {
    symbol: '🌙',
    label: 'Luteal Phase',
    color: '#6C5CE7',
    bg: '#F3F0FF',
    ariaLabel: 'Luteal Rest Moon Visual'
  },

  // Moods
  'mood.happy': { symbol: '😊', label: 'Happy', color: '#4E9F76' },
  'mood.okay': { symbol: '🙂', label: 'Okay', color: '#0984E3' },
  'mood.neutral': { symbol: '😐', label: 'Neutral', color: '#E09F3E' },
  'mood.low': { symbol: '😔', label: 'Low', color: '#8A6B75' },
  'mood.crampy': { symbol: '😣', label: 'Pain', color: '#EC738F' }
};

export default ILLUSTRATION_REGISTRY;
