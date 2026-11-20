'use client';

import React from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { useToast } from '@/context/ToastContext';
import { sound } from '@/lib/audio';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('me@muhammadnafiz.dev');
    setCopied(true);
    sound.playSuccess();
    showToast('Copied me@muhammadnafiz.dev to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="slant-light-to-dark bg-dark-bg text-dark-text pt-32 pb-24 px-6 sm:px-12 relative z-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-dark-muted font-medium mb-4">
            <span className="inline-block w-6 h-[1.5px] bg-brand-tint rounded-full" />
            <span>Let&apos;s Connect</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight leading-none text-dark-text">
            Say{' '}
            <span className="font-serif italic font-normal text-brand-tint drop-shadow-[0_0_24px_rgba(165,102,255,0.4)]">
              hello.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-dark-muted max-w-xl font-sans">
            Always open to discussing web application architecture, deep learning discoveries, collaboration opportunities, or community initiatives.
          </p>

          {/* 1-Click Copy Email Pill */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand/20 border border-brand/40 text-brand-tint hover:bg-brand hover:text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-md group"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="transition-transform group-hover:scale-110" />
                  <span>Copy me@muhammadnafiz.dev</span>
                </>
              )}
            </button>
            <span className="font-mono text-xs text-dark-muted hidden sm:inline">
              1-click direct copy
            </span>
          </div>
        </div>

        {/* Social Link Rows (Strictly no contact form) */}
        <div className="flex flex-col divide-y divide-dark-border border-t border-b border-dark-border mt-8">
          {siteConfig.socials.map((social) => {
            const isMailto = social.url.startsWith('mailto:');
            return (
              <a
                key={social.id}
                href={social.url}
                target={isMailto ? undefined : '_blank'}
                rel={isMailto ? undefined : 'noopener noreferrer'}
                className="py-7 sm:py-9 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group transition-colors duration-300 hover:bg-dark-surface/40 px-4 -mx-4 rounded-xl"
              >
                <span className="font-sans font-bold text-2xl sm:text-4xl tracking-tight text-dark-text group-hover:text-brand-tint transition-colors">
                  {social.label}
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm text-dark-muted group-hover:text-dark-text transition-colors">
                    {social.handle}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center transition-all duration-300 group-hover:border-brand-tint group-hover:bg-brand-tint group-hover:text-dark-bg text-dark-muted">
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
