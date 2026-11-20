'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, ExternalLink, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { sound } from '@/lib/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-white text-slate-900 shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header / Actions Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-brand">
                  Curriculum Vitae
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-600 font-medium">Muhammad Nafiz</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand text-white text-xs font-sans font-semibold shadow-sm hover:brightness-110 transition-all"
                >
                  <Printer size={14} />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Printable CV Document Content */}
            <div className="p-8 sm:p-12 overflow-y-auto space-y-8 font-sans">
              {/* Profile Header */}
              <div className="border-b border-slate-200 pb-6">
                <h2 className="text-3xl font-black tracking-tight text-slate-900">
                  Muhammad Nafiz
                </h2>
                <p className="text-base font-semibold text-brand mt-1">
                  Web Application Developer & Aspiring AI Engineer
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-3 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" />
                    Mymensingh, Bangladesh
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={13} className="text-slate-400" />
                    me@muhammadnafiz.dev
                  </span>
                  <span>muhammadnafiz.dev</span>
                  <span>github.com/nafiz-ai-ml</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Professional Profile
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Web application developer and founder building high-impact community platforms and modern SaaS tools. Strong foundation in full-stack web architecture, TypeScript, Next.js, and modern APIs. Successfully finished Python and Machine Learning fundamentals, and currently specializing in Deep Learning (Neural Networks, CNNs, PyTorch) with a direct roadmap toward AI Engineering.
                </p>
              </div>

              {/* Projects & Experience */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Key Projects & Systems Built
                </h3>

                <div className="space-y-5">
                  <div className="border-l-2 border-brand pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-slate-900">
                        RoktoFinder — Blood Donor Platform
                      </h4>
                      <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Live // roktofinder.com
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Next.js • TypeScript • Tailwind CSS • Geospatial / Area Filter
                    </p>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                      Founded and built a Bangla-first emergency blood donor network for Mymensingh in partnership with Al Fatih Islamic Pathagar. Features 1-click WhatsApp/Call connect, emergency blood posting, and instant donor directory search.
                    </p>
                  </div>

                  <div className="border-l-2 border-amber-400 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-slate-900">
                        JaniBD — Everyday SaaS & Learning Suite
                      </h4>
                      <span className="text-xs font-mono font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        In Development
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Next.js • SaaS Architecture • Interactive Web • Bangla-First
                    </p>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                      Everyday digital companion featuring utility tools, interactive quizzes and games, curated learning library, and a comprehensive Tech Skill Map with public shareable progress cards.
                    </p>
                  </div>

                  <div className="border-l-2 border-purple-400 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-slate-900">
                        Global SaaS Product
                      </h4>
                      <span className="text-xs font-mono font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                        In Active Build
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Full-Stack Architecture • Next.js • Cloud Services • Multi-Tenant
                    </p>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                      International SaaS platform being engineered with modern cloud infrastructure, focusing on high reliability, global latency standards, and scalable workflow automation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Skills Matrix */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Technical Stack & Competencies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">Web Development & Architecture</p>
                    <p className="text-slate-600 leading-relaxed font-mono">
                      TypeScript, Next.js (App Router), React 19, Tailwind CSS, GSAP, Framer Motion, Lenis, REST APIs, PostgreSQL, Node.js.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">AI, Machine Learning & Deep Learning</p>
                    <p className="text-slate-600 leading-relaxed font-mono">
                      Python, PyTorch, Scikit-Learn, NumPy, Pandas, Neural Networks, CNNs, Backpropagation. Roadmap: Transformers, NLP, AI Agents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
