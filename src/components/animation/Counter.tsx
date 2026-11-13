'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  value: string;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayValue, setDisplayValue] = useState<string>('00');

  const numeric = parseInt(value, 10);
  const isNumber = !isNaN(numeric);

  useEffect(() => {
    if (!isInView) return;

    if (!isNumber) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200; // ms
    const steps = 30;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // easeOutExpo curve
      const current = Math.round(numeric * (progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)));
      // format with leading zero if needed
      setDisplayValue(current < 10 ? `0${current}` : `${current}`);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, isNumber, numeric, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {displayValue}
    </motion.span>
  );
};

