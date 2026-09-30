import React from 'react';

// 1. Top Right Girl Stretching / Yoga Pose Illustration
export function GirlStretchingIllustration({ className = '' }) {
  return (
    <svg
      width="240"
      height="220"
      viewBox="0 0 240 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="yogaGlowBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFDEE6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFF0F4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="topBraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EE6E8D" />
          <stop offset="100%" stopColor="#C23B68" />
        </linearGradient>
        <linearGradient id="leggingsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A8325A" />
          <stop offset="100%" stopColor="#7E1D3F" />
        </linearGradient>
      </defs>

      {/* Soft Pink Background Radial Aura */}
      <circle cx="120" cy="110" r="95" fill="url(#yogaGlowBg)" />

      {/* Left Botanical Leaves */}
      <g opacity="0.85">
        <path d="M22 170 C10 135 25 105 42 85 C38 125 45 150 22 170 Z" fill="#6B9A7B" />
        <path d="M35 155 C20 130 38 110 50 95 C45 125 50 145 35 155 Z" fill="#88B898" />
        <path d="M12 140 C5 125 18 110 28 100 C24 120 25 132 12 140 Z" fill="#588567" />
      </g>

      {/* Right Botanical Leaves */}
      <g opacity="0.85">
        <path d="M218 170 C230 135 215 105 198 85 C202 125 195 150 218 170 Z" fill="#6B9A7B" />
        <path d="M205 155 C220 130 202 110 190 95 C195 125 190 145 205 155 Z" fill="#88B898" />
        <path d="M228 140 C235 125 222 110 212 100 C216 120 215 132 228 140 Z" fill="#588567" />
      </g>

      {/* Floating Outline Heart */}
      <path
        d="M165 72 C165 72, 158 64, 158 59 C158 55, 161 53, 165 54 C167 55, 168 57, 168 57 C168 57, 169 55, 172 54 C175 53, 178 55, 178 59 C178 64, 165 72, 165 72 Z"
        stroke="#F472B6"
        strokeWidth="1.8"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M68 62 C68 62, 63 56, 63 52 C63 49, 65 47, 68 48 C70 49, 71 50, 71 50 C71 50, 72 49, 74 48 C77 47, 79 49, 79 52 C79 56, 68 62, 68 62 Z"
        stroke="#F472B6"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />

      {/* Ground Shadow */}
      <ellipse cx="120" cy="190" rx="72" ry="12" fill="#E8B5C4" opacity="0.4" />

      {/* Cross-Legged Legs Pose */}
      <path
        d="M58 185 C68 162 105 158 120 162 C135 158 172 162 182 185 C165 192 135 190 120 188 C105 190 75 192 58 185 Z"
        fill="url(#leggingsGrad)"
      />
      {/* Leg Knee curves */}
      <path d="M58 185 C70 170 95 165 110 178" fill="none" stroke="#8E2346" strokeWidth="2" opacity="0.6" />
      <path d="M182 185 C170 170 145 165 130 178" fill="none" stroke="#8E2346" strokeWidth="2" opacity="0.6" />

      {/* Torso & Pink Workout Top */}
      <path d="M96 112 L144 112 L138 162 L102 162 Z" fill="url(#topBraGrad)" />
      {/* Top Neckline */}
      <path d="M102 112 C110 120 130 120 138 112" stroke="#FDE0D2" strokeWidth="3" fill="none" />

      {/* Neck */}
      <rect x="113" y="90" width="14" height="24" rx="6" fill="#FDE0D2" />

      {/* Raised Arms Stretched Overhead */}
      {/* Left arm */}
      <path d="M97 114 C85 78 98 38 115 26" stroke="#FDE0D2" strokeWidth="11" strokeLinecap="round" fill="none" />
      {/* Right arm */}
      <path d="M143 114 C155 78 142 38 125 26" stroke="#FDE0D2" strokeWidth="11" strokeLinecap="round" fill="none" />
      {/* Clasping Hands at top */}
      <ellipse cx="120" cy="24" rx="9" ry="7" fill="#FDE0D2" />

      {/* Head & Face (tilted up peacefully) */}
      <path d="M104 65 C104 46 136 46 136 65 C136 84 128 92 120 92 C112 92 104 84 104 65 Z" fill="#FDE0D2" />

      {/* Blush Cheeks */}
      <circle cx="111" cy="71" r="4.5" fill="#FFB3C6" opacity="0.75" />
      <circle cx="129" cy="71" r="4.5" fill="#FFB3C6" opacity="0.75" />

      {/* Eyes closed in bliss */}
      <path d="M109 65 C112 68 115 68 117 65" stroke="#3E242B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M123 65 C125 68 128 68 131 65" stroke="#3E242B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Gentle smiling mouth */}
      <path d="M117 78 C119 81 121 81 123 78" stroke="#C23B68" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Hair Bun & Bangs */}
      <circle cx="120" cy="42" r="15" fill="#3E242B" />
      <path d="M104 60 C100 48 110 44 120 45 C130 44 140 48 136 60 C128 54 112 54 104 60 Z" fill="#3E242B" />
    </svg>
  );
}

// 2. Ovum / Egg Cell Graphic (Main Card Left Illustration)
export function OvumCellIllustration({ className = '' }) {
  return (
    <svg width="105" height="105" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Soft Pink Glow */}
      <circle cx="58" cy="55" r="46" fill="#FFE5EC" opacity="0.8" />

      {/* Botanical leaves on left */}
      <g opacity="0.9">
        <path d="M16 65 C4 50 12 35 24 25 C22 42 28 55 16 65 Z" fill="#6B9A7B" />
        <path d="M22 75 C10 65 15 50 25 42 C26 55 28 65 22 75 Z" fill="#88B898" />
      </g>

      {/* Floating Sparkle Dots & Hearts */}
      <circle cx="28" cy="24" r="2.5" fill="#EC738F" />
      <circle cx="92" cy="28" r="2" fill="#EC738F" />
      <circle cx="96" cy="72" r="3" fill="#EC738F" />
      <circle cx="28" cy="85" r="2.5" fill="#EC738F" />
      <path
        d="M84 20 C84 20, 80 16, 80 13 C80 10, 82 9, 84 10 C85 11, 86 12, 86 12 C86 12, 87 11, 88 10 C90 9, 92 10, 92 13 C92 16, 84 20, 84 20 Z"
        fill="#F472B6" opacity="0.8"
      />

      {/* Cell Wall Dashed Circle */}
      <circle cx="58" cy="55" r="36" fill="#FFF0F4" stroke="#F57B9B" strokeWidth="2.5" strokeDasharray="5 3.5" />

      {/* Cell Nucleus Center */}
      <circle cx="58" cy="55" r="22" fill="#F57B9B" opacity="0.9" />
      <circle cx="52" cy="49" r="7" fill="#FFFFFF" opacity="0.95" />
      <circle cx="68" cy="60" r="3" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

// 3. Salad Bowl & Coconut Water Glass (Nourish Card)
export function FoodSaladIllustration({ className = '' }) {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background Mint Leaves */}
      <path d="M10 50 C2 35 15 25 25 20 C22 35 25 45 10 50 Z" fill="#88B898" opacity="0.8" />
      <path d="M95 55 C105 40 92 30 82 25 C85 40 82 50 95 55 Z" fill="#88B898" opacity="0.8" />

      {/* Salad Bowl Base */}
      <path d="M16 48 C16 70 36 82 58 82 C80 82 94 70 94 48 H16 Z" fill="#F87171" opacity="0.9" />
      <ellipse cx="55" cy="48" rx="39" ry="7" fill="#EF4444" opacity="0.9" />

      {/* Salad Veggies & Berries Overflowing */}
      <circle cx="32" cy="42" r="9" fill="#4ADE80" />
      <circle cx="46" cy="38" r="10" fill="#FBBF24" />
      <circle cx="62" cy="40" r="8" fill="#FB7185" />
      <circle cx="76" cy="44" r="7" fill="#34D399" />
      <circle cx="54" cy="46" r="7" fill="#A78BFA" />

      {/* Fruit Slices & Toppings */}
      <circle cx="40" cy="35" r="4" fill="#E11D48" />
      <circle cx="68" cy="36" r="3.5" fill="#3B82F6" />
      <circle cx="50" cy="32" r="3" fill="#15803D" />

      {/* Glass of Water / Coconut Water */}
      <rect x="80" y="24" width="20" height="38" rx="4" fill="#BFDBFE" opacity="0.8" stroke="#60A5FA" strokeWidth="1.5" />
      {/* Drink liquid level */}
      <rect x="82" y="32" width="16" height="28" rx="2" fill="#93C5FD" opacity="0.9" />
      {/* Pink Straw */}
      <line x1="90" y1="12" x2="90" y2="40" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// 4. Prohibited Sweets & Wine (Minimize or Avoid Card)
export function AvoidSweetsIllustration({ className = '' }) {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g opacity="0.9">
        {/* Cupcake */}
        <path d="M22 52 L26 76 H46 L50 52 Z" fill="#F472B6" />
        <path d="M18 52 C18 40 26 34 36 34 C46 34 54 40 54 52 Z" fill="#FBCFE8" />
        <circle cx="36" cy="31" r="4.5" fill="#EF4444" />

        {/* Wine Bottle */}
        <rect x="62" y="38" width="18" height="38" rx="3" fill="#9333EA" />
        <rect x="67" y="24" width="8" height="16" rx="2" fill="#9333EA" />
        <rect x="68" y="20" width="6" height="5" rx="1.5" fill="#F3E8FF" />

        {/* Wine Glass */}
        <path d="M85 48 C85 58 98 58 98 48 Z" fill="#C084FC" opacity="0.8" />
        <line x1="91.5" y1="58" x2="91.5" y2="74" stroke="#9333EA" strokeWidth="2.5" />
        <line x1="85" y1="74" x2="98" y2="74" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Bold Prohibition / Ban Sign Overlay 🚫 */}
      <circle cx="56" cy="48" r="36" stroke="#EF4444" strokeWidth="4.5" fill="none" />
      <line x1="30" y1="22" x2="82" y2="74" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

// 5. Dumbbells & Yoga Mat (Movement & Fitness Card)
export function FitnessDumbbellsIllustration({ className = '' }) {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background Leaves */}
      <path d="M12 40 C4 28 15 18 24 14 C22 28 25 36 12 40 Z" fill="#88B898" opacity="0.8" />

      {/* Rolled Yoga Mat */}
      <rect x="14" y="54" width="76" height="20" rx="10" fill="#EC738F" opacity="0.9" />
      <ellipse cx="90" cy="64" rx="7" ry="10" fill="#BE185D" />
      <ellipse cx="90" cy="64" rx="4" ry="6" fill="#9D174D" />

      {/* Dumbbell 1 */}
      <rect x="42" y="32" width="44" height="7" rx="3.5" fill="#94A3B8" />
      <rect x="36" y="24" width="10" height="23" rx="4" fill="#F472B6" />
      <rect x="80" y="24" width="10" height="23" rx="4" fill="#F472B6" />

      {/* Dumbbell 2 (slightly offset) */}
      <rect x="24" y="20" width="36" height="6" rx="3" fill="#CBD5E1" />
      <rect x="19" y="14" width="8" height="18" rx="3" fill="#EC738F" />
      <rect x="56" y="14" width="8" height="18" rx="3" fill="#EC738F" />
    </svg>
  );
}

// 6. Sleep Mask & Lavender Sprig (Rest & Self-Care Card)
export function SleepMaskIllustration({ className = '' }) {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sleep Mask Base */}
      <path
        d="M22 45 C22 31 44 31 55 40 C66 31 88 31 88 45 C88 60 66 62 55 53 C44 62 22 60 22 45 Z"
        fill="#F472B6"
      />
      {/* Sleep Mask Strap */}
      <path d="M12 45 C18 45 24 45 24 45" stroke="#EC738F" strokeWidth="4" strokeLinecap="round" />
      <path d="M86 45 C92 45 98 45 98 45" stroke="#EC738F" strokeWidth="4" strokeLinecap="round" />

      {/* Sleeping Eyelashes on Mask */}
      <path d="M33 46 C36 50 40 50 43 46" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M67 46 C70 50 74 50 77 46" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Heart Detail on Mask Center */}
      <path
        d="M55 46 C55 46, 52 43, 52 41 C52 39, 53.5 38, 55 39 C56.5 38, 58 39, 58 41 C58 43, 55 46, 55 46 Z"
        fill="#FFFFFF" opacity="0.9"
      />

      {/* Lavender Flower Stem & Purple Buds */}
      <g opacity="0.9">
        <path d="M78 78 C86 64 92 52 98 34" stroke="#6B9A7B" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="98" cy="34" r="4" fill="#9333EA" />
        <circle cx="94" cy="41" r="4" fill="#C084FC" />
        <circle cx="90" cy="48" r="4" fill="#9333EA" />
        <circle cx="86" cy="55" r="4" fill="#C084FC" />
        <circle cx="82" cy="62" r="3.5" fill="#9333EA" />
      </g>
    </svg>
  );
}

