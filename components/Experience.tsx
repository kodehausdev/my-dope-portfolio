'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const capabilities = [
  {
    step: 'Layer 01',
    title: 'Custom Web Apps & Client Portals',
    tech: 'Next.js • React • Tailwind CSS',
    category: 'Frontend & UI',
    details: [
      'Architect highly scalable, interactive frontends using modern Next.js 15 frameworks.',
      'Implement secure role-based authentication and multi-tenant database access.',
      'Deliver pixel-perfect, white-labeled client dashboards that your agency can confidently present as its own.',
    ],
  },
  {
    step: 'Layer 02',
    title: 'AI Integration & Automation',
    category: 'AI / Data',
    tech: 'Python • Gemini/OpenAI • Web Scraping',
    details: [
      'Move beyond standard ChatGPT wrappers by engineering custom generative AI pipelines.',
      'Deploy multi-agent workflows that autonomously handle research, analysis, and copy generation.',
      'Build robust web scrapers and data aggregation engines to feed high-signal data into your clients\' CRMs.',
    ],
  },
  {
    step: 'Layer 03',
    title: 'High-Volume Backend Architecture',
    category: 'Infrastructure',
    tech: 'Node.js • PostgreSQL • AWS App Runner',
    details: [
      'Design resilient PostgreSQL database schemas optimized for high-read/write enterprise loads.',
      'Engineer queue-based batching systems with exponential backoff to respect strict third-party API limits.',
      'Deploy to scalable cloud infrastructure ensuring 99.9% uptime during your clients\' peak traffic events.',
    ],
  },
];

// Badge color per category — all muted, no gradients
const typeMeta: Record<string, { bg: string; color: string }> = {
  'Frontend & UI': { bg: 'rgba(91,127,166,0.12)', color: '#7aabcc' },
  'AI / Data':     { bg: 'rgba(109,184,122,0.10)', color: '#6db87a' },
  'Infrastructure':{ bg: 'rgba(196,120,90,0.12)', color: 'var(--accent)' },
};

const easing: [number,number,number,number] = [0.16, 1, 0.3, 1];
const section: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const row: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
};

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle glow top-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 50% 40% at 90% 10%, rgba(196,120,90,0.05) 0%, transparent 70%)`,
        }}
      />

      <motion.div
        className="max-w-3xl mx-auto relative z-10"
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Section label */}
        <motion.div variants={row} className="section-label mb-3">
          Capabilities
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={row}
          className="font-serif mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          Full-Stack Execution.
        </motion.h2>

        <motion.p
          variants={row}
          className="mb-16"
          style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.6 }}
        >
          The technical artillery we provide for your agency's next big pitch. We handle the entire stack so you can focus on strategy and sales.
        </motion.p>

        {/* Timeline (Repurposed as Tech Stack Layers) */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: 'var(--bg-border)' }}
          />

          <div className="space-y-0">
            {capabilities.map((cap, i) => {
              const badge = typeMeta[cap.category] ?? typeMeta['Infrastructure'];
              return (
                <motion.div
                  key={i}
                  variants={row}
                  className="relative pl-10 pb-12"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-1/2"
                    style={{ background: 'var(--accent)', flexShrink: 0 }}
                  />

                  {/* Card */}
                  <div
                    className="p-6 rounded-lg project-card transition-colors duration-300 hover:bg-white/[0.02]"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--bg-border)',
                    }}
                  >
                    {/* Top row */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="text-xs font-semibold px-2.5 py-0.5 rounded"
                        style={{
                          background: badge.bg,
                          color: badge.color,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {cap.category}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-ghost)',
                          fontFamily: 'var(--font-dm-sans), monospace',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {cap.step}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-serif mb-1 group-hover:text-[var(--accent)] transition-colors duration-300"
                      style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {cap.title}
                    </h3>

                    {/* Tech Stack */}
                    <p
                      className="mb-4 font-medium"
                      style={{ fontSize: '0.85rem', color: 'var(--accent)' }}
                    >
                      {cap.tech}
                    </p>

                    {/* Details */}
                    <ul className="space-y-2">
                      {cap.details.map((detail, di) => (
                        <li
                          key={di}
                          className="flex items-start gap-2.5"
                          style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}
                        >
                          <span
                            className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: 'var(--accent)', minWidth: '4px' }}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Agency Partnership CTA */}
        <motion.div variants={row} className="mt-4 pt-8 flex flex-col items-start gap-4" style={{ borderTop: '1px solid var(--bg-border)' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Have a complex client project in the pipeline? Let's map out the architecture.
          </p>
          <a
            href="mailto:kodehausdev@optipropose.com?subject=White-Label%20Partnership%20Inquiry"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Discuss a Project
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}