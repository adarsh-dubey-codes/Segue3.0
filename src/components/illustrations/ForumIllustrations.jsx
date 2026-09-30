import React from 'react';

// Girl holding a warm tea mug artwork (Top Right Header)
export function GirlHoldingTeaIllustration({ className = '' }) {
  return (
    <svg
      width="220"
      height="200"
      viewBox="0 0 240 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="teaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE5EC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFF0F4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sweaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F57B9B" />
          <stop offset="100%" stopColor="#C23B68" />
        </linearGradient>
      </defs>

      {/* Background Glow */}
      <circle cx="130" cy="110" r="90" fill="url(#teaGlow)" />

      {/* Leaves & Flowers background */}
      <path d="M210 160 C230 130, 215 100, 200 80 C205 110, 200 135, 215 170 Z" fill="#7BA888" opacity="0.6" />
      <circle cx="215" cy="85" r="8" fill="#FFB3C6" />
      <circle cx="215" cy="85" r="3" fill="#FFE382" />

      {/* Girl hair back */}
      <path d="M70 100 C60 130, 65 170, 80 210 L180 210 C195 170, 200 130, 190 100 C190 50, 70 50, 70 100 Z" fill="#3E242B" />

      {/* Sweater */}
      <path d="M85 130 C100 122, 130 120, 140 120 C150 120, 180 122, 195 130 L205 210 L75 210 Z" fill="url(#sweaterGrad)" />

      {/* Neck */}
      <rect x="123" y="105" width="14" height="22" rx="5" fill="#FDE0D2" />

      {/* Face */}
      <path d="M102 75 C102 55, 158 55, 158 75 C158 100, 148 112, 130 112 C112 112, 102 100, 102 75 Z" fill="#FDE0D2" />

      {/* Face details */}
      <ellipse cx="112" cy="85" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.7" />
      <ellipse cx="148" cy="85" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.7" />
      <path d="M110 78 C114 81, 118 81, 121 78" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M139 78 C143 81, 147 81, 150 78" stroke="#3E242B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M126 95 C128 98, 132 98, 134 95" stroke="#C23B68" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Hair Bun & Front Locks */}
      <circle cx="130" cy="50" r="18" fill="#3E242B" />
      <path d="M102 70 C96 55, 112 48, 130 50 C148 48, 164 55, 158 70 Z" fill="#3E242B" />

      {/* Arms holding Mug */}
      <path d="M90 145 C95 170, 115 180, 125 175" stroke="#FDE0D2" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M170 145 C165 170, 145 180, 135 175" stroke="#FDE0D2" strokeWidth="10" strokeLinecap="round" fill="none" />

      {/* Mug in hands */}
      <rect x="115" y="152" width="30" height="34" rx="6" fill="#FFFFFF" stroke="#FAD4DE" strokeWidth="2" />
      <path d="M145 160 C152 160, 152 174, 145 174" stroke="#FAD4DE" strokeWidth="2.5" fill="none" />
      <path d="M130 152 C130 145, 124 140, 130 132" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

// Post 1 Card Illustration: Chamomile Tea & Hot Water Bottle
export function ChamomileHotWaterBottleIllustration({ className = '' }) {
  return (
    <div
      className={className}
      style={{
        width: '140px',
        height: '140px',
        borderRadius: '20px',
        backgroundColor: '#FFF0F4',
        border: '1px solid #FAD4DE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hot Water Bottle Bag (Pink/Red) */}
        <path d="M50 30 L74 30 C80 30, 84 34, 84 40 L84 82 C84 88, 80 92, 74 92 L50 92 C44 92, 40 88, 40 82 L40 40 C40 34, 44 30, 50 30 Z" fill="#F472B6" />
        <rect x="56" y="22" width="12" height="8" rx="2" fill="#E11D48" />
        <path d="M52 42 Q62 48 72 42 M52 56 Q62 62 72 56 M52 70 Q62 76 72 70" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Tea Mug (White with Heart) */}
        <rect x="18" y="48" width="36" height="40" rx="8" fill="#FFFFFF" stroke="#FAD4DE" strokeWidth="2.5" />
        <path d="M18 58 C10 58, 10 74, 18 74" stroke="#FAD4DE" strokeWidth="2.5" fill="none" />
        <path
          d="M36 68 C36 68, 30 62, 30 58 C30 55, 33 53, 36 55 C39 53, 42 55, 42 58 C42 62, 36 68, 36 68 Z"
          fill="#EC738F"
        />

        {/* Steam */}
        <path d="M30 44 C30 38, 25 35, 30 28" stroke="#EC738F" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M40 44 C40 38, 35 35, 40 28" stroke="#EC738F" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Chamomile Flower Accent */}
        <circle cx="20" cy="85" r="5" fill="#FFFFFF" stroke="#FAD4DE" />
        <circle cx="20" cy="85" r="2.5" fill="#FBBF24" />
        <circle cx="32" cy="90" r="5" fill="#FFFFFF" stroke="#FAD4DE" />
        <circle cx="32" cy="90" r="2.5" fill="#FBBF24" />
      </svg>
    </div>
  );
}

// Post 2 Card Illustration: Menstrual Cup
export function MenstrualCupIllustration({ className = '' }) {
  return (
    <div
      className={className}
      style={{
        width: '140px',
        height: '140px',
        borderRadius: '20px',
        backgroundColor: '#FAF5FF',
        border: '1px solid #E9D5FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft floating hearts around */}
        <path d="M24 35 C24 35, 20 30, 20 27 C20 25, 22 23, 24 25 C26 23, 28 25, 28 27 C28 30, 24 35, 24 35 Z" fill="#F472B6" />
        <path d="M84 40 C84 40, 80 35, 80 32 C80 30, 82 28, 84 30 C86 28, 88 30, 88 32 C88 35, 84 40, 84 40 Z" fill="#F472B6" />
        <path d="M86 70 C86 70, 82 65, 82 62 C82 60, 84 58, 86 60 C88 58, 90 60, 90 62 C90 65, 86 70, 86 70 Z" fill="#F472B6" />

        {/* Leaves */}
        <path d="M22 75 C15 70, 15 60, 25 55" stroke="#7BA888" strokeWidth="2" strokeLinecap="round" />
        <path d="M88 78 C95 72, 95 62, 85 58" stroke="#7BA888" strokeWidth="2" strokeLinecap="round" />

        {/* Menstrual Cup (Pink Cup) */}
        <path d="M35 32 C35 32, 38 68, 55 78 C72 68, 75 32, 75 32 Z" fill="#F472B6" stroke="#C084FC" strokeWidth="2" />
        <ellipse cx="55" cy="32" rx="20" ry="5" fill="#E9D5FF" stroke="#C084FC" strokeWidth="2" />
        <line x1="55" y1="78" x2="55" y2="92" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="55" cy="92" r="3" fill="#C084FC" />
      </svg>
    </div>
  );
}

// Post 3 Card Illustration: Starlight & Mood
export function LutealPhaseAnxietyIllustration({ className = '' }) {
  return (
    <div
      className={className}
      style={{
        width: '140px',
        height: '140px',
        borderRadius: '20px',
        backgroundColor: '#FFFBEB',
        border: '1px solid #FDE68A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="55" cy="55" r="36" fill="#FEF3C7" />
        <path d="M55 25 L60 45 L80 50 L60 55 L55 75 L50 55 L30 50 L50 45 Z" fill="#F59E0B" />
        <circle cx="35" cy="30" r="3" fill="#EC738F" />
        <circle cx="78" cy="72" r="4" fill="#EC738F" />
      </svg>
    </div>
  );
}
