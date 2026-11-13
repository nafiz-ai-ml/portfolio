'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import { Magnet } from '@/components/animation/Magnet';

export const Footer: React.FC = () => {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-bg text-dark-text border-t border-dark-border py-12 px-6 sm:px-12 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand & Location */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="relative w-8 h-8 rounded-md overflow-hidden bg-brand flex-shrink-0">
            <Image
              src="/logo/mark.svg"
              alt="MN Mark"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-sans font-bold text-sm tracking-wide">
              MUHAMMAD NAFIZ
            </p>
            <p className="font-mono text-xs text-dark-muted">
              Mymensingh, Bangladesh {bdTime && `// ${bdTime} (UTC+6)`}
            </p>
          </div>
        </div>

        {/* Center: Technical Credits */}
        <p className="font-mono text-xs text-dark-muted/80 text-center max-w-sm">
          Engineered with Next.js, TypeScript, Tailwind CSS, Lenis & GSAP. Built for real utility.
        </p>

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
    </footer>
  );
};

