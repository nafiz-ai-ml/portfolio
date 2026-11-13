'use client';

import React, { useState } from 'react';
import { Preloader } from '@/components/sections/Preloader';
import { Navbar } from '@/components/common/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Projects } from '@/components/sections/Projects';
import { Journey } from '@/components/sections/Journey';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/common/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-dark-bg selection:bg-brand selection:text-white">
      {/* Interactive MN Monogram Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Adaptive Floating Navbar */}
      <Navbar />

      {/* Main Single-Page Narrative Flow */}
      <main className="relative z-0">
        <Hero isReady={isLoaded} />
        <Marquee />
        <Projects />
        <Journey />
        <About />
        <Contact />
      </main>

      {/* Dark Footer with Live Clock */}
      <Footer />
    </div>
  );
}

