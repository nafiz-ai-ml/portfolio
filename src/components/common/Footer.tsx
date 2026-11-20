'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUp, Terminal, FileText, Search } from 'lucide-react';
import { Magnet } from '@/components/animation/Magnet';
import { sound } from '@/lib/audio';

interface FooterProps {
  onOpenTerminal?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenResume?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerminal,
  onOpenCommandPalette,
  onOpenResume,
}) => {
  const [bdTime, setBdTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        setBdTime(now.toLocaleTimeString('en-US', options));
      } catch {
        setBdTime('');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-bg text-dark-text border-t border-dark-border py-12 px-6 sm:px-12 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand & Location */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-9 h-9 rounded-md overflow-hidden bg-brand flex-shrink-0">
              <Image
                src="/logo/mark.svg"
                alt="MN Mark"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-sans font-bold text-sm tracking-wide">
                MUHAMMAD NAFIZ
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="font-mono text-xs text-dark-muted">
                  Mymensingh, BD {bdTime && `// ${bdTime} BST (UTC+6)`}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Interactive Fast Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-dark-muted">
            <button
              type="button"
              onClick={() => {
                sound.playTick();
                onOpenCommandPalette?.();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-surface border border-dark-border hover:border-brand-tint hover:text-dark-text transition-colors"
            >
              <Search size={12} className="text-brand-tint" />
              <span>⌘K Palette</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playTick();
                onOpenTerminal?.();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-surface border border-dark-border hover:border-brand-tint hover:text-dark-text transition-colors"
            >
              <Terminal size={12} className="text-emerald-400" />
              <span>&gt;_ Terminal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playTick();
                onOpenResume?.();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-surface border border-dark-border hover:border-brand-tint hover:text-dark-text transition-colors"
            >
              <FileText size={12} className="text-purple-400" />
              <span>Resume (CV)</span>
            </button>
          </div>

          {/* Right: Back to Top */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-dark-muted">
              © 2026 Muhammad Nafiz
            </span>
            <Magnet strength={0.3}>
              <button
                type="button"
                onClick={scrollToTop}
                className="p-3 rounded-full border border-dark-border bg-dark-surface hover:bg-brand-tint hover:text-dark-bg transition-all duration-300 text-dark-text group shadow-md"
                aria-label="Back to Top"
              >
                <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
              </button>
            </Magnet>
          </div>
        </div>

        {/* Technical Attribution Note */}
        <div className="pt-6 border-t border-dark-border/40 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-dark-muted/70 gap-2">
          <span>Active &amp; building deep learning systems in Mymensingh, Bangladesh.</span>
          <span>Engineered with Next.js 15, TypeScript, Tailwind CSS, Lenis &amp; GSAP.</span>
        </div>
      </div>
    </footer>
  );
};
