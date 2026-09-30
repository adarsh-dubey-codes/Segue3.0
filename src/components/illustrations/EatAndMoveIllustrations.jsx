import React from 'react';

// Girl stretching in yoga/workout wear illustration
export function GirlStretchingIllustration({ className = '' }) {
  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="yogaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE5EC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFF0F4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F57B9B" />
          <stop offset="100%" stopColor="#C23B68" />
        </linearGradient>
        <linearGradient id="leggingsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9E3B5C" />
          <stop offset="100%" stopColor="#6E243E" />
        </linearGradient>
      </defs>

      {/* Glow Circle background */}
      <circle cx="120" cy="120" r="100" fill="url(#yogaGlow)" />

      {/* Leaves Background */}
      <path d="M15 180 C0 140, 20 110, 40 90 C35 130, 40 160, 25 200 Z" fill="#7BA888" opacity="0.6" />
      <path d="M220 180 C240 140, 220 110, 200 90 C205 130, 200 160, 215 200 Z" fill="#7BA888" opacity="0.6" />

      {/* Soft Cushion Base */}
      <ellipse cx="120" cy="195" rx="80" ry="18" fill="#FFD1DC" opacity="0.7" />

      {/* Floating Heart */}
      <path
        d="M175 90 C175 90, 165 80, 165 74 C165 70, 169 67, 173 68 C176 69, 177 72, 177 72 C177 72, 178 69, 181 68 C185 67, 189 70, 189 74 C189 80, 175 90, 175 90 Z"
        fill="#F57B9B"
        opacity="0.8"
      />

      {/* Legs sitting cross-legged */}
      <path d="M65 185 C75 165, 110 160, 120 165 C130 160, 165 165, 175 185 Z" fill="url(#leggingsGrad)" />

      {/* Torso & Pink Workout Top */}
      <path d="M95 115 L145 115 L140 165 L100 165 Z" fill="url(#topGrad)" />
      <path d="M102 115 C110 125, 130 125, 138 115" stroke="#FDE0D2" strokeWidth="3" fill="none" />

      {/* Neck */}
      <rect x="113" y="90" width="14" height="26" rx="6" fill="#FDE0D2" />

      {/* Arms stretched overhead above head */}
      <path d="M95 118 C85 80, 100 35, 114 25" stroke="#FDE0D2" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M145 118 C155 80, 140 35, 126 25" stroke="#FDE0D2" strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* Top Clasp Hands */}
      <ellipse cx="120" cy="22" rx="10" ry="8" fill="#FDE0D2" />

      {/* Face & Head tilted slightly up with bliss */}
      <path d="M102 65 C102 45, 138 45, 138 65 C138 85, 130 95, 120 95 C110 95, 102 85, 102 65 Z" fill="#FDE0D2" />

      {/* Cheeks & Face Details */}
      <ellipse cx="110" cy="72" rx="5" ry="3" fill="#FFB3C6" opacity="0.7" />
      <ellipse cx="130" cy="72" rx="5" ry="3" fill="#FFB3C6" opacity="0.7" />
      {/* Eyes serene closed */}
      <path d="M108 66 C111 69, 114 69, 117 66" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M123 66 C126 69, 129 69, 132 66" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Gentle smile */}
      <path d="M116 80 C118 83, 122 83, 124 80" stroke="#C23B68" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Hair Top Bun & Strands */}
      <circle cx="120" cy="40" r="16" fill="#3E242B" />
      <path d="M102 60 C98 48, 110 42, 120 44 C130 42, 142 48, 138 60 Z" fill="#3E242B" />
      <path d="M102 60 C96 75, 98 90, 100 105" stroke="#3E242B" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Ovum / Egg Cell Graphic Illustration
export function OvumCellIllustration({ className = '' }) {
  return (
    <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" fill="#FFE5EC" />
      <circle cx="50" cy="50" r="36" fill="#FFF0F4" stroke="#F57B9B" strokeWidth="2.5" strokeDasharray="4 3" />
      <circle cx="50" cy="50" r="24" fill="#F57B9B" opacity="0.85" />
      <circle cx="44" cy="44" r="8" fill="#FFFFFF" opacity="0.9" />
      <circle cx="60" cy="54" r="3" fill="#FFFFFF" opacity="0.7" />
      {/* Radiating sparkles */}
      <circle cx="20" cy="30" r="2.5" fill="#C23B68" />
      <circle cx="80" cy="30" r="2" fill="#C23B68" />
      <circle cx="82" cy="70" r="3" fill="#C23B68" />
      <circle cx="18" cy="72" r="2" fill="#C23B68" />
    </svg>
  );
}

// Salad Bowl & Coconut Water Graphic
export function FoodSaladIllustration({ className = '' }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bowl */}
      <path d="M15 42 C15 62, 35 72, 55 72 C75 72, 85 62, 85 42 H15 Z" fill="#F87171" opacity="0.85" />
      {/* Salad toppings */}
      <circle cx="30" cy="38" r="8" fill="#4ADE80" />
      <circle cx="45" cy="35" r="9" fill="#FBBF24" />
      <circle cx="60" cy="37" r="7" fill="#FB7185" />
      <circle cx="72" cy="40" r="6" fill="#34D399" />
      <circle cx="50" cy="42" r="6" fill="#A78BFA" />

      {/* Drink Glass */}
      <rect x="75" y="20" width="18" height="35" rx="4" fill="#93C5FD" opacity="0.7" stroke="#60A5FA" strokeWidth="1.5" />
      <line x1="84" y1="12" x2="84" y2="35" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Prohibited sweets & alcohol graphic
export function AvoidSweetsIllustration({ className = '' }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Cupcake */}
      <rect x="20" y="45" width="24" height="22" rx="3" fill="#F472B6" />
      <path d="M16 45 C16 35, 24 30, 32 30 C40 30, 48 35, 48 45 Z" fill="#FBCFE8" />
      <circle cx="32" cy="27" r="4" fill="#EF4444" />

      {/* Wine Bottle */}
      <rect x="58" y="32" width="16" height="35" rx="3" fill="#A855F7" />
      <rect x="62" y="18" width="8" height="15" rx="2" fill="#A855F7" />

      {/* Red Ban Sign Overlay */}
      <circle cx="46" cy="42" r="32" stroke="#EF4444" strokeWidth="4" fill="none" />
      <line x1="24" y1="20" x2="68" y2="64" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// Dumbbells & Yoga Mat Graphic
export function FitnessDumbbellsIllustration({ className = '' }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Yoga Mat rolled */}
      <rect x="10" y="48" width="70" height="18" rx="9" fill="#EC738F" opacity="0.8" />
      <ellipse cx="80" cy="57" rx="6" ry="9" fill="#D9486D" />

      {/* Dumbbells */}
      <rect x="35" y="28" width="40" height="6" rx="3" fill="#94A3B8" />
      <rect x="30" y="20" width="10" height="22" rx="4" fill="#EC738F" />
      <rect x="70" y="20" width="10" height="22" rx="4" fill="#EC738F" />
    </svg>
  );
}

// Sleep Mask & Lavender Sprig Graphic
export function SleepMaskIllustration({ className = '' }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sleep Eye Mask */}
      <path d="M20 40 C20 28, 40 28, 50 36 C60 28, 80 28, 80 40 C80 54, 60 56, 50 48 C40 56, 20 54, 20 40 Z" fill="#F472B6" />
      {/* Lashes on mask */}
      <path d="M30 42 C33 46, 37 46, 40 42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M60 42 C63 46, 67 46, 70 42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Lavender Sprig */}
      <path d="M75 68 C82 55, 88 45, 92 30" stroke="#7BA888" strokeWidth="2" strokeLinecap="round" />
      <circle cx="92" cy="30" r="3.5" fill="#A855F7" />
      <circle cx="89" cy="36" r="3.5" fill="#C084FC" />
      <circle cx="85" cy="42" r="3.5" fill="#A855F7" />
      <circle cx="82" cy="48" r="3.5" fill="#C084FC" />
    </svg>
  );
}
