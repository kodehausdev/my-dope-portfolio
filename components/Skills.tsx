'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const skillCategories = [
  {
    title: 'AI & Automation',
    skills: ['LLM Integration', 'Multi-Agent Systems', 'Prompt Engineering', 'Python', 'Web Scraping', 'Discord/Email Bots'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'PostgreSQL', 'Firebase', 'REST APIs', 'SQLite'],
  },
  {
    title: 'Tools & Infra',
    skills: ['Git', 'Vercel', 'Android Studio', 'Jetpack Compose', 'Kotlin'],
  },
];

const stats = [
  { value: '4',  label: 'Languages'     },
  { value: '8+', label: 'Frameworks'    },
  { value: '4',  label: 'Live Projects' },
  { value: '5+', label: 'Years Building'},
];

const easing: [number,number,number,number] = [0.16, 1, 0.3, 1];
const section: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const row: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 55% 45% at 20% 60%, rgba(196,120,90,0.05) 0%, transparent 70%)`,
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
          Skills
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
          Tools I build with.
        </motion.h2>

        <motion.p
          variants={row}
          className="mb-16"
          style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '480px' }}
        >
          Full-stack toolkit with a growing focus on AI systems and automation.
        </motion.p>

        {/* Skill grid */}
        <motion.div
          variants={row}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.title}
              className="p-6 rounded-lg"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--bg-border)',
                // First card (AI & Automation) gets a faint accent border
                ...(ci === 0 && { borderColor: 'rgba(196,120,90,0.3)' }),
              }}
            >
              {/* Category title */}
              <div className="flex items-center gap-2 mb-4">
                {ci === 0 && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--accent)', flexShrink: 0 }}
                  />
                )}
                <h3
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: ci === 0 ? 'var(--accent)' : 'var(--text-ghost)',
                  }}
                >
                  {cat.title}
                </h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

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
              className="flex flex-col items-center justify-center py-7 px-4"
              style={{ background: 'var(--bg-surface)' }}
            >
              <span
                className="font-serif block mb-1"
                style={{
                  fontSize: '2rem',
                  color: 'var(--accent)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-ghost)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
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