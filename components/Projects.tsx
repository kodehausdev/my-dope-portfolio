'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

// ... (Keep your existing projects array and statusMeta object here) ...
const projects = [
  {
    id: 'optipropose',
    title: 'OptiPropose',
    status: 'In Development',
    description: 'Moving beyond simple LLM wrappers. OptiPropose utilizes a multi-agent architecture where specialized AI models autonomously orchestrate research, competitive analysis, and copy generation in parallel to optimize proposal win-rates.',
    tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Firebase'],
    images: ['/projects/optipropose-1.png', '/projects/optipropose-2.png'],
    links: { demo: 'https://optipropose.com', github: '' },
  },
  {
    id: 'hustlehawk',
    title: 'HustleHawk',
    status: 'Live',
    description: 'An autonomous job-aggregation pipeline and public Discord service hosted on Render. The backend features a 1-click scraping engine that pushes to GitHub to trigger automated CI/CD deployments, broadcasting high-signal remote opportunities directly to users.',
    tech: ['Python', 'Beautiful Soup', 'Discord API', 'Render', 'CI/CD'],
    images: ['/projects/hustlehawk-1.png', '/projects/hustlehawk-2.png'],
    links: { demo: '', github: 'https://github.com/kodehausdev' },
  },
  {
    id: 'outreach-engine', 
    title: 'Outreach Engine', 
    status: 'Live',
    description: 'A full-cycle lead generation and email automation system. It autonomously scrapes contact data, dynamically segments users into distinct categories, and orchestrates targeted email sequences backed entirely by a robust PostgreSQL database.',
    tech: ['Node.js', 'PostgreSQL', 'Web Scraping', 'Automation'],
    images: ['/projects/email-1.png', '/projects/email-2.png'], 
    links: { demo: '', github: 'https://github.com/kodehausdev' }, 
  },
  {
    id: 'mealflow',
    title: 'MealFlow',
    status: 'Live',
    description: 'A full-featured Android application highlighting constraint-driven engineering. I architected a zero-cost storage solution by encoding user images as base64 strings, completely bypassing strict Firebase storage limits.',
    tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Room Database'],
    images: [
      '/projects/mealflow-1.png',
      '/projects/mealflow-2.png',
      '/projects/mealflow-3.png',
      '/projects/mealflow-4.png',
      '/projects/mealflow-5.png',
    ],
    links: { demo: 'https://meal-flow-landing-page.vercel.app/', github: 'https://github.com/kodehausdev' },
  },
  {
    id: 'two-truths',
    title: 'Two Truths and a Lie',
    status: 'Live',
    description: 'An interactive, real-time social game with shareable compressed URLs. Built to prioritize clean, fluid animations and low-latency state management.',
    tech: ['React', 'Tailwind CSS', 'Vercel', 'Framer Motion'],
    images: ['/projects/two-truths-1.png', '/projects/two-truths-2.png'],
    links: { demo: 'https://two-truth-and-a-lie-efrd.vercel.app', github: '' },
  },
  {
    id: 'fintech-queue',
    title: 'Enterprise Payment Infrastructure',
    status: 'Private Client',
    description: 'A white-label integration for a remote fintech team. Architected a resilient queue-based batching system with exponential backoff to handle strict payment gateway rate limits. Prevented payload drops and delivered a 4x boost in processing efficiency during peak traffic.',
    tech: ['Node.js', 'Redis', 'TypeScript', 'Payment APIs'], 
    images: ['/projects/fintech-architecture.png'], 
    links: { demo: '', github: '' },
  },
];


const statusMeta: Record<string, { bg: string; color: string; dot: string }> = {
  'Live':           { bg: 'rgba(109,184,122,0.1)',  color: '#6db87a', dot: '#6db87a' },
  'In Development': { bg: 'rgba(196,120,90,0.1)',   color: 'var(--accent)', dot: 'var(--accent)' },
  'Private Client':   { bg: 'rgba(148,163,184,0.1)',  color: '#94a3b8', dot: '#94a3b8' }, // Stealthy Slate
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

// Added priority prop for LCP optimization
function ImageCarousel({ images, title, priority = false }: { images: string[]; title: string; priority?: boolean }) {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div
      className="relative w-full overflow-hidden group/carousel"
      style={{
        height: '220px',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--bg-border)',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[idx]}
            alt={`${title} screenshot ${idx + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            // Only priority-load the very first image of the priority carousel
            priority={priority && idx === 0} 
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          {/* Prev / Next Buttons */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
            style={{ background: 'rgba(14,14,12,0.7)', color: 'var(--text-secondary)' }}
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
            style={{ background: 'rgba(14,14,12,0.7)', color: 'var(--text-secondary)' }}
            aria-label="Next image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to image ${i + 1}`}
                style={{
                  width: i === idx ? '1.25rem' : '0.375rem',
                  height: '0.375rem',
                  borderRadius: '999px',
                  background: i === idx ? 'var(--accent)' : 'var(--bg-border)',
                  transition: 'all 200ms ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 55% 40% at 100% 30%, rgba(196,120,90,0.05) 0%, transparent 70%)`,
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
          Projects
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
          Things I've built.
        </motion.h2>

        <motion.p
          variants={row}
          className="mb-16"
          style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '480px' }}
        >
          Real solutions, shipped. From autonomous AI agents to scalable mobile applications.
        </motion.p>

        {/* Project grid */}
        <motion.div
          variants={row}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {projects.map((project, index) => {
            const badge = statusMeta[project.status];
            return (
              <div
                key={project.id}
                className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--bg-border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                {/* Image carousel - Passing priority to the first item */}
                <ImageCarousel 
                  images={project.images} 
                  title={project.title} 
                  priority={index === 0} 
                />

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Status + counter */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: badge.dot }}
                      />
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif mb-3 group-hover:text-[var(--accent)] transition-colors duration-300"
                    style={{
                      fontSize: '1.4rem',
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-6 flex-grow"
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span 
                        key={t} 
                        className="text-xs font-medium px-2.5 py-1 rounded-md"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          color: 'var(--text-ghost)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto pt-2">
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
                      >
                        View Live
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline flex items-center gap-1.5"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* More coming soon */}
        <motion.div
          variants={row}
          className="rounded-xl p-10 text-center"
          style={{
            border: '1px dashed var(--bg-border)',
            background: 'rgba(255,255,255,0.01)'
          }}
        >
          <p
            className="font-serif mb-1"
            style={{ fontSize: '1.2rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            More in the pipeline
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-ghost)' }}>
            Currently architecting the next system in stealth. Stay tuned.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}