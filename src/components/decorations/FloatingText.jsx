import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Sakhi Floating Text Micro-copy Component
 * Displays gentle floating affirmations in whitespace areas.
 * Localized using i18n.
 */

export default function FloatingText({
  phraseKey = 'breathe',
  defaultText = 'breathe ♡',
  top,
  left,
  right,
  bottom,
  color = '#EC738F',
  opacity = 0.55,
  duration = 8,
  delay = 0,
  style = {}
}) {
  const { t } = useLanguage();

  const text = t(`common.floatingPhrases.${phraseKey}`, { defaultValue: defaultText });

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        fontFamily: "'Caveat', 'Dancing Script', 'Playfair Display', cursive, serif",
        fontSize: '1.15rem',
        fontWeight: '600',
        color,
        opacity,
        pointerEvents: 'none',
        zIndex: 1,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        animation: `floatingPhraseMotion ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        letterSpacing: '0.02em',
        ...style
      }}
    >
      {text}
    </div>
  );
}
