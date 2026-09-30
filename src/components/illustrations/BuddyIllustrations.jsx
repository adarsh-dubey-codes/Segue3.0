import React from 'react';

// Night Sky Header Banner for Buddy Profile Card
export function NightSkyBannerIllustration({ className = '' }) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '110px',
        borderRadius: '20px 20px 0 0',
        background: 'linear-gradient(180deg, #2E1B4E 0%, #6B3BA7 55%, #E991BD 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 320 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Pink Clouds */}
        <path d="M-20 110 C20 70, 80 80, 110 110 Z" fill="#F472B6" opacity="0.35" />
        <path d="M200 110 C240 65, 300 80, 340 110 Z" fill="#F472B6" opacity="0.35" />

        {/* Twinkling Stars */}
        <path d="M40 25 L43 33 L51 36 L43 39 L40 47 L37 39 L29 36 L37 33 Z" fill="#FDE047" opacity="0.9" />
        <path d="M270 20 L272 26 L278 28 L272 30 L270 36 L268 30 L262 28 L268 26 Z" fill="#FDE047" opacity="0.9" />
        <path d="M110 20 L111 23 L114 24 L111 25 L110 28 L109 25 L106 24 L109 23 Z" fill="#FFFFFF" opacity="0.8" />
        <path d="M210 30 L211 33 L214 34 L211 35 L210 38 L209 35 L206 34 L209 33 Z" fill="#FFFFFF" opacity="0.8" />

        {/* Golden Cute Crescent Moon with Sleeping Face */}
        <g transform="translate(160, 48)">
          <path
            d="M-14 -22 C-14 -22, 10 -22, 18 0 C10 -6, -2 -6, -10 2 C-18 10 -16 20, -14 22 C-26 14, -28 -10, -14 -22 Z"
            fill="#FACC15"
          />
          {/* Closed Eyes */}
          <path d="M-6 -6 C-4 -3, -2 -3, 0 -6" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Cheeks */}
          <ellipse cx="-3" cy="2" rx="3" ry="2" fill="#F472B6" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

// Girl Holding Tea Artwork (Top Right Header of Buddy Page)
export function GirlBuddyHeaderIllustration({ className = '' }) {
  return (
    <svg
      width="200"
      height="180"
      viewBox="0 0 220 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="buddyHeaderGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE5EC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFF0F4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sweaterTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC738F" />
          <stop offset="100%" stopColor="#C23B68" />
        </linearGradient>
      </defs>

      {/* Glow */}
      <circle cx="120" cy="100" r="85" fill="url(#buddyHeaderGlow)" />

      {/* Leaves */}
      <path d="M15 150 C0 110, 20 80, 35 60 C30 100, 35 130, 20 170 Z" fill="#7BA888" opacity="0.65" />
      <circle cx="35" cy="55" r="7" fill="#FFB3C6" />
      <circle cx="35" cy="55" r="3" fill="#FFE382" />

      {/* Hair back */}
      <path d="M60 85 C50 115, 55 155, 70 195 L170 195 C185 155, 190 115, 180 85 C180 40, 60 40, 60 85 Z" fill="#3E242B" />

      {/* Sweater */}
      <path d="M75 115 C90 108, 120 105, 130 105 C140 105, 170 108, 185 115 L195 195 L65 195 Z" fill="url(#sweaterTopGrad)" />

      {/* Neck */}
      <rect x="113" y="90" width="14" height="20" rx="5" fill="#FDE0D2" />

      {/* Face */}
      <path d="M92 65 C92 45, 148 45, 148 65 C148 90, 138 102, 120 102 C102 102, 92 90, 92 65 Z" fill="#FDE0D2" />

      {/* Cheeks & Eyes */}
      <ellipse cx="102" cy="75" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.7" />
      <ellipse cx="138" cy="75" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.7" />
      <path d="M100 68 C104 71, 108 71, 111 68" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M129 68 C133 71, 137 71, 140 68" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M116 85 C118 88, 122 88, 124 85" stroke="#C23B68" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Hair Bun & Bangs */}
      <circle cx="120" cy="40" r="16" fill="#3E242B" />
      <path d="M92 60 C86 45, 102 38, 120 40 C138 38, 154 45, 148 60 Z" fill="#3E242B" />

      {/* Hands holding Tea Mug */}
      <rect x="105" y="132" width="30" height="34" rx="6" fill="#FFFFFF" stroke="#FAD4DE" strokeWidth="2" />
      <path d="M135 140 C142 140, 142 154, 135 154" stroke="#FAD4DE" strokeWidth="2.5" fill="none" />
      <path d="M120 132 C120 125, 114 120, 120 112" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

// Moon Avatar Graphic Badge
export function MoonAvatarBadge({ size = 44, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="30" cy="30" r="28" fill="#FFF0F4" stroke="#FAD4DE" strokeWidth="2" />
      <g transform="translate(30, 30)">
        <path d="M-8 -14 C-8 -14, 8 -14, 13 0 C8 -4, -1 -4, -7 2 C-13 8 -11 15 -9 16 C-18 10 -19 -7 -8 -14 Z" fill="#FACC15" />
        <path d="M-3 -3 C-2 -1, 0 -1, 1 -3" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <ellipse cx="-1" cy="2" rx="2" ry="1.2" fill="#F472B6" opacity="0.8" />
      </g>
    </svg>
  );
}
