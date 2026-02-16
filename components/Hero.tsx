'use client';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

// ─── Atmospheric Canvas ───────────────────────────────────────────────────────
const CODE_CHARS = ['01', '{}', '//', '=>', '[]', '()', '&&', '||', '**', ';;', '<>', '~', '#', 'fn', 'AI'];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  opacity: number; char: string; size: number;
}

function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -999, y: -999 });
  const frameRef  = useRef<number>(0);
  const parts     = useRef<Particle[]>([]);

  const initParticles = useCallback((w: number, h: number) => {
    parts.current = Array.from({ length: 28 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(0.12 + Math.random() * 0.2),
      opacity: 0.04 + Math.random() * 0.07,
      char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
      size: 10 + Math.random() * 6,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      initParticles(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, w, h);
      const phase = (Math.sin((ts / 12000) * Math.PI * 2) + 1) / 2;
      const g1 = ctx.createRadialGradient(w*(0.25+0.2*phase), h*0.15, 0, w*(0.25+0.2*phase), h*0.15, w*0.75);
      g1.addColorStop(0,   `rgba(196,120,90,${0.04+0.025*phase})`);
      g1.addColorStop(0.5, `rgba(91,70,55,${0.02+0.01*phase})`);
      g1.addColorStop(1,   'rgba(14,14,12,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const { x: mx, y: my } = mouseRef.current;
      if (mx > -100) {
        const g2 = ctx.createRadialGradient(mx, my, 0, mx, my, 320);
        g2.addColorStop(0,   'rgba(196,120,90,0.09)');
        g2.addColorStop(0.4, 'rgba(196,120,90,0.03)');
        g2.addColorStop(1,   'rgba(196,120,90,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, w, h);
      }

      parts.current.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -20)    { p.y = h+10; p.x = Math.random()*w; }
        if (p.x < -20)    { p.x = w+10; }
        if (p.x > w+20)   { p.x = -10; }
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = 'rgba(240,235,225,1)';
        ctx.font        = `${p.size}px "DM Mono","Fira Mono",monospace`;
        ctx.fillText(p.char, p.x, p.y);
      });
      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
    };
  }, [initParticles]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

// ─── Terminal ─────────────────────────────────────────────────────────────────
// Each session: types a command → reveals output lines one by one → pauses → clears → next
interface TerminalSession {
  cmd:    string;
  output: { text: string; color?: string }[];
}

const SESSIONS: TerminalSession[] = [
  {
    cmd: 'seyi --skills',
    output: [
      { text: '→ AI & Multi-Agent Systems',  color: '#C4785A' },
      { text: '→ React · Next.js · Node.js', color: '#F0EBE1' },
      { text: '→ Python Automation',         color: '#F0EBE1' },
      { text: '→ LLM Integration',           color: '#C4785A' },
      { text: '→ PostgreSQL · Firebase',     color: '#F0EBE1' },
    ],
  },
  {
    cmd: 'seyi --projects --live',
    output: [
      { text: '✓ OptiPropose  [multi-agent SaaS]  IN DEV', color: '#C4785A' },
      { text: '✓ HustleHawk   [job scraper bot]    LIVE',  color: '#6db87a' },
      { text: '✓ MealFlow     [Android + Firebase] LIVE',  color: '#6db87a' },
      { text: '✓ Two Truths   [social game]        LIVE',  color: '#6db87a' },
    ],
  },
  {
    cmd: 'seyi --stats',
    output: [
      { text: 'Projects shipped  →  10+', color: '#F0EBE1' },
      { text: 'Years building    →  5',   color: '#F0EBE1' },
      { text: 'Languages         →  4',   color: '#F0EBE1' },
      { text: 'Coffee consumed   →  ∞',   color: '#C4785A' },
    ],
  },
  {
    cmd: 'seyi --current-focus',
    output: [
      { text: 'Building OptiPropose agents:', color: '#8C8880' },
      { text: '  [1] ResearchAgent   ████████░░  80%', color: '#C4785A' },
      { text: '  [2] AnalysisAgent   ██████░░░░  60%', color: '#C4785A' },
      { text: '  [3] CopywriterAgent ████░░░░░░  40%', color: '#C4785A' },
      { text: 'Status: orchestration layer in progress', color: '#6db87a' },
    ],
  },
];

const TYPING_SPEED  = 48;  // ms per char
const OUTPUT_DELAY  = 180; // ms between output lines
const HOLD_TIME     = 2400; // ms to hold completed session
const CLEAR_DELAY   = 400;  // ms before clearing

type TState = 'typing' | 'outputting' | 'holding' | 'clearing';

function Terminal() {
  const [sessionIdx,  setSessionIdx]  = useState(0);
  const [typedCmd,    setTypedCmd]    = useState('');
  const [shownLines,  setShownLines]  = useState(0);
  const [tstate,      setTstate]      = useState<TState>('typing');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const session = SESSIONS[sessionIdx];

  // Clear any running timer on unmount
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  // State machine
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (tstate === 'typing') {
      if (typedCmd.length < session.cmd.length) {
        timerRef.current = setTimeout(() => {
          setTypedCmd(session.cmd.slice(0, typedCmd.length + 1));
        }, TYPING_SPEED);
      } else {
        // Command fully typed → start outputting
        timerRef.current = setTimeout(() => {
          setTstate('outputting');
        }, 300);
      }
    }

    if (tstate === 'outputting') {
      if (shownLines < session.output.length) {
        timerRef.current = setTimeout(() => {
          setShownLines(n => n + 1);
        }, OUTPUT_DELAY);
      } else {
        timerRef.current = setTimeout(() => setTstate('holding'), HOLD_TIME);
      }
    }

    if (tstate === 'holding') {
      timerRef.current = setTimeout(() => setTstate('clearing'), CLEAR_DELAY);
    }

    if (tstate === 'clearing') {
      setTypedCmd('');
      setShownLines(0);
      setSessionIdx(i => (i + 1) % SESSIONS.length);
      setTstate('typing');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tstate, typedCmd, shownLines, sessionIdx]);

  const showCursor = tstate === 'typing' || tstate === 'holding';

  return (
    <div
      className="w-full max-w-md mx-auto rounded-lg overflow-hidden"
      style={{
        background: 'rgba(14,14,12,0.85)',
        border: '1px solid var(--bg-border)',
        backdropFilter: 'blur(8px)',
        fontFamily: '"DM Mono","Fira Mono","Courier New",monospace',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: '1px solid var(--bg-border)', background: 'rgba(22,22,20,0.9)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
        <span
          className="ml-auto"
          style={{ fontSize: '0.65rem', color: 'var(--text-ghost)', letterSpacing: '0.08em' }}
        >
          seyi@kodehaus ~ zsh
        </span>
      </div>

      {/* Terminal body */}
      <div className="px-4 py-4 min-h-[9rem]">
        {/* Prompt + typed command */}
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontSize: '0.75rem', color: '#6db87a', userSelect: 'none' }}>
            ❯
          </span>
          <span style={{ fontSize: '0.75rem', color: '#F0EBE1' }}>
            {typedCmd}
            {showCursor && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                style={{ display: 'inline-block', width: '6px', height: '12px', background: 'var(--accent)', marginLeft: '2px', verticalAlign: 'middle' }}
              />
            )}
          </span>
        </div>

        {/* Output lines */}
        <div className="space-y-1 pl-4">
          {session.output.slice(0, shownLines).map((line, i) => (
            <motion.p
              key={`${sessionIdx}-${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: '0.72rem',
                color: line.color ?? '#8C8880',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
              }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Animation variants ───────────────────────────────────────────────────────
const easing: [number,number,number,number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easing } },
};

const nameContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const nameWord: Variants = {
  hidden:  { opacity: 0, y: 28, rotateX: 12 },
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
                Hi, I'm
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
              {['Seyi', 'Fatoki'].map((word) => (
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
              AI Systems & Full-Stack Developer
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="mb-3"
              style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)', color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.75 }}
            >
              Building intelligent applications with{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>AI</span>,{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Next.js (React)</span>, and{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Node.js</span>
            </motion.p>

            {/* Sub-tagline */}
            <motion.p
              variants={item}
              className="mb-10"
              style={{ fontSize: '0.9rem', color: '#6B6762', maxWidth: '420px', lineHeight: 1.75 }}
            >
              From solo scripts to multi-agent systems — I build things
              that work while you sleep.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <button onClick={() => scrollToSection('projects')} className="btn-primary">
                View My Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-outline">
                Get In Touch
              </button>
              <a href="/Seyi_Fatoki_Resume.pdf" download className="btn-outline flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={item} className="flex gap-3 justify-center lg:justify-start mb-8">
              {[
                { href: 'https://github.com/kodehausdev', label: 'GitHub',
                  path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
                },
                { href: 'https://www.linkedin.com/in/seyi-fatoki-a180a3389/', label: 'LinkedIn',
                  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                },
              ].map(({ href, label, path }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="p-2.5 rounded-md transition-colors duration-150"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)', color: 'var(--text-secondary)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent)'; el.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-secondary)'; el.style.borderColor = 'var(--bg-border)'; }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={path}/></svg>
                </a>
              ))}
              <button
                onClick={() => navigator.clipboard.writeText('hi.kodehaus@gmail.com')}
                aria-label="Copy email"
                className="p-2.5 rounded-md transition-colors duration-150"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent)'; el.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-secondary)'; el.style.borderColor = 'var(--bg-border)'; }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.button
              variants={item}
              onClick={() => scrollToSection('about')}
              className="hidden lg:flex flex-col items-start gap-1.5"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              aria-label="Scroll to about section"
            >
              <span style={{ fontSize: '0.7rem', color: '#6B6762', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Scroll to explore
              </span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </motion.div>
            </motion.button>
          </div>

          {/* Right — terminal */}
          <motion.div
            variants={item}
            className="w-full lg:w-auto lg:flex-shrink-0"
            style={{ width: '100%', maxWidth: '420px' }}
          >
            <Terminal />

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}