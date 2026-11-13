'use client';

import React from 'react';
import { siteConfig } from '@/data/site';

export const Marquee: React.FC = () => {
  const items = siteConfig.techStack;

  return (
    <section id="stack" className="relative py-12 bg-dark-bg text-dark-text border-t border-b border-dark-border overflow-hidden select-none z-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 mb-6">
        <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-dark-muted font-medium">
          <span className="inline-block w-6 h-[1.5px] bg-brand-tint rounded-full" />
          <span>Built With // Production Stack</span>
        </div>
      </div>

      {/* Infinite Seamless Ticker */}
      <div className="flex w-full overflow-hidden group">
        <div className="flex shrink-0 items-center justify-around gap-8 min-w-full animate-marquee group-hover:[animation-play-state:paused]">
          {items.concat(items).map((tech, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span className="font-sans font-bold text-lg sm:text-2xl tracking-tight text-dark-text/90 uppercase hover:text-brand-tint transition-colors">
                {tech}
              </span>
              <span className="text-brand-tint text-xs">◆</span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-around gap-8 min-w-full animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
          {items.concat(items).map((tech, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-8 shrink-0">
              <span className="font-sans font-bold text-lg sm:text-2xl tracking-tight text-dark-text/90 uppercase hover:text-brand-tint transition-colors">
                {tech}
              </span>
              <span className="text-brand-tint text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

