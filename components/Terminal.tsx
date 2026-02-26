"use client";

import React from 'react';
import Typewriter from 'typewriter-effect';

const Terminal = () => {
  return (
    <div className="relative w-full max-w-md group">
      {/* 1. BRANDED GLOW - Using your orange/amber theme for consistent branding */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 to-amber-500/10 rounded-lg blur-2xl transition-all duration-1000 group-hover:opacity-60" />

      <div className="relative w-full bg-[#0d0d0d]/95 backdrop-blur-2xl rounded-lg border border-white/10 font-mono shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
          </div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">seyi_os v1.0</div>
        </div>

        {/* Body */}
        <div className="p-5 text-sm sm:text-base min-h-[180px] leading-relaxed">
          <div className="flex gap-2 font-bold mb-2">
            <span className="text-orange-400">→</span>
            <span className="text-zinc-400">~/stack</span>
          </div>

          <div className="text-zinc-200">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 30, // Faster typing feels more like a terminal
                deleteSpeed: 15,
                cursor: '▋',
              }}
              onInit={(typewriter) => {
                typewriter
                  // SHOWCASE: AI & Logic
                  .typeString('> Init <span style="color: #fbbf24;">Multi-Agent RAG</span>...')
                  .pauseFor(400)
                  .typeString(' <span style="color: #4ade80;">[READY]</span>')
                  .pauseFor(1200)
                  .deleteAll()

                  // SHOWCASE: Engineering (React/Next)
                  .typeString('> Mounting <span style="color: #38bdf8;">Next.js 15</span> Core...')
                  .pauseFor(300)
                  .typeString('<br/><span style="color: #94a3b8;">Status: Optimized (100 Lighthouse)</span>')
                  .pauseFor(1500)
                  .deleteAll()

                  // SHOWCASE: Impact (The "Money" String)
                  .typeString('> Optimizing LLM Workflows...')
                  .pauseFor(600)
                  .typeString('<br/><span style="color: #fb923c;">✔ 40% Latency Reduction</span>')
                  .pauseFor(2500)
                  .deleteAll()

                  // FINAL STATUS
                  .typeString('<span style="color: #4ade80;">System Online. Ready to Build.</span>')
                  .pauseFor(3000)
                  .start();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
