'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface MaskedHeadlineProps {
  className?: string;
  isReady?: boolean;
}

export const MaskedHeadline: React.FC<MaskedHeadlineProps> = ({
  className,
  isReady = true,
}) => {
  // Exact specified headline:
  // "I'm Muhammad Nafiz. Web developer today, AI engineer in the making."
  // With "making." in Instrument Serif Italic in the accent tint (#a566ff).

  const words = [
    { text: "I'm", isAccent: false },
    { text: 'Muhammad', isAccent: false },
    { text: 'Nafiz.', isAccent: false },
    { text: 'Web', isAccent: false },
    { text: 'developer', isAccent: false },
    { text: 'today,', isAccent: false },
    { text: 'AI', isAccent: false },
    { text: 'engineer', isAccent: false },
    { text: 'in', isAccent: false },
    { text: 'the', isAccent: false },
    { text: 'making.', isAccent: true },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: '110%',
      rotate: 2,
      opacity: 0,
    },
    visible: {
      y: '0%',
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate={isReady ? 'visible' : 'hidden'}
      className={className}
    >
      {words.map((item, index) => (
        <span key={index} className="inline-block overflow-hidden py-1 mr-[0.28em] align-top">
          <motion.span
            variants={wordVariants}
            className={`inline-block ${
              item.isAccent
                ? 'font-serif italic font-normal text-brand-tint drop-shadow-[0_0_24px_rgba(165,102,255,0.4)]'
                : 'text-dark-text'
            }`}
          >
            {item.text}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};
