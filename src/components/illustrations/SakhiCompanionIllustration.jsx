import React from 'react';

export default function SakhiCompanionIllustration({ width = 200, height = 200, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Soft Pink Ambient Glow */}
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE3EA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFF0F4" stopOpacity="0" />
        </radialGradient>
        {/* Heart Gradient */}
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7597" />
          <stop offset="100%" stopColor="#E84A74" />
        </linearGradient>
        {/* Hair Gradient */}
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A343A" />
          <stop offset="100%" stopColor="#2E1C22" />
        </linearGradient>
        {/* Shirt Gradient */}
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA6BD" />
          <stop offset="100%" stopColor="#F57B9B" />
        </linearGradient>
      </defs>

      {/* Background soft glow */}
      <circle cx="120" cy="130" r="100" fill="url(#glowGrad)" />

      {/* Floral Leaves & Flowers (Bottom & Side frame) */}
      {/* Left Leaves */}
      <path d="M20 220 C10 180, 30 150, 45 130 C40 160, 45 190, 35 230 Z" fill="#6B9080" opacity="0.75" />
      <path d="M35 230 C20 200, 35 170, 55 150 C50 180, 55 200, 45 235 Z" fill="#A4C3B2" opacity="0.9" />
      {/* Right Leaves */}
      <path d="M220 220 C230 180, 210 150, 195 130 C200 160, 195 190, 205 230 Z" fill="#6B9080" opacity="0.75" />
      <path d="M205 230 C220 200, 205 170, 185 150 C190 180, 185 200, 195 235 Z" fill="#A4C3B2" opacity="0.9" />

      {/* Blossoming Pink Flowers */}
      {/* Left Flower */}
      <g transform="translate(35, 145) scale(0.7)">
        <circle cx="0" cy="-12" r="10" fill="#FFA6BD" opacity="0.9" />
        <circle cx="12" cy="0" r="10" fill="#FFA6BD" opacity="0.9" />
        <circle cx="0" cy="12" r="10" fill="#FFA6BD" opacity="0.9" />
        <circle cx="-12" cy="0" r="10" fill="#FFA6BD" opacity="0.9" />
        <circle cx="0" cy="0" r="7" fill="#FFF3B0" />
      </g>
      {/* Right Flower */}
      <g transform="translate(205, 145) scale(0.7)">
        <circle cx="0" cy="-12" r="10" fill="#FFA6BD" opacity="0.9" />
        <circle cx="12" cy="0" r="10" fill="#FFA6BD" opacity="0.9" />
        <circle cx="0" cy="12" r="10" fill="#FFA6BD" opacity="0.9" />
        <circle cx="-12" cy="0" r="10" fill="#FFA6BD" opacity="0.9" />
        <circle cx="0" cy="0" r="7" fill="#FFF3B0" />
      </g>
      {/* Small floating flower petals */}
      <circle cx="50" cy="110" r="4" fill="#FFC2D1" />
      <circle cx="190" cy="110" r="4" fill="#FFC2D1" />
      <circle cx="30" cy="90" r="3" fill="#FFB3C6" />
      <circle cx="210" cy="90" r="3" fill="#FFB3C6" />

      {/* Girl Illustration */}
      {/* Hair Behind */}
      <path
        d="M60 110 C50 140, 55 180, 70 230 L170 230 C185 180, 190 140, 180 110 C180 60, 60 60, 60 110 Z"
        fill="url(#hairGrad)"
      />

      {/* Neck */}
      <rect x="110" y="115" width="20" height="25" rx="6" fill="#FAD1C0" />

      {/* Shoulders & Top */}
      <path
        d="M75 140 C90 135, 110 132, 120 132 C130 132, 150 135, 165 140 L180 230 L60 230 Z"
        fill="url(#shirtGrad)"
      />

      {/* Collarline */}
      <path d="M102 135 C112 142, 128 142, 138 135" stroke="#F57B9B" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Face */}
      <path
        d="M92 88 C92 65, 148 65, 148 88 C148 115, 138 128, 120 128 C102 128, 92 115, 92 88 Z"
        fill="#FDE0D2"
      />

      {/* Cheeks */}
      <ellipse cx="102" cy="100" rx="7" ry="4" fill="#FFB3C6" opacity="0.6" />
      <ellipse cx="138" cy="100" rx="7" ry="4" fill="#FFB3C6" opacity="0.6" />

      {/* Eyes closed gently */}
      <path d="M99 92 C103 96, 107 96, 111 92" stroke="#4A343A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M129 92 C133 96, 137 96, 141 92" stroke="#4A343A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Eyebrows */}
      <path d="M98 86 C103 84, 108 85, 112 87" stroke="#3A242A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M128 87 C132 85, 137 84, 142 86" stroke="#3A242A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Gentle Smile */}
      <path d="M116 110 C118 113, 122 113, 124 110" stroke="#E84A74" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Hair Waves Front */}
      <path
        d="M90 80 C85 65, 105 52, 120 55 C140 52, 158 65, 152 85 C148 72, 135 68, 120 70 C105 68, 94 74, 90 80 Z"
        fill="url(#hairGrad)"
      />
      {/* Front locks draping over shoulders */}
      <path d="M90 80 C80 100, 75 130, 82 165 C85 130, 95 105, 96 90 Z" fill="url(#hairGrad)" />
      <path d="M150 80 C160 100, 165 130, 158 165 C155 130, 145 105, 144 90 Z" fill="url(#hairGrad)" />

      {/* Hair Flower */}
      <circle cx="145" cy="72" r="6" fill="#FFA6BD" />
      <circle cx="145" cy="72" r="2.5" fill="#FFF3B0" />

      {/* Hands holding the Heart at Chest */}
      {/* Arms */}
      <path d="M78 160 C85 180, 100 190, 112 185" stroke="#FDE0D2" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M162 160 C155 180, 140 190, 128 185" stroke="#FDE0D2" strokeWidth="10" strokeLinecap="round" fill="none" />

      {/* Large Soft Glow Heart in Hands */}
      <path
        d="M120 162 C120 162, 102 148, 102 138 C102 132, 108 128, 114 130 C118 132, 120 136, 120 136 C120 136, 122 132, 126 130 C132 128, 138 132, 138 138 C138 148, 120 162, 120 162 Z"
        fill="url(#heartGrad)"
        filter="drop-shadow(0px 4px 10px rgba(232, 74, 116, 0.4))"
      />

      {/* Hands holding heart front */}
      <path d="M102 155 C107 158, 112 155, 115 150" stroke="#FAD1C0" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M138 155 C133 158, 128 155, 125 150" stroke="#FAD1C0" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
