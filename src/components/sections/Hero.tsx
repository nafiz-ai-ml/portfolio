'use client';

import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { MaskedHeadline } from '@/components/animation/MaskedText';
import { BlockGridReveal } from '@/components/animation/BlockGridReveal';
import { Counter } from '@/components/animation/Counter';
import { Button } from '@/components/common/Button';

interface HeroProps {
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isReady = true }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-6 sm:px-12 bg-dark-bg text-dark-text overflow-hidden z-0"
    >
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-brand-tint/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Narrative, Headline, & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Overline Label with Thin Leading Line */}
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-dark-muted font-medium mb-2.5">
              <span className="inline-block w-6 h-[1.5px] bg-brand-tint rounded-full" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Web App Developer & Founder — Mymensingh, BD</span>
            </div>

            {/* Main Masked Headline: Clamped to fit max 4 lines at 1280x600 */}
            <MaskedHeadline
              isReady={isReady}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-sans font-bold tracking-tight text-dark-text leading-[1.08] mb-2.5"
            />

            {/* Sub-headline */}
            <h2 className="text-base sm:text-lg md:text-xl font-sans font-medium text-brand-tint mb-2.5 tracking-tight">
              {siteConfig.subTagline}
            </h2>

            {/* Concrete, Grounded Narrative */}
            <p className="text-xs sm:text-sm md:text-base text-dark-muted leading-relaxed max-w-lg mb-5 font-sans">
              I build community web platforms and practical digital tools from Mymensingh, Bangladesh. With Python and Machine Learning foundations complete, I am learning Deep Learning to build intelligent software.
            </p>

            {/* Dual CTA Buttons - Visible above 600px */}
            <div className="flex flex-wrap items-center gap-3">
              <Button href="#projects" variant="primary" theme="dark" className="px-5 py-2.5 text-xs sm:text-sm">
                <span>Explore Projects</span>
                <ArrowDown size={14} />
              </Button>
              <Button
                href="https://designangle.xyz"
                isExternal
                variant="secondary"
                theme="dark"
                className="px-5 py-2.5 text-xs sm:text-sm"
              >
                <span>DesignAngle Agency</span>
                <ArrowUpRight size={14} />
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Portrait sized for compact screens */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <BlockGridReveal
              imageSrc="/images/nafiz.png"
              alt="Muhammad Nafiz"
              isReady={isReady}
            />
          </div>
        </div>

        {/* Three Honest Stat-Style Facts */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-dark-border grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <Counter
                  value={stat.value}
                  className="font-sans font-extrabold text-2xl sm:text-3xl text-dark-text tracking-tight"
                />
                <span className="font-mono text-xs text-brand-tint tracking-wider uppercase font-semibold">
                  {stat.label}:
                </span>
                <span className="font-sans text-xs sm:text-sm font-medium text-dark-text">
                  {stat.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
