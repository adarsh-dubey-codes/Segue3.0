import React from 'react';

export default function SakhiAvatarSvg({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Soft Pink Badge Circle */}
      <circle cx="50" cy="50" r="48" fill="#FFE5EC" stroke="#FAD4DE" strokeWidth="2" />

      {/* Hair back */}
      <path d="M25 55 C20 70, 25 88, 32 98 L68 98 C75 88, 80 70, 75 55 C75 30, 25 30, 25 55 Z" fill="#3E242B" />

      {/* Shirt */}
      <path d="M30 78 C40 73, 60 73, 70 78 L78 98 L22 98 Z" fill="#F57B9B" />
      <path d="M42 75 C48 80, 52 80, 58 75" stroke="#FFA6BD" strokeWidth="2" fill="none" />

      {/* Neck */}
      <rect x="44" y="62" width="12" height="14" rx="4" fill="#FDE0D2" />

      {/* Face */}
      <path d="M34 48 C34 35, 66 35, 66 48 C66 65, 60 70, 50 70 C40 70, 34 65, 34 48 Z" fill="#FDE0D2" />

      {/* Cheeks */}
      <ellipse cx="40" cy="54" rx="4" ry="2.5" fill="#FFB3C6" opacity="0.8" />
      <ellipse cx="60" cy="54" rx="4" ry="2.5" fill="#FFB3C6" opacity="0.8" />

      {/* Eyes */}
      <circle cx="42" cy="49" r="2.5" fill="#3E242B" />
      <circle cx="58" cy="49" r="2.5" fill="#3E242B" />
      <circle cx="43" cy="48" r="1" fill="#FFFFFF" />
      <circle cx="59" cy="48" r="1" fill="#FFFFFF" />

      {/* Smile */}
      <path d="M47 59 C49 61, 51 61, 53 59" stroke="#EC738F" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Hair front locks & bangs */}
      <path d="M32 44 C30 32, 42 24, 50 26 C58 24, 70 32, 68 44 C66 36, 58 32, 50 34 C42 32, 34 36, 32 44 Z" fill="#3E242B" />
      <path d="M32 44 C28 55, 26 68, 30 82 C32 68, 36 56, 36 48 Z" fill="#3E242B" />
      <path d="M68 44 C72 55, 74 68, 70 82 C68 68, 64 56, 64 48 Z" fill="#3E242B" />

      {/* Small Pink Hairclip / Flower */}
      <circle cx="63" cy="36" r="3.5" fill="#EC738F" />
      <circle cx="63" cy="36" r="1.5" fill="#FFF3B0" />
    </svg>
  );
}
