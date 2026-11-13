'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Badge } from '@/components/common/Badge';
import { TiltCard } from '@/components/animation/TiltCard';
import { ProjectIconTile } from '@/components/animation/ProjectIconTile';
import { Button } from '@/components/common/Button';

export const Projects: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const roktofinder = siteConfig.projects.find((p) => p.id === 'roktofinder')!;
  const janibd = siteConfig.projects.find((p) => p.id === 'janibd')!;
  const designangle = siteConfig.projects.find((p) => p.id === 'designangle')!;

  return (
    <section
      id="projects"
      className="slant-dark-to-light bg-light-bg text-light-text pt-28 pb-24 px-6 sm:px-12 relative"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Selected Work"
          title="Platforms built for real utility."
          description="Every project addresses a real need—from emergency blood donation in Mymensingh to everyday SaaS tools and agency client delivery."
          theme="light"
        />

        <div className="flex flex-col gap-16">
          {/* Project 1: RoktoFinder (Live Community Platform) */}
          <TiltCard theme="light" className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <div className="flex items-center gap-4 mb-6">
                  <ProjectIconTile icon={roktofinder.icon} />
                  <div>
                    <Badge status="live" label={roktofinder.statusLabel} theme="light" />
                    <h3 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-light-text mt-1">
                      {roktofinder.title}
                    </h3>
                  </div>
                </div>

                <p className="font-mono text-xs uppercase tracking-wider text-light-muted mb-4 font-semibold">
                  {roktofinder.subtitle}
                </p>

                <p className="text-base text-light-muted leading-relaxed mb-4">
                  {roktofinder.description}
                </p>

                {roktofinder.communityContext && (
                  <div className="p-4 rounded-inner bg-purple-50/70 border border-purple-200/60 mb-6 text-xs text-light-muted leading-relaxed">
                    <span className="font-semibold text-brand">Community initiative:</span>{' '}
                    {roktofinder.communityContext}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {roktofinder.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-light-bg text-light-text border border-light-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  href={roktofinder.url}
                  isExternal
                  variant="primary"
                  theme="light"
                >
                  <span>Visit Platform</span>
                  <ArrowUpRight size={16} />
                </Button>
              </div>

              {/* Right Column: Screenshot Showcase */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-light-border bg-slate-100 shadow-md">
                  <Image
                    src={roktofinder.images[activeImageIndex] || roktofinder.images[0]}
                    alt={`RoktoFinder Screenshot ${activeImageIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-3">
                  {roktofinder.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-brand scale-95 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="120px"
                        className="object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Project 2: JaniBD (In Development, NOT Live) */}
          <TiltCard theme="light" className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col items-start">
                <div className="flex items-center gap-4 mb-6">
                  <ProjectIconTile icon={janibd.icon} />
                  <div>
                    <Badge status="in-development" label={janibd.statusLabel} theme="light" />
                    <h3 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-light-text mt-1">
                      {janibd.title}
                    </h3>
                  </div>
                </div>

                <div className="inline-block px-3 py-1 rounded-md bg-amber-100/60 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  Tagline: &quot;Your everyday digital companion.&quot;
                </div>

                <p className="font-mono text-xs uppercase tracking-wider text-light-muted mb-4 font-semibold">
                  {janibd.subtitle}
                </p>

                <p className="text-base text-light-muted leading-relaxed mb-6">
                  {janibd.description}
                </p>

                {/* Modules list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mb-6">
                  {[
                    'Everyday utility tools',
                    'Interactive quizzes & games',
                    'Curated learning library',
                    'Bangladesh discovery guide',
                    'Tech Skill Map',
                    'Shareable progress cards',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs font-sans text-light-text">
                      <CheckCircle2 size={14} className="text-brand shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {janibd.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-light-bg text-light-text border border-light-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Distinct In-Development Preview Card (No repeated copy) */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-dashed border-amber-300 bg-gradient-to-br from-purple-50 via-amber-50/40 to-white flex flex-col items-center justify-center p-8 text-center shadow-inner">
                  <div className="w-16 h-16 rounded-2xl bg-brand text-white flex items-center justify-center font-sans font-black text-2xl shadow-lg shadow-brand/20 mb-4 animate-bounce">
                    JB
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-bold bg-amber-200/60 px-3 py-1 rounded-full mb-2">
                    In Active Development
                  </span>
                  <p className="font-sans text-sm text-light-muted max-w-sm">
                    Interactive SaaS suite for Bangladesh: utility tools, learning library, quizzes, and Tech Skill Map.
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Project 3: DesignAngle (Agency) */}
          <TiltCard theme="light" className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="flex items-center gap-4 mb-6">
                  <ProjectIconTile icon={designangle.icon} />
                  <div>
                    <Badge status="agency" label={designangle.statusLabel} theme="light" />
                    <h3 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-light-text mt-1">
                      {designangle.title}
                    </h3>
                  </div>
                </div>

                <p className="font-mono text-xs uppercase tracking-wider text-light-muted mb-4 font-semibold">
                  {designangle.subtitle}
                </p>

                <p className="text-base text-light-muted leading-relaxed mb-6">
                  {designangle.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {designangle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-light-bg text-light-text border border-light-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  href={designangle.url}
                  isExternal
                  variant="primary"
                  theme="light"
                >
                  <span>Visit Agency</span>
                  <ArrowUpRight size={16} />
                </Button>
              </div>

              {/* Right: Studio Aesthetic Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full aspect-[4/3] rounded-2xl bg-dark-bg p-8 flex flex-col justify-between text-dark-text border border-dark-border shadow-xl">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-brand-tint tracking-widest uppercase">
                      Agency & Studio
                    </span>
                    <Layers size={20} className="text-brand-tint" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-2xl text-white">DesignAngle</h4>
                    <p className="text-xs text-dark-muted font-mono mt-1">designangle.xyz</p>
                  </div>
                  <p className="text-xs text-dark-muted leading-relaxed">
                    Crafting bespoke digital interfaces and modern web architectures for forward-thinking products.
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
