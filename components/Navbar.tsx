'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home',       id: 'hero'       },
  { name: 'About',      id: 'about'      },
  { name: 'Skills',     id: 'skills'     },
  { name: 'Projects',   id: 'projects'   },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact',    id: 'contact'    },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeId,    setActiveId]    = useState('hero');

  // Scrolled state — show border after 50px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(14,14,12,0.92)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--bg-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              style={{
                fontFamily: 'var(--font-dm-serif), serif',
                fontSize: '1.15rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Seyi<span style={{ color: 'var(--accent)' }}>.F</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="nav-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 0',
                    color: activeId === item.id
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                  }}
                >
                  {item.name}
                  {/* Active underline */}
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: '-2px',
                      height: '1px',
                      width: activeId === item.id ? '100%' : '0%',
                      background: 'var(--accent)',
                      transition: 'width 250ms ease',
                    }}
                  />
                </button>
              ))}

              <a
                href="/Seyi_Fatoki_Resume.pdf"
                download
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
              >
                Resume
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5"
              style={{
                color: 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={menuOpen ? 'open' : 'closed'}
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              style={{
                background: 'rgba(14,14,12,0.97)',
                borderTop: '1px solid var(--bg-border)',
                backdropFilter: 'blur(12px)',
                overflow: 'hidden',
              }}
            >
              <div className="px-6 py-5 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="block w-full text-left py-2.5 px-3 rounded-md transition-colors duration-150"
                    style={{
                      fontSize: '0.9rem',
                      color: activeId === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                      background: activeId === item.id ? 'var(--bg-surface)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {item.name}
                  </button>
                ))}

                <div className="pt-3">
                  <a
                    href="/Seyi_Fatoki_Resume.pdf"
                    download
                    className="btn-primary w-full justify-center"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}