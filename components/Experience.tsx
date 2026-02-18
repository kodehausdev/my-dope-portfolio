'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const experiences = [
  {
    period: '2022 — Present',
    title: 'Independent Systems Engineer',
    company: 'Remote',
    type: 'Freelance',
    achievements: [
      'Architected and deployed end-to-end production systems, managing database design, API integrations, and CI/CD pipelines',
      'Engineered OptiPropose, a complex multi-agent AI SaaS platform utilizing parallel processing for competitive analysis',
      'Developed autonomous data-pipelines and email automation workflows backed by PostgreSQL',
      'Devised strict constraint-optimization solutions, including zero-cost database routing for Android applications',
    ],
  },
  {
    period: 'Jun 2023 — Nov 2023',
    title: 'Digital Strategy & Growth Lead',
    company: 'Animation Studio, Abuja',
    type: 'Contract',
    achievements: [
      'Orchestrated data-driven, multi-platform digital campaigns to scale brand reach',
      'Engineered content and engagement strategies that significantly increased organic interaction',
      'Translated complex brand objectives into measurable, high-conversion growth systems',
    ],
  },
  {
    period: 'Aug 2020 — Dec 2020',
    title: 'Technical Facilitator',
    company: 'Rural Nigeria',
    type: 'Volunteer',
    achievements: [
      'Architected a scalable digital literacy curriculum tailored for low-bandwidth environments',
      'Leveraged cloud-based education tools to deploy technical resources across remote communities',
    ],
  },
  {
    period: '2016 — 2021',
    title: 'B.Sc. Political Science',
    company: 'University of Abuja',
    type: 'Education',
    achievements: [
      'Developed rigorous analytical frameworks for evaluating complex organizational structures',
      'Applied high-level systems-thinking to geopolitical and socioeconomic data',
    ],
  },
];

// Badge color per type — all muted, no gradients
const typeMeta: Record<string, { bg: string; color: string }> = {
  Freelance: { bg: 'rgba(196,120,90,0.12)', color: 'var(--accent)' },
  Contract:  { bg: 'rgba(196,120,90,0.08)', color: 'var(--accent)' },
  Education: { bg: 'rgba(91,127,166,0.12)', color: '#7aabcc' },
  Volunteer: { bg: 'rgba(109,184,122,0.10)', color: '#6db87a' },
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

export default function Experience() {
  return (
    <section
      id="experience"
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
          Experience
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
          Journey so far.
        </motion.h2>

        <motion.p
          variants={row}
          className="mb-16"
          style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '480px' }}
        >
          A timeline of building, scaling, and architecting solutions.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: 'var(--bg-border)' }}
          />

          <div className="space-y-0">
            {experiences.map((exp, i) => {
              const badge = typeMeta[exp.type] ?? typeMeta['Freelance'];
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
                        {exp.type}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-ghost)',
                          fontFamily: 'var(--font-dm-sans), monospace',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {exp.period}
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
                      {exp.title}
                    </h3>

                    {/* Company */}
                    <p
                      className="mb-4 font-medium"
                      style={{ fontSize: '0.85rem', color: 'var(--accent)' }}
                    >
                      {exp.company}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {exp.achievements.map((a, ai) => (
                        <li
                          key={ai}
                          className="flex items-start gap-2.5"
                          style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}
                        >
                          <span
                            className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: 'var(--accent)', minWidth: '4px' }}
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Resume CTA */}
        <motion.div variants={row} className="mt-4 pt-8" style={{ borderTop: '1px solid var(--bg-border)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Want to see the full technical breakdown?
          </p>
          <a
            href="/Seyi_Fatoki_Resume.pdf"
            download
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download Full Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}