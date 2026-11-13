'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface ScrollRevealTextProps {
  text: string;
  theme?: 'dark' | 'light';
  className?: string;
  accentWords?: string[];
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  theme = 'light',
  className,
  accentWords = ['Deep Learning', 'AI agents', 'RoktoFinder', 'JaniBD', 'first principles'],
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  wordsRef.current = [];
  const [isReduced, setIsReduced] = useState(false);

  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReduced(prefersReduced);

    if (prefersReduced || !containerRef.current || wordsRef.current.length === 0) {
      wordsRef.current.forEach((word) => {
        if (word) word.style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Must be fully solid before the paragraph passes the vertical center (50%) of the viewport
      gsap.fromTo(
        wordsRef.current,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'center 50%',
            scrub: 0.4,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = text.split(' ');
  const isLight = theme === 'light';

  return (
    <p
      ref={containerRef}
      className={cn(
        'text-2xl sm:text-3xl md:text-4xl font-sans font-medium leading-[1.35] tracking-tight',
        isLight ? 'text-light-text' : 'text-dark-text',
        className
      )}
    >
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z]/g, '');
        const isAccent = accentWords.some((aw) =>
          cleanWord.toLowerCase().includes(aw.toLowerCase())
        );

        return (
          <span
            key={i}
            ref={addToRefs}
            className={cn(
              'inline-block transition-opacity mr-[0.25em]',
              isAccent && (isLight ? 'text-brand font-semibold' : 'text-brand-tint font-semibold')
            )}
            style={{ opacity: isReduced ? 1 : 0.15 }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};
