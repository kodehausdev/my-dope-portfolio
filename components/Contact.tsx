'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const easing: [number,number,number,number] = [0.16, 1, 0.3, 1];
const section: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const row: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
};

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 1rem',
  background: 'var(--bg-surface)',
  border: '1px solid var(--bg-border)',
  borderRadius: '6px',
  color: 'var(--text-primary)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 150ms ease',
};

const labelBase: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-ghost)',
  marginBottom: '0.5rem',
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New message from ${formData.name} - Portfolio Contact`,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const info = [
    {
      label: 'Email',
      value: 'hi.kodehaus@gmail.com',
      action: () => navigator.clipboard.writeText('hi.kodehaus@gmail.com'),
      hint: 'Click to copy',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
    },
    {
      label: 'Location',
      value: 'Abuja, Nigeria',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
    },
    {
      label: 'Response Time',
      value: 'Within 24 hours',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
    },
  ];

  const socials = [
    {
      name: 'GitHub',
      sub: 'See my work',
      href: 'https://github.com/kodehausdev',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      sub: 'Let\'s connect',
      href: 'https://www.linkedin.com/in/seyi-fatoki-a180a3389/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle warm glow bottom-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 50% 40% at 10% 100%, rgba(196,120,90,0.05) 0%, transparent 70%)`,
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
          Contact
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
          Let's work together.
        </motion.h2>

        <motion.p
          variants={row}
          className="mb-16"
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
          }}
        >
          Have a project in mind or want to collaborate? Drop me a message — I read everything.
        </motion.p>

        <div className="grid md:grid-cols-5 gap-12">

          {/* Form — wider col */}
          <motion.div variants={row} className="md:col-span-3 space-y-5">

            <div>
              <label htmlFor="name" style={labelBase}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                placeholder="Your name"
                style={{
                  ...inputBase,
                  borderColor: focused === 'name' ? 'var(--accent)' : 'var(--bg-border)',
                }}
              />
            </div>

            <div>
              <label htmlFor="email" style={labelBase}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                placeholder="your@email.com"
                style={{
                  ...inputBase,
                  borderColor: focused === 'email' ? 'var(--accent)' : 'var(--bg-border)',
                }}
              />
            </div>

            <div>
              <label htmlFor="message" style={labelBase}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                rows={6}
                placeholder="Tell me about your project..."
                style={{
                  ...inputBase,
                  borderColor: focused === 'message' ? 'var(--accent)' : 'var(--bg-border)',
                  resize: 'none',
                }}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="btn-primary w-full justify-center"
              style={{
                opacity: status === 'sending' ? 0.6 : 1,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              }}
            >
              {status === 'sending' ? 'Sending…' :
               status === 'success' ? '✓ Message sent' :
               status === 'error'   ? 'Error — try again' :
               'Send Message'}
            </button>

            {/* Status feedback */}
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: '0.85rem',
                  color: '#6db87a',
                  padding: '0.75rem 1rem',
                  background: 'rgba(109,184,122,0.08)',
                  border: '1px solid rgba(109,184,122,0.2)',
                  borderRadius: '6px',
                }}
              >
                Message sent — I'll get back to you within 24 hours.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: '0.85rem',
                  color: '#e07070',
                  padding: '0.75rem 1rem',
                  background: 'rgba(224,112,112,0.08)',
                  border: '1px solid rgba(224,112,112,0.2)',
                  borderRadius: '6px',
                }}
              >
                Something went wrong. Email me directly at hi.kodehaus@gmail.com
              </motion.p>
            )}
          </motion.div>

          {/* Sidebar — info + socials */}
          <motion.div variants={row} className="md:col-span-2 space-y-8">

            {/* Contact info */}
            <div
              className="p-6 rounded-lg space-y-5"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--bg-border)',
              }}
            >
              <h3
                className="font-serif"
                style={{ fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
              >
                Get In Touch
              </h3>

              {info.map((i) => (
                <div key={i.label} className="flex items-start gap-3">
                  <div style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>
                    {i.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-ghost)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>
                      {i.label}
                    </p>
                    {i.action ? (
                      <button
                        onClick={i.action}
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          transition: 'color 150ms ease',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        {i.value}
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-ghost)', marginLeft: '0.4rem' }}>
                          — {i.hint}
                        </span>
                      </button>
                    ) : (
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{i.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div
              className="p-6 rounded-lg space-y-3"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--bg-border)',
              }}
            >
              <h3
                className="font-serif mb-4"
                style={{ fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
              >
                Connect
              </h3>

              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-md transition-colors duration-150"
                  style={{
                    border: '1px solid var(--bg-border)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--bg-border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  <span style={{ color: 'inherit' }}>{s.icon}</span>
                  <div className="flex-1">
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '1px' }}>
                      {s.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-ghost)' }}>{s.sub}</p>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>

          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={row}
          className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-2"
          style={{ borderTop: '1px solid var(--bg-border)' }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--text-ghost)' }}>
            © 2025 Seyi Fatoki. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-ghost)' }}>
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}