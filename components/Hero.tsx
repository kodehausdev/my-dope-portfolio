'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import dynamic from 'next/dynamic';

// 🔥 The Magic: Defer heavy client components and disable SSR
const Terminal = dynamic(() => import('./Terminal'), { ssr: false });
const AtmosphereCanvas = dynamic(() => import('./AtmosphereCanvas'), { ssr: false });

// ─── Animation variants ───────────────────────────────────────────────────────
const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 }, // <-- opacity is back!
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easing } },
};

const nameContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const nameWord: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 12 }, // <-- opacity is back!
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: easing } },
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: 'var(--bg)', perspective: '800px' }}
    >
      <AtmosphereCanvas />

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Two-column layout on desktop: text left, terminal right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Label */}
            <motion.div variants={item} className="mb-4">
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: 'var(--text-ghost)' }}>
                Welcome to
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={nameContainer}
              initial="hidden"
              animate="visible"
              className="font-serif mb-4 flex flex-wrap justify-center lg:justify-start gap-x-4"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                transformStyle: 'preserve-3d',
              }}
            >
              {['OptiPropose', 'Studio'].map((word) => (
                <motion.span key={word} variants={nameWord} style={{ display: 'inline-block', color: 'var(--text-primary)' }}>
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={item}
              className="font-medium mb-4"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', color: 'var(--accent)', letterSpacing: '0.01em' }}
            >
              Your White-Label Engineering Partner
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="mb-6 mx-auto lg:mx-0"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: 1.75 }}
            >
              The technical backend for growth-focused digital agencies. You sell high-ticket custom software, client portals, and AI automations. We architect and build them.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <button onClick={() => scrollToSection('projects')} className="btn-primary">
                View Capabilities
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-outline">
                Discuss a Project
              </button>
            </motion.div>

            {/* Social Links & Email Copy */}
            <motion.div variants={item} className="flex gap-3 justify-center lg:justify-start mb-8">
              {[
                {
                  href: 'https://github.com/kodehausdev', label: 'GitHub',
                  path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
                },
                {
                  href: 'https://www.linkedin.com/in/seyi-fatoki-a180a3389/', label: 'LinkedIn',
                  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                },
              ].map(({ href, label, path }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="p-2.5 rounded-md transition-colors duration-150"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)', color: 'var(--text-secondary)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent)'; el.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-secondary)'; el.style.borderColor = 'var(--bg-border)'; }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
                </a>
              ))}
              <button
                onClick={() => navigator.clipboard.writeText('kodehausdev@optipropose.com')}
                aria-label="Copy email"
                className="p-2.5 rounded-md transition-colors duration-150"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent)'; el.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-secondary)'; el.style.borderColor = 'var(--bg-border)'; }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </motion.div>

            {/* Scroll indicator (Desktop) */}
            <motion.button
              variants={item}
              onClick={() => scrollToSection('about')}
              className="hidden lg:flex flex-col items-start gap-1.5 mt-4"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              aria-label="Scroll to about section"
            >
              <span style={{ fontSize: '0.7rem', color: '#6B6762', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Scroll to explore
              </span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </motion.button>
          </div>

          {/* Right — terminal */}
          <motion.div
            variants={item}
            className="w-full lg:w-auto lg:flex-shrink-0 relative"
            style={{ 
              width: '100%', 
              maxWidth: '420px', 
              minHeight: '260px' 
            }}
          >
            <div className="relative z-10">
              <Terminal />
            </div>

            {/* Mobile scroll indicator */}
            <motion.button
              onClick={() => scrollToSection('about')}
              className="lg:hidden flex flex-col items-center gap-1.5 mx-auto mt-8"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <span style={{ fontSize: '0.7rem', color: '#6B6762', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Scroll to explore
              </span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}