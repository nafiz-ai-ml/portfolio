'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

const STORAGE_KEY = 'mn_portfolio_loader_seen';

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user has already seen loader this session OR prefers reduced motion
    const hasSeen = sessionStorage.getItem(STORAGE_KEY);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReduced) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    // 1.5 - 1.8s target duration
    // Increment smoothly from 0 to 100 over ~1.3s
    const startTime = Date.now();
    const targetDuration = 1350; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / targetDuration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 250);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.55, ease: [0.87, 0, 0.13, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-bg text-dark-text select-none"
        >
          <div className="flex flex-col items-center gap-5">
            {/* Monogram Mark */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-14 h-14 rounded-xl overflow-hidden bg-brand shadow-2xl shadow-brand/40 flex items-center justify-center"
            >
              <Image
                src="/logo/mark.svg"
                alt="Muhammad Nafiz Monogram"
                width={56}
                height={56}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>

            {/* Progress Percentage & Line */}
            <div className="w-52 flex flex-col gap-2">
              <div className="flex justify-between items-baseline font-mono text-xs">
                <span className="text-dark-muted tracking-widest uppercase">Initializing</span>
                <span className="text-brand-tint font-bold tabular-nums">{progress}%</span>
              </div>
              <div className="h-[2px] w-full bg-dark-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-tint transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="font-mono text-[10px] text-dark-muted/60 tracking-[0.2em] uppercase">
              Muhammad Nafiz // Portfolio
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
