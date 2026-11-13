'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Magnet } from '@/components/animation/Magnet';

// Real section ids in the real page order
const navItems = [
  { label: 'Stack', href: '#stack', id: 'stack' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Journey', href: '#journey', id: 'journey' },
  { label: 'About', href: '#about', id: 'about' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Measure section boundaries for precise theme switching
      const projectsEl = document.getElementById('projects');
      const contactEl = document.getElementById('contact');

      if (projectsEl && contactEl) {
        const pRect = projectsEl.getBoundingClientRect();
        const cRect = contactEl.getBoundingClientRect();

        // Switch to light mode when the top of the light section passes under navbar (50px)
        // and switch back to dark mode when contact section enters navbar (50px)
        if (pRect.top <= 50 && cRect.top > 50) {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section highlight on desktop nav
  useEffect(() => {
    const sectionIds = ['hero', 'stack', 'projects', 'journey', 'about', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, opts: { offset: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -30 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLight = theme === 'light';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8',
        isScrolled
          ? isLight
            ? 'bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm'
            : 'bg-[#0c0a12]/80 backdrop-blur-md border-b border-white/5 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Monogram */}
        <a
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, '#hero')}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-full py-1 px-1.5"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md overflow-hidden bg-brand shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo/mark.svg"
              alt="MN Mark"
              width={36}
              height={36}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span
            className={cn(
              'font-sans font-bold text-xs sm:text-sm tracking-wider transition-colors duration-300',
              isLight ? 'text-light-text' : 'text-dark-text'
            )}
          >
            MUHAMMAD <span className="font-normal opacity-80">NAFIZ</span>
          </span>
        </a>

        {/* Desktop Navigation Capsule (Hidden on mobile) */}
        <nav
          className={cn(
            'hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-md',
            isLight
              ? 'bg-white/95 border-light-border text-light-text shadow-black/5'
              : 'bg-dark-surface/90 border-dark-border text-dark-text shadow-black/20'
          )}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={cn(
                  'px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all duration-200',
                  isActive
                    ? isLight
                      ? 'bg-brand/10 text-brand font-bold'
                      : 'bg-white/10 text-brand-tint font-bold'
                    : isLight
                    ? 'text-light-muted hover:text-light-text hover:bg-light-surface-hover/70'
                    : 'text-dark-muted hover:text-dark-text hover:bg-dark-surface-hover/70'
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Contact CTA Button (Present on both mobile & desktop) */}
        <div className="flex items-center">
          <Magnet strength={0.25}>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className={cn(
                'inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase font-mono transition-all duration-300 shadow-md',
                isLight
                  ? 'bg-light-text text-white hover:bg-brand'
                  : 'bg-brand-tint text-dark-bg hover:bg-white hover:shadow-brand-tint/25'
              )}
            >
              <span>✦ Connect</span>
            </a>
          </Magnet>
        </div>
      </div>
    </header>
  );
};
