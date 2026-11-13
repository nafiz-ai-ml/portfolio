'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProjectIconConfig } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectIconTileProps {
  icon: ProjectIconConfig;
  className?: string;
}

export const ProjectIconTile: React.FC<ProjectIconTileProps> = ({ icon, className }) => {
  const getTileBg = () => {
    switch (icon.bgVariant) {
      case 'off-white':
        return 'bg-white text-dark-bg border border-light-border';
      case 'brand':
        return 'bg-brand text-white border border-brand/30';
      case 'dark':
      default:
        return 'bg-dark-surface text-brand-tint border border-brand-tint/20';
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        rotate: -1,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      className={cn(
        'relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-3 flex items-center justify-center shadow-xl shadow-black/15 animate-float select-none flex-shrink-0 cursor-pointer',
        getTileBg(),
        className
      )}
      style={{
        boxShadow:
          '0 20px 40px -12px rgba(20, 16, 28, 0.22), 0 0 0 1px rgba(20, 16, 28, 0.06)',
      }}
    >
      {icon.type === 'image' && icon.imageSrc ? (
        <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
          <Image
            src={icon.imageSrc}
            alt={icon.alt}
            fill
            sizes="96px"
            className="object-contain p-1"
          />
        </div>
      ) : (
        <span className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight">
          {icon.monogramText}
        </span>
      )}
    </motion.div>
  );
};

