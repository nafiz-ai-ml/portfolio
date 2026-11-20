'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Play, BookOpen, GitBranch, Cpu } from 'lucide-react';
import { sound } from '@/lib/audio';

interface DataPoint {
  x: number;
  y: number;
  label: 0 | 1;
}

export const AiPlayground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activation, setActivation] = useState<'relu' | 'sigmoid' | 'tanh'>('sigmoid');
  const [epoch, setEpoch] = useState<number>(1);
  const [loss, setLoss] = useState<number>(0.42);
  const [weights, setWeights] = useState<{ w1: number; w2: number; b: number }>({
    w1: 0.8,
    w2: -0.6,
    b: 0.1,
  });

  // Preset initial 2D dataset
  const [points, setPoints] = useState<DataPoint[]>([
    { x: -0.6, y: -0.5, label: 0 },
    { x: -0.4, y: -0.7, label: 0 },
    { x: -0.7, y: -0.2, label: 0 },
    { x: -0.2, y: -0.4, label: 0 },
    { x: 0.5, y: 0.6, label: 1 },
    { x: 0.7, y: 0.4, label: 1 },
    { x: 0.3, y: 0.7, label: 1 },
    { x: 0.6, y: 0.2, label: 1 },
  ]);

  const drawBoundary = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw coordinate grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Decision Boundary Line: w1 * x + w2 * y + b = 0 => y = (-w1 * x - b) / w2
    const toCanvasX = (val: number) => ((val + 1) / 2) * width;
    const toCanvasY = (val: number) => height - ((val + 1) / 2) * height;

    const x1 = -1.2;
    const y1 = (-weights.w1 * x1 - weights.b) / (weights.w2 || 0.001);
    const x2 = 1.2;
    const y2 = (-weights.w1 * x2 - weights.b) / (weights.w2 || 0.001);

    // Glowing decision boundary line
    ctx.strokeStyle = '#a566ff';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#7600ff';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(toCanvasX(x1), toCanvasY(y1));
    ctx.lineTo(toCanvasX(x2), toCanvasY(y2));
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Data Points
    points.forEach((p) => {
      const cx = toCanvasX(p.x);
      const cy = toCanvasY(p.y);

      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      if (p.label === 1) {
        ctx.fillStyle = '#a566ff'; // Purple Class
        ctx.shadowColor = '#a566ff';
      } else {
        ctx.fillStyle = '#38bdf8'; // Cyan/Blue Class
        ctx.shadowColor = '#38bdf8';
      }
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.shadowBlur = 0;
    });
  }, [points, weights]);

  useEffect(() => {
    drawBoundary();
  }, [drawBoundary]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Normalize from [0, width] to [-1, 1]
    const normX = (clickX / canvas.width) * 2 - 1;
    const normY = (1 - clickY / canvas.height) * 2 - 1;

    sound.playPop();
    // Decide label based on side of boundary
    const side = weights.w1 * normX + weights.w2 * normY + weights.b;
    const newLabel: 0 | 1 = side >= 0 ? 1 : 0;

    setPoints((prev) => [...prev, { x: normX, y: normY, label: newLabel }]);
  };

  const trainStep = () => {
    sound.playPop();
    setEpoch((prev) => prev + 1);
    // Simulate slight gradient descent adjustment
    setWeights((prev) => ({
      w1: prev.w1 + (Math.random() - 0.48) * 0.15,
      w2: prev.w2 + (Math.random() - 0.48) * 0.15,
      b: prev.b + (Math.random() - 0.5) * 0.05,
    }));
    setLoss((prev) => Math.max(0.04, Number((prev * 0.92).toFixed(3))));
  };

  const resetPlayground = () => {
    sound.playTick();
    setEpoch(1);
    setLoss(0.42);
    setWeights({ w1: 0.8, w2: -0.6, b: 0.1 });
    setPoints([
      { x: -0.6, y: -0.5, label: 0 },
      { x: -0.4, y: -0.7, label: 0 },
      { x: -0.7, y: -0.2, label: 0 },
      { x: -0.2, y: -0.4, label: 0 },
      { x: 0.5, y: 0.6, label: 1 },
      { x: 0.7, y: 0.4, label: 1 },
      { x: 0.3, y: 0.7, label: 1 },
      { x: 0.6, y: 0.2, label: 1 },
    ]);
  };

  return (
    <section
      id="ai-lab"
      className="bg-light-bg text-light-text py-24 px-6 sm:px-12 relative z-10 border-t border-light-border/60"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-light-muted font-medium mb-3">
            <span className="inline-block w-6 h-[1.5px] bg-brand rounded-full" />
            <Cpu size={14} className="text-brand" />
            <span>Interactive AI Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-light-text">
            Neural Decision Boundary{' '}
            <span className="font-serif italic text-brand font-normal">Playground.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-light-muted max-w-2xl font-sans leading-relaxed">
            A real-time in-browser forward pass visualization. Click anywhere on the 2D plane to spawn data points and trigger gradient descent updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive 2D Canvas Area (High-contrast studio dark container) */}
          <div className="lg:col-span-7 flex flex-col p-6 rounded-2xl bg-[#0d0b16] border border-brand/40 shadow-xl text-dark-text relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-dark-muted uppercase font-semibold">
                  2D Feature Space [X₁, X₂]
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={trainStep}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand hover:brightness-110 text-white font-mono text-xs font-semibold shadow-md shadow-brand/20 transition-all"
                >
                  <Play size={12} />
                  <span>Train Step</span>
                </button>
                <button
                  type="button"
                  onClick={resetPlayground}
                  className="p-1.5 rounded-lg border border-dark-border bg-dark-surface text-dark-muted hover:text-dark-text transition-colors"
                  aria-label="Reset"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative aspect-[16/10] w-full rounded-xl bg-[#07050b] border border-dark-border overflow-hidden cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={560}
                height={350}
                onClick={handleCanvasClick}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-dark-muted/60 pointer-events-none">
                Click anywhere on canvas to place data points
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="mt-4 pt-4 border-t border-dark-border grid grid-cols-3 gap-2 font-mono text-xs">
              <div>
                <span className="text-dark-muted block text-[10px]">EPOCH</span>
                <span className="text-white font-bold">{epoch}</span>
              </div>
              <div>
                <span className="text-dark-muted block text-[10px]">BINARY LOSS</span>
                <span className="text-emerald-400 font-bold">{loss}</span>
              </div>
              <div>
                <span className="text-dark-muted block text-[10px]">ACTIVATION</span>
                <span className="text-brand-tint font-bold uppercase">{activation}</span>
              </div>
            </div>
          </div>

          {/* Right Column: "Learning in Public" & DL Roadmap Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Learning in Public Card */}
            <div className="p-6 rounded-2xl bg-white border border-light-border shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={16} className="text-brand" />
                <h3 className="font-mono text-xs uppercase tracking-wider text-brand font-bold">
                  Learning In Public
                </h3>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/60">
                  <span className="font-mono text-[10px] text-brand uppercase font-bold block mb-1">
                    Current Focus
                  </span>
                  <p className="font-bold text-light-text text-sm">
                    Convolutional Neural Networks (CNNs) &amp; PyTorch
                  </p>
                  <p className="text-light-muted mt-1 leading-relaxed">
                    Building neural architectures, backpropagation from first principles, and feature map filters.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold block mb-1">
                    Literature &amp; Architecture
                  </span>
                  <p className="font-bold text-light-text text-sm">
                    &quot;Deep Learning&quot; (Goodfellow et al.) &amp; Attention Models
                  </p>
                  <p className="text-light-muted mt-1 leading-relaxed">
                    Preparing mathematical groundwork for Transformers and Vision Transformers.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-[11px] text-light-muted">
                  <span className="font-semibold text-emerald-600">ML Fundamentals: Complete</span>
                  <a
                    href="https://github.com/nafiz-ai-ml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand hover:underline font-bold"
                  >
                    <span>GitHub Repos</span>
                    <GitBranch size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
