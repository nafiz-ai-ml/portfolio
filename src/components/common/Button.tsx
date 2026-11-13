'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Magnet } from '@/components/animation/Magnet';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  theme?: 'dark' | 'light';
  href?: string;
  isExternal?: boolean;
  onClick?: () => void;
  className?: string;
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  theme = 'dark',
  href,
  isExternal = false,
  onClick,
  className,
  magnetic = true,
}) => {
  const isLight = theme === 'light';

  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-300 font-sans cursor-pointer group active:scale-95';

  const variantStyles =
    variant === 'primary'
      ? isLight
        ? 'bg-brand text-white shadow-lg shadow-brand/25 hover:shadow-brand/40 hover:scale-[1.03]'
        : 'bg-brand-tint text-dark-bg shadow-lg shadow-brand-tint/20 hover:shadow-brand-tint/35 hover:scale-[1.03]'
      : isLight
      ? 'bg-transparent text-light-text border border-light-text/20 hover:border-brand hover:text-brand'
      : 'bg-transparent text-dark-text border border-dark-text/20 hover:border-brand-tint hover:text-brand-tint';

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, opts: { offset: number }) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(target, { offset: -30 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    onClick?.();
  };

  const content = (
    <span className={cn(baseStyles, variantStyles, className)}>
      {children}
    </span>
  );

  const isAnchor = href?.startsWith('#');

  const wrapped = href ? (
    isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    ) : isAnchor ? (
      <a href={href} onClick={handleAnchorClick}>
        {content}
      </a>
    ) : (
      <Link href={href} onClick={onClick}>
        {content}
      </Link>
    )
  ) : (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );

  return magnetic ? <Magnet>{wrapped}</Magnet> : wrapped;
};
