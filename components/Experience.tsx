'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const experiences = [
  {
    period: '2022 — Present',
    title: 'Freelance & Personal Projects Developer',
    company: 'Remote',
    type: 'Freelance',
    achievements: [
      'Architected scalable, production-ready solutions optimized for real-world constraints',
      'Developed MealFlow with innovative zero-cost Firebase storage solution',
      'Built OptiPropose AI-powered SaaS platform with TypeScript and PostgreSQL',
      'Created HustleHawk job automation tool with intelligent filtering',
    ],
  },
  {
    period: 'Jun 2023 — Nov 2023',
    title: 'Business Development & Social Media Lead',
    company: 'Animation Studio, Abuja',
    type: 'Contract',
    achievements: [
      'Earned Meta Social Media Marketing certification',
      'Developed content strategies that significantly increased engagement',
      'Managed multi-platform digital campaigns',
      'Increased brand reach and audience interaction',
    ],
  },
  {
    period: '2020 — Present',
    title: 'Self-Taught Developer Journey',
    company: 'Independent Learning',
    type: 'Education',
    achievements: [
      'Mastered Python, Kotlin, JavaScript, and TypeScript through project-based learning',
      'Built 10+ complete projects from scratch to production deployment',
      'Transitioned from tutorials to architecting production applications',
      'Self-taught through documentation, open-source contributions, and real projects',
    ],
  },
  {
    period: 'Aug 2020 — Dec 2020',
    title: 'Volunteer Digital Literacy Educator',
    company: 'Rural Nigeria',
    type: 'Volunteer',
    achievements: [
      'Created comprehensive digital literacy curriculum',
      'Used Google Classroom for remote teaching',
      'Empowered communities with essential tech skills',
      'Bridged the digital divide in rural areas',
    ],
  },
  {
    period: '2016 — 2021',
    title: 'Bachelor of Science in Political Science',
    company: 'University of Abuja',
    type: 'Education',
    achievements: [
      'Completed degree while learning to code',
      'Built first Android apps during university',
      'Developed problem-solving and analytical skills',
      'Balanced academics with technical education',
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
          From self-taught developer to building production applications.
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
                    className="p-6 rounded-lg project-card"
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
                      className="font-serif mb-1"
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
                      className="mb-4"
                      style={{ fontSize: '0.85rem', color: 'var(--accent)' }}
                    >
                      {exp.company}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {exp.achievements.map((a, ai) => (
                        <li
                          key={ai}
                          className="flex items-start gap-2"
                          style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}
                        >
                          <span
                            className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
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
            Want to see my full resume?
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