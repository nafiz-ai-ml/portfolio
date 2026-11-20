'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Layers, Users, PhoneCall, ShieldCheck, Database, Server } from 'lucide-react';
import { sound } from '@/lib/audio';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectId?: string;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  onClose,
  defaultProjectId = 'roktofinder',
}) => {
  const [activeTab, setActiveTab] = useState<'roktofinder' | 'janibd' | 'globalsaas'>('roktofinder');

  React.useEffect(() => {
    if (defaultProjectId === 'janibd') setActiveTab('janibd');
    else if (defaultProjectId === 'global-saas') setActiveTab('globalsaas');
    else setActiveTab('roktofinder');
  }, [defaultProjectId, isOpen]);

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
            className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-dark-surface border border-brand/50 text-dark-text shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header with Project Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-dark-bg border-b border-dark-border">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-brand-tint">
                  Architecture &amp; Case Study
                </span>
              </div>

              {/* Project Tabs */}
              <div className="flex items-center gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border text-xs font-mono">
                <button
                  type="button"
                  onClick={() => {
                    sound.playTick();
                    setActiveTab('roktofinder');
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    activeTab === 'roktofinder'
                      ? 'bg-brand text-white font-bold'
                      : 'text-dark-muted hover:text-dark-text'
                  }`}
                >
                  RoktoFinder
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playTick();
                    setActiveTab('janibd');
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    activeTab === 'janibd'
                      ? 'bg-brand text-white font-bold'
                      : 'text-dark-muted hover:text-dark-text'
                  }`}
                >
                  JaniBD
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playTick();
                    setActiveTab('globalsaas');
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    activeTab === 'globalsaas'
                      ? 'bg-brand text-white font-bold'
                      : 'text-dark-muted hover:text-dark-text'
                  }`}
                >
                  Global SaaS
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-dark-muted hover:text-dark-text p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans">
              {activeTab === 'roktofinder' && (
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-xs text-emerald-400 uppercase font-semibold">
                      Live Community Platform // Mymensingh, BD
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1">
                      RoktoFinder: System Architecture &amp; Geospatial Flow
                    </h3>
                    <p className="text-sm text-dark-muted mt-2 leading-relaxed">
                      How an emergency blood request moves from a citizen or hospital in Mymensingh to matched local donors with zero friction.
                    </p>
                  </div>

                  {/* Interactive Architecture Flow Diagram */}
                  <div className="p-6 rounded-2xl bg-dark-bg/80 border border-dark-border">
                    <p className="font-mono text-xs uppercase tracking-wider text-brand-tint font-bold mb-4">
                      — END-TO-END DATA FLOW PIPELINE
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                      {/* Step 1 */}
                      <div className="p-4 rounded-xl bg-dark-surface border border-dark-border flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                            01
                          </div>
                          <h4 className="font-sans font-bold text-sm text-white">Emergency Request</h4>
                          <p className="text-xs text-dark-muted mt-1 leading-relaxed">
                            Patient/hospital inputs blood group (e.g. O+), hospital location, and units needed.
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-brand-tint mt-3">Next.js Edge Input</span>
                      </div>

                      {/* Step 2 */}
                      <div className="p-4 rounded-xl bg-dark-surface border border-dark-border flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-lg bg-brand/20 text-brand-tint flex items-center justify-center font-mono text-xs font-bold mb-3">
                            02
                          </div>
                          <h4 className="font-sans font-bold text-sm text-white">Geospatial Filter</h4>
                          <p className="text-xs text-dark-muted mt-1 leading-relaxed">
                            Matches verified donors strictly within Mymensingh sadar and nearby upazilas.
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-brand-tint mt-3">Area Matching Query</span>
                      </div>

                      {/* Step 3 */}
                      <div className="p-4 rounded-xl bg-dark-surface border border-dark-border flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono text-xs font-bold mb-3">
                            03
                          </div>
                          <h4 className="font-sans font-bold text-sm text-white">Community Trust Layer</h4>
                          <p className="text-xs text-dark-muted mt-1 leading-relaxed">
                            Integrates with Al Fatih Islamic Pathagar network for donor verification and anti-spam.
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-brand-tint mt-3">Verified Directory</span>
                      </div>

                      {/* Step 4 */}
                      <div className="p-4 rounded-xl bg-dark-surface border border-brand/40 flex flex-col justify-between bg-gradient-to-br from-dark-surface to-brand/10">
                        <div>
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                            04
                          </div>
                          <h4 className="font-sans font-bold text-sm text-emerald-300">1-Click Dispatch</h4>
                          <p className="text-xs text-dark-muted mt-1 leading-relaxed">
                            Direct phone call trigger or pre-formatted WhatsApp urgency broadcast.
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 mt-3">Zero-Delay Connection</span>
                      </div>
                    </div>
                  </div>

                  {/* Architectural Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-dark-bg border border-dark-border">
                      <div className="flex items-center gap-2 mb-2 text-brand-tint">
                        <Server size={16} />
                        <h5 className="font-sans font-bold text-xs uppercase tracking-wide text-white">
                          Low Latency Edge
                        </h5>
                      </div>
                      <p className="text-xs text-dark-muted leading-relaxed">
                        Optimized for unstable mobile 3G/4G connections across rural Bangladesh with tiny JS bundles.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-dark-bg border border-dark-border">
                      <div className="flex items-center gap-2 mb-2 text-brand-tint">
                        <ShieldCheck size={16} />
                        <h5 className="font-sans font-bold text-xs uppercase tracking-wide text-white">
                          Donor Privacy
                        </h5>
                      </div>
                      <p className="text-xs text-dark-muted leading-relaxed">
                        Ensures donor phone numbers are accessible only through authenticated, emergency-rated user flows.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-dark-bg border border-dark-border">
                      <div className="flex items-center gap-2 mb-2 text-brand-tint">
                        <Users size={16} />
                        <h5 className="font-sans font-bold text-xs uppercase tracking-wide text-white">
                          Community Roots
                        </h5>
                      </div>
                      <p className="text-xs text-dark-muted leading-relaxed">
                        Started directly with Al Fatih Islamic Pathagar to bridge technology with local grassroots volunteers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'janibd' && (
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-xs text-amber-400 uppercase font-semibold">
                      In Development // SaaS Suite
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1">
                      JaniBD: Modular Architecture &amp; Skill Map
                    </h3>
                    <p className="text-sm text-dark-muted mt-2 leading-relaxed">
                      Building a high-performance, modular digital companion tailored for learners and professionals in Bangladesh.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-dark-bg/80 border border-dark-border space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-brand-tint font-bold">
                      Key Technical Modules Under Construction
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                        <p className="font-sans font-bold text-sm text-white mb-1">Tech Skill Map Engine</p>
                        <p className="text-xs text-dark-muted leading-relaxed">
                          Visual node graph guiding aspiring programmers through localized roadmaps from beginner to production.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                        <p className="font-sans font-bold text-sm text-white mb-1">Interactive Quiz &amp; Game State</p>
                        <p className="text-xs text-dark-muted leading-relaxed">
                          Lightweight state machine handling real-time trivia, score calculation, and streak maintenance.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                        <p className="font-sans font-bold text-sm text-white mb-1">Progress Card Generator</p>
                        <p className="text-xs text-dark-muted leading-relaxed">
                          Dynamic OpenGraph canvas rendering shareable image badges for social networks.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                        <p className="font-sans font-bold text-sm text-white mb-1">Bangla-First Content Library</p>
                        <p className="text-xs text-dark-muted leading-relaxed">
                          Fast MDX/Contentlayer pipeline delivering educational resources with sub-millisecond cache hits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'globalsaas' && (
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-xs text-purple-400 uppercase font-semibold">
                      In Development // Global Stealth Build
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1">
                      Global SaaS: Multi-Tenant Cloud Architecture
                    </h3>
                    <p className="text-sm text-dark-muted mt-2 leading-relaxed">
                      Engineering an international web application platform with modern scalability standards.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-dark-bg/80 border border-dark-border space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-brand-tint font-bold">
                      Architectural Focus Points
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                        <p className="font-sans font-bold text-sm text-white mb-1">Multi-Region Edge Caching</p>
                        <p className="text-xs text-dark-muted leading-relaxed">
                          Ensuring global sub-50ms latency across Europe, North America, and Asia.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                        <p className="font-sans font-bold text-sm text-white mb-1">Resilient Data Layer</p>
                        <p className="text-xs text-dark-muted leading-relaxed">
                          PostgreSQL with connection pooling, tenant isolation, and automated migration safety.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
