'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { sound } from '@/lib/audio';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OutputLine {
  id: string;
  type: 'command' | 'response' | 'error' | 'system';
  text: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [output, setOutput] = useState<OutputLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Muhammad Nafiz Interactive Terminal [Version 1.0.0]',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type "help" to view available commands. Press ESC to exit.',
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    sound.playPop();
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLines: OutputLine[] = [
      { id: Math.random().toString(), type: 'command', text: `nafiz@dev:~$ ${trimmed}` },
    ];

    const lower = trimmed.toLowerCase();

    switch (lower) {
      case 'help':
        newLines.push({
          id: Math.random().toString(),
          type: 'response',
          text: `Available Commands:
  bio        - Overview of Muhammad Nafiz
  skills     - Core tech stack & ML/DL competencies
  projects   - Summary of active platforms
  roadmap    - 5-phase engineering progression
  contact    - Official social handles and direct email
  clear      - Clear the terminal screen
  exit       - Close this terminal window
  sudo       - Easter egg privilege command`,
        });
        break;

      case 'bio':
        newLines.push({
          id: Math.random().toString(),
          type: 'response',
          text: `Muhammad Nafiz (মুহাম্মদ নাফিজ)
Role: Web Application Developer & Founder
Location: Mymensingh, Bangladesh
Domain: muhammadnafiz.dev
Trajectory: Python & ML fundamentals complete -> Deep Learning -> AI Engineering.`,
        });
        break;

      case 'skills':
        newLines.push({
          id: Math.random().toString(),
          type: 'response',
          text: `Technical Competencies:
  [Frontend]    TypeScript, Next.js (App Router), React 19, Tailwind CSS, GSAP, Framer Motion
  [Backend]     Node.js, PostgreSQL, REST APIs, System Architecture
  [AI / ML]     Python, PyTorch, Scikit-Learn, NumPy, Pandas, Deep Learning architectures
  [Roadmap]     NLP, Computer Vision, Transformers, AI Agent Development`,
        });
        break;

      case 'projects':
        newLines.push({
          id: Math.random().toString(),
          type: 'response',
          text: `Featured Platforms:
  1. RoktoFinder (LIVE)         - Bangla-first blood donor platform for Mymensingh
  2. JaniBD (IN DEVELOPMENT)    - Bangla-first everyday SaaS & learning platform
  3. Global SaaS (STEALTH)      - In-development international SaaS platform`,
        });
        break;

      case 'roadmap':
        newLines.push({
          id: Math.random().toString(),
          type: 'response',
          text: `Engineering Progression:
  Phase 01: Web Application Development & Founding  [Solidified]
  Phase 02: SaaS Engineering & System Architecture  [Active Build]
  Phase 03: Python & Machine Learning Fundamentals   [Completed]
  Phase 04: Deep Learning Specialization             [Current Focus]
  Phase 05: Transformers & Autonomous AI Agents      [Planned]`,
        });
        break;

      case 'contact':
        newLines.push({
          id: Math.random().toString(),
          type: 'response',
          text: `Direct Channels:
  Email:    me@muhammadnafiz.dev
  GitHub:   github.com/nafiz-ai-ml
  LinkedIn: linkedin.com/in/nafiz-ai
  X:        x.com/MUHAMMADNA70418`,
        });
        break;

      case 'clear':
        setOutput([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      case 'sudo':
      case 'sudo su':
      case 'sudo rm -rf /':
        newLines.push({
          id: Math.random().toString(),
          type: 'error',
          text: `nafiz is not in the sudoers file. This incident will be reported to Muhammad Nafiz ;)`,
        });
        break;

      default:
        newLines.push({
          id: Math.random().toString(),
          type: 'error',
          text: `Command not found: "${trimmed}". Type "help" for a list of available commands.`,
        });
    }

    setOutput((prev) => [...prev, ...newLines]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIdx);
          setInput(history[nextIdx]);
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-2xl bg-[#0d0b14] border border-brand/50 shadow-2xl flex flex-col overflow-hidden z-10 transition-all duration-300 ${
              isMaximized ? 'w-full h-full max-w-none' : 'w-full max-w-2xl h-[520px]'
            }`}
          >
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#14101f] border-b border-dark-border select-none">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-rose-500 hover:brightness-110"
                  aria-label="Close"
                />
                <button
                  type="button"
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-amber-500 hover:brightness-110"
                  aria-label="Toggle size"
                />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-dark-muted ml-3 flex items-center gap-1.5">
                  <TerminalIcon size={12} className="text-brand-tint" />
                  nafiz@dev:~
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-dark-muted hover:text-dark-text p-1"
                >
                  {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-dark-muted hover:text-dark-text p-1"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-4 font-mono text-xs sm:text-sm text-dark-text overflow-y-auto space-y-2 selection:bg-brand selection:text-white"
            >
              {output.map((line) => (
                <div
                  key={line.id}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === 'command'
                      ? 'text-brand-tint font-semibold'
                      : line.type === 'system'
                      ? 'text-dark-muted'
                      : line.type === 'error'
                      ? 'text-rose-400'
                      : 'text-dark-text/90'
                  }`}
                >
                  {line.text}
                </div>
              ))}

              {/* Active Prompt Line */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-emerald-400 font-bold shrink-0">nafiz@dev:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-brand-tint"
                  autoFocus
                />
              </div>

              <div ref={terminalEndRef} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
