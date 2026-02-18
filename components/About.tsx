'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const highlights = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Systems Architect',
    description: "I build for bottlenecks—like engineering queue-based batching systems with exponential backoff to handle strict fintech API rate limits without dropping a single payload.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Adaptive Learner',
    description: 'Self-taught from Python basics to deploying full-stack, AI-integrated production applications by prioritizing real-world building over tutorial hell.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: 'End-to-End Dev',
    description: 'Fluid across the entire stack—from reactive mobile UIs in Jetpack Compose to robust Node.js and PostgreSQL backends.',
  },
];

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: '5',   label: 'Years Coding'  },
  { value: '4',   label: 'Core Languages'     },
  { value: '3+',  label: 'AI Models Mastered' }, 
];

// One fade-up on section enter, staggered children
const easing: [number,number,number,number] = [0.16, 1, 0.3, 1];
const section: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const row: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
};

export default function About() {
  return (
    <section
      id="about"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle warm glow — low opacity, no movement */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 50% at 80% 50%, rgba(196,120,90,0.05) 0%, transparent 70%)`,
        }}
      />

      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Section label */}
        <motion.div variants={row} className="section-label mb-3">
          About
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={row}
          className="font-serif mb-16"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
          }}
        >
          Bridging the gap between<br />
          <span style={{ color: 'var(--accent)' }}>complex systems and seamless experiences.</span>
        </motion.h2>

        {/* Main grid: avatar + story */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">

          {/* Avatar block */}
          <motion.div variants={row} className="flex flex-col items-center md:items-start gap-6">
            <div
              className="w-48 h-48 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--bg-border)',
              }}
            >
              {/* Subtle corner accent */}
              <div
                className="absolute top-0 left-0 w-12 h-12"
                style={{
                  background: 'linear-gradient(135deg, rgba(196,120,90,0.2) 0%, transparent 60%)',
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <span
                  className="font-serif block"
                  style={{
                    fontSize: '3.5rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  SF
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-ghost)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Developer & Builder
                </span>
              </div>
            </div>

            {/* Highlights */}
            <div className="w-full space-y-3">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="group flex items-start gap-3 p-4 rounded-lg transition-colors duration-300"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--bg-border)',
                  }}
                >
                  <div className="transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>
                    {h.icon}
                  </div>
                  <div>
                    <p
                      className="font-medium mb-0.5"
                      style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}
                    >
                      {h.title}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {h.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Story */}
          <motion.div variants={row}>
            <h3
              className="font-serif mb-6"
              style={{
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              My Journey
            </h3>

            <div
              className="space-y-5"
              style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}
            >
              <p>
                My path into software wasn't traditional. I discovered a fascination with systems and logic that led me to write my first line of Python in 2020. What started as curiosity quickly evolved into an obsession with building.
              </p>
              <p>
                I bypassed "tutorial hell" by diving straight into the deep end. By focusing on{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  building real-world applications
                </span>{' '}
                rather than just following guides, I learned how to architect software that survives contact with actual users.
              </p>
              <p>
                Today, I bridge the gap between complex logic and scalable code. Leveraging my background in{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Political Science</span>, 
                I bring a unique perspective to{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>AI Multi-Agent Systems</span>—treating 
                AI coordination like organizational diplomacy. I’ve shipped <span style={{ color: 'var(--accent)', fontWeight: 500 }}>10+ projects</span>, 
                from AI-powered proposal generators to high-performance Next.js applications.
              </p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.05rem', marginTop: '2rem' }}>
                Code is the baseline. Architecture is the craft. I design systems that bend constraints instead of breaking under them.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={row}
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{
            background: 'var(--bg-border)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-8 px-4"
              style={{ background: 'var(--bg-surface)' }}
            >
              <span
                className="font-serif block mb-1"
                style={{
                  fontSize: '2.25rem',
                  color: 'var(--accent)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-ghost)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}