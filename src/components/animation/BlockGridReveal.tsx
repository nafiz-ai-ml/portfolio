'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlockGridRevealProps {
  imageSrc: string;
  alt: string;
  isReady?: boolean;
}

export const BlockGridReveal: React.FC<BlockGridRevealProps> = ({
  imageSrc,
  alt,
  isReady = true,
}) => {
  const [isReduced, setIsReduced] = useState(false);
  const rows = 4;
  const cols = 4;
  const totalBlocks = rows * cols;

  useEffect(() => {
    setIsReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[340px] xl:max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-brand/20 border border-dark-border group">
      {/* Background Studio Glow */}
      <div className="absolute -inset-4 bg-brand/20 blur-2xl rounded-full opacity-60 pointer-events-none" />

      {/* Portrait Image with Grayscale to Color Transition */}
      <motion.div
        initial={{ filter: isReduced ? 'grayscale(0%)' : 'grayscale(100%)', scale: 1.05 }}
        animate={{
          filter: isReady ? 'grayscale(0%)' : 'grayscale(100%)',
          scale: isReady ? 1 : 1.05,
        }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Block-Grid Reveal Overlay */}
      {!isReduced && (
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none z-10">
          {Array.from({ length: totalBlocks }).map((_, i) => {
            const r = Math.floor(i / cols);
            const c = i % cols;
            // Calculate distance from center for radial wave reveal
            const dist = Math.sqrt(Math.pow(r - 1.5, 2) + Math.pow(c - 1.5, 2));

            return (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: isReady ? 0 : 1,
                  scale: isReady ? 0.8 : 1,
                }}
                transition={{
                  duration: 0.65,
                  delay: isReady ? 0.3 + dist * 0.08 : 0,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="bg-dark-bg/95 border border-dark-border/40"
              />
            );
          })}
        </div>
      )}

      {/* Decorative Monogram Accent Tag */}
      <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-full bg-dark-bg/85 backdrop-blur-md border border-dark-border flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-dark-text">
          Muhammad Nafiz // Founder
        </span>
      </div>
    </div>
  );
};
