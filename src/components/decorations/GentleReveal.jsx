import React from 'react';
import { motion } from 'framer-motion';

/**
 * Sakhi GentleReveal Component
 * Applies soft entrance reveal animations as content enters viewport.
 * Duration: 500-800ms
 * Respects prefers-reduced-motion.
 */

export default function GentleReveal({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 14,
  className = '',
  style = {}
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
