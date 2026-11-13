'use client';

import React from 'react';
import { siteConfig } from '@/data/site';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ScrollRevealText } from '@/components/animation/ScrollRevealText';

export const About: React.FC = () => {
  const { statement, bio, facts } = siteConfig.about;

  return (
    <section
      id="about"
      className="bg-light-bg text-light-text py-24 px-6 sm:px-12 relative z-10 border-t border-light-border/60"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Background & Ethos"
          title="Building with practical intent and curiosity."
          theme="light"
        />

        {/* Scroll-Linked Editorial Statement */}
        <div className="max-w-4xl mb-14">
          <ScrollRevealText text={statement} theme="light" />
        </div>

        {/* First-person Grounded Bio */}
        <div className="max-w-3xl mb-14 text-base sm:text-lg text-light-muted leading-relaxed font-sans">
          <p>{bio}</p>
        </div>

        {/* Quick Facts Table (Plain status labels, No "Source: Direct Context") */}
        <div className="bg-white rounded-card border border-light-border overflow-hidden shadow-sm">
          <div className="px-6 sm:px-8 py-4 border-b border-light-border bg-light-surface flex items-center justify-between">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand font-bold">
              Quick facts
            </h3>
            <span className="font-mono text-xs text-light-muted">
              Muhammad Nafiz // Overview
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-light-border text-xs font-mono uppercase text-light-muted bg-light-bg/50">
                  <th className="py-3 px-6 sm:px-8 font-semibold">Parameter</th>
                  <th className="py-3 px-6 sm:px-8 font-semibold">Detail</th>
                  <th className="py-3 px-6 sm:px-8 font-semibold hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border text-sm font-sans">
                {facts.map((fact, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-light-bg/60 transition-colors"
                  >
                    <td className="py-3.5 px-6 sm:px-8 font-semibold text-light-text whitespace-nowrap">
                      {fact.label}
                    </td>
                    <td className="py-3.5 px-6 sm:px-8 text-light-muted">
                      {fact.value}
                    </td>
                    <td className="py-3.5 px-6 sm:px-8 font-mono text-xs text-brand font-medium hidden md:table-cell">
                      {fact.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
