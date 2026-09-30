import React from 'react';

// Girl Mindful Care Artwork (Top Right Header of Vibes Page)
export function GirlMindfulCareIllustration({ className = '' }) {
  return (
    <svg
      width="220"
      height="180"
      viewBox="0 0 220 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="vibesGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE5EC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFF0F4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pinkTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F57B9B" />
          <stop offset="100%" stopColor="#C23B68" />
        </linearGradient>
      </defs>

      {/* Glow Circle */}
      <circle cx="120" cy="100" r="85" fill="url(#vibesGlow)" />

      {/* Leaves */}
      <path d="M15 150 C0 110, 20 80, 35 60 C30 100, 35 130, 20 170 Z" fill="#7BA888" opacity="0.65" />
      <circle cx="35" cy="55" r="7" fill="#FFB3C6" />
      <circle cx="35" cy="55" r="3" fill="#FFE382" />

      {/* Hair back */}
      <path d="M60 85 C50 115, 55 155, 70 195 L170 195 C185 155, 190 115, 180 85 C180 40, 60 40, 60 85 Z" fill="#3E242B" />

      {/* Shirt */}
      <path d="M75 115 C90 108, 120 105, 130 105 C140 105, 170 108, 185 115 L195 195 L65 195 Z" fill="url(#pinkTopGrad)" />

      {/* Neck */}
      <rect x="113" y="90" width="14" height="20" rx="5" fill="#FDE0D2" />

      {/* Face */}
      <path d="M92 65 C92 45, 148 45, 148 65 C148 90, 138 102, 120 102 C102 102, 92 90, 92 65 Z" fill="#FDE0D2" />

      {/* Cheeks & Eyes Serene Closed */}
      <ellipse cx="102" cy="75" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.7" />
      <ellipse cx="138" cy="75" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.7" />
      <path d="M99 68 C103 71, 107 71, 110 68" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M130 68 C134 71, 138 71, 141 68" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M116 85 C118 88, 122 88, 124 85" stroke="#C23B68" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Hair Bun & Locks */}
      <circle cx="120" cy="40" r="16" fill="#3E242B" />
      <path d="M92 60 C86 45, 102 38, 120 40 C138 38, 154 45, 148 60 Z" fill="#3E242B" />

      {/* Hands placed gently over chest heart */}
      <path d="M85 140 C95 130, 115 132, 125 138" stroke="#FDE0D2" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M155 140 C145 130, 125 132, 115 138" stroke="#FDE0D2" strokeWidth="8" strokeLinecap="round" fill="none" />

      {/* Floating Hearts */}
      <path d="M165 45 C165 45, 160 40, 160 37 C160 35, 162 33, 164 35 C166 33, 168 35, 168 37 C168 40, 165 45, 165 45 Z" fill="#EC738F" />
      <path d="M55 40 C55 40, 50 35, 50 32 C50 30, 52 28, 54 30 C56 28, 58 30, 58 32 C58 35, 55 40, 55 40 Z" fill="#EC738F" />
    </svg>
  );
}

// Lotus Flower Vector Icon
export function LotusFlowerIcon({ size = 20, color = '#EC738F', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 4C12 4 8 8 8 13C8 17.4 12 20 12 20C12 20 16 17.4 16 13C16 8 12 4 12 4Z" fill={color} />
      <path d="M12 8C12 8 6 11 4 15C2 19 6 20 8 20C10 20 12 18 12 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 8C12 8 18 11 20 15C22 19 18 20 16 20C14 20 12 18 12 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
