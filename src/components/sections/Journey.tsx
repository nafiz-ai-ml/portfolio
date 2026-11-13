'use client';

import React, { useRef, useEffect } from 'react';
import { siteConfig } from '@/data/site';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Badge } from '@/components/common/Badge';
import { ScrollRevealText } from '@/components/animation/ScrollRevealText';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export const Journey: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const milestones = siteConfig.journey.milestones;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    if (prefersReduced || isMobile || !containerRef.current || !leftColRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 12%',
        end: 'bottom 85%',
        pin: leftColRef.current,
        pinSpacing: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="bg-light-bg text-light-text py-24 px-6 sm:px-12 relative z-10 border-t border-light-border/60"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="The Progression"
          title="From web applications to intelligent agents."
          theme="light"
        />

        {/* Scroll-Linked Editorial Scrubbed Statement */}
        <div className="max-w-4xl mb-20">
          <ScrollRevealText
            text={siteConfig.journey.introStatement}
            theme="light"
          />
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          {/* Left Column: Pinned Anchor Information */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col items-start">
            <div className="p-6 rounded-card bg-white border border-light-border shadow-sm w-full">
              <span className="font-mono text-xs text-brand uppercase font-bold tracking-wider">
                Engineering Roadmap
              </span>
              <h3 className="font-sans font-bold text-2xl text-light-text mt-2 mb-3">
                Disciplined Progression
              </h3>
              <p className="text-sm text-light-muted leading-relaxed font-sans">
                Each milestone builds on solid engineering roots: from full-stack systems and agency delivery to machine learning fundamentals, deep neural architectures, and intelligent agents.
              </p>
            </div>
          </div>

          {/* Right Column: Scrolling Milestones with Vertical Progress Line */}
          <div className="lg:col-span-7 flex flex-col gap-10 relative pl-8 border-l-2 border-brand/20">
            {milestones.map((m, idx) => (
              <div
                key={m.phase}
                className="relative flex flex-col items-start bg-white p-6 sm:p-8 rounded-card border border-light-border shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Visual Node Marker on Line */}
                <div className="absolute -left-[41px] top-8 w-4 h-4 rounded-full bg-white border-4 border-brand shadow-sm" />

                <div className="flex flex-wrap items-center justify-between gap-3 w-full mb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand font-bold">
                    {m.phase}
                  </span>
                  <Badge status={m.status} label={m.statusLabel} theme="light" />
                </div>

                <h4 className="font-sans font-bold text-xl sm:text-2xl text-light-text tracking-tight mb-3">
                  {m.title}
                </h4>

                <p className="font-sans text-sm sm:text-base text-light-muted leading-relaxed mb-6">
                  {m.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {m.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-light-bg text-light-text border border-light-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

