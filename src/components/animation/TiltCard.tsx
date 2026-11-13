'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light';
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  theme = 'light',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchOrReduced(isTouch || isReduced);
  }, []);

  // Motion values for tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 260, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), springConfig);

  // Position for radial spotlight
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchOrReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    if (!isTouchOrReduced) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (isTouchOrReduced) {
    return (
      <div
        className={cn(
          'relative rounded-card transition-all duration-300',
          theme === 'light'
            ? 'bg-white border border-light-border shadow-sm'
            : 'bg-dark-surface border border-dark-border shadow-md',
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative rounded-card transition-shadow duration-300 overflow-hidden',
        theme === 'light'
          ? 'bg-white border border-light-border shadow-sm hover:shadow-xl hover:shadow-brand/5'
          : 'bg-dark-surface border border-dark-border shadow-lg hover:shadow-brand-tint/10',
        className
      )}
    >
      {/* Dynamic Cursor-Follow Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(118, 0, 255, 0.08), transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

