'use client';

import React, { useState, useEffect } from 'react';
import { Preloader } from '@/components/sections/Preloader';
import { Navbar } from '@/components/common/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Projects } from '@/components/sections/Projects';
import { Journey } from '@/components/sections/Journey';
import { AiPlayground } from '@/components/sections/AiPlayground';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/common/Footer';

import { ToastProvider } from '@/context/ToastContext';
import { ToastContainer } from '@/components/common/ToastContainer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { TerminalModal } from '@/components/common/TerminalModal';
import { ResumeModal } from '@/components/common/ResumeModal';
import { CaseStudyModal } from '@/components/common/CaseStudyModal';
import { sound } from '@/lib/audio';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [caseStudyState, setCaseStudyState] = useState<{ isOpen: boolean; projectId: string }>({
    isOpen: false,
    projectId: 'roktofinder',
  });

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K, or Backquote for Terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playPop();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenCaseStudy = (projectId: string) => {
    sound.playPop();
    setCaseStudyState({ isOpen: true, projectId });
  };

  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-dark-bg selection:bg-brand selection:text-white">
        {/* Interactive MN Monogram Preloader */}
        <Preloader onComplete={() => setIsLoaded(true)} />

        {/* Adaptive Floating Navbar */}
        <Navbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Main Single-Page Narrative Flow */}
        <main className="relative z-0">
          <Hero isReady={isLoaded} />
          <Marquee />
          <Projects onOpenCaseStudy={handleOpenCaseStudy} />
          <Journey />
          <AiPlayground />
          <About />
          <Contact />
        </main>

        {/* Dark Footer with Live Clock */}
        <Footer
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Floating Toast Notification Layer */}
        <ToastContainer />

        {/* Command Palette Modal (Cmd+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCaseStudy={handleOpenCaseStudy}
        />

        {/* Interactive CLI Terminal Window */}
        <TerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />

        {/* Printable & Downloadable Curriculum Vitae Overview */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        {/* Deep Architectural Case Study Modal */}
        <CaseStudyModal
          isOpen={caseStudyState.isOpen}
          onClose={() => setCaseStudyState((prev) => ({ ...prev, isOpen: false }))}
          defaultProjectId={caseStudyState.projectId}
        />
      </div>
    </ToastProvider>
  );
}
