'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Terminal,
  FileText,
  Volume2,
  VolumeX,
  Copy,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '@/data/site';
import { sound } from '@/lib/audio';
import { useToast } from '@/context/ToastContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenCaseStudy: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenResume,
  onOpenCaseStudy,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    setIsAudioOn(sound.getEnabled());
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Actions list
  const actions = [
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      subtitle: 'me@muhammadnafiz.dev',
      category: 'Quick Action',
      icon: Copy,
      run: () => {
        navigator.clipboard.writeText('me@muhammadnafiz.dev');
        showToast('Copied me@muhammadnafiz.dev to clipboard!');
        onClose();
      },
    },
    {
      id: 'open-terminal',
      title: 'Open Interactive Terminal',
      subtitle: 'Interactive CLI easter egg',
      category: 'Tools',
      icon: Terminal,
      run: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: 'open-resume',
      title: 'View / Download Resume (CV)',
      subtitle: 'Printable executive overview',
      category: 'Tools',
      icon: FileText,
      run: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'case-study-rokto',
      title: 'RoktoFinder Architecture Flow',
      subtitle: 'Technical case study & geospatial flow',
      category: 'Projects',
      icon: Layers,
      run: () => {
        onClose();
        onOpenCaseStudy('roktofinder');
      },
    },
    {
      id: 'toggle-audio',
      title: isAudioOn ? 'Mute UI Sound Effects' : 'Enable UI Sound Effects',
      subtitle: 'Tactile audio feedback',
      category: 'Preferences',
      icon: isAudioOn ? VolumeX : Volume2,
      run: () => {
        const next = sound.toggle();
        setIsAudioOn(next);
        showToast(next ? 'Sound FX Enabled' : 'Sound FX Muted');
      },
    },
    {
      id: 'nav-projects',
      title: 'Jump to Selected Projects',
      subtitle: 'RoktoFinder, JaniBD, Global SaaS',
      category: 'Navigation',
      icon: ArrowRight,
      run: () => {
        onClose();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-journey',
      title: 'Jump to Engineering Journey',
      subtitle: 'Web dev to Deep Learning & AI Roadmap',
      category: 'Navigation',
      icon: ArrowRight,
      run: () => {
        onClose();
        document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-ai-lab',
      title: 'Jump to Interactive AI Lab',
      subtitle: '2D Neural Decision Boundary visualizer',
      category: 'Navigation',
      icon: Sparkles,
      run: () => {
        onClose();
        document.getElementById('ai-lab')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-about',
      title: 'Jump to About & Quick Facts',
      subtitle: 'Bio, facts matrix, background',
      category: 'Navigation',
      icon: ArrowRight,
      run: () => {
        onClose();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'open-github',
      title: 'GitHub Profile',
      subtitle: 'github.com/nafiz-ai-ml',
      category: 'External',
      icon: ExternalLink,
      run: () => {
        window.open('https://github.com/nafiz-ai-ml', '_blank');
        onClose();
      },
    },
    {
      id: 'open-linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'linkedin.com/in/nafiz-ai',
      category: 'External',
      icon: ExternalLink,
      run: () => {
        window.open('https://www.linkedin.com/in/nafiz-ai/', '_blank');
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sound.playTick();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sound.playTick();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        sound.playPop();
        filtered[selectedIndex].run();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl bg-dark-surface border border-brand/40 shadow-2xl overflow-hidden z-10 flex flex-col text-dark-text"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-border">
              <Search size={18} className="text-brand-tint shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent text-sm sm:text-base font-sans text-dark-text placeholder:text-dark-muted focus:outline-none"
              />
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-dark-muted bg-dark-bg border border-dark-border rounded">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-dark-muted">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((action, idx) => {
                  const Icon = action.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        action.run();
                      }}
                      onMouseEnter={() => {
                        setSelectedIndex(idx);
                        sound.playTick();
                      }}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150 ${
                        isSelected
                          ? 'bg-brand/20 text-white border border-brand/40'
                          : 'text-dark-text hover:bg-dark-bg/60 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-brand text-white'
                              : 'bg-dark-bg text-brand-tint border border-dark-border'
                          }`}
                        >
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-sans text-xs sm:text-sm font-semibold truncate">
                            {action.title}
                          </p>
                          <p className="font-mono text-[11px] text-dark-muted truncate">
                            {action.subtitle}
                          </p>
                        </div>
                      </div>

                      <span className="font-mono text-[10px] uppercase tracking-wider text-dark-muted shrink-0 hidden sm:inline">
                        {action.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-4 py-2 border-t border-dark-border bg-dark-bg/60 flex items-center justify-between text-[11px] font-mono text-dark-muted">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>Muhammad Nafiz Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
