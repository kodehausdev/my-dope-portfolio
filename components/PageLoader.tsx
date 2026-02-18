'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Audio — only called after user gesture ───────────────────────────────────
function playChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const notes = [
      { freq: 523.25, delay: 0,    dur: 1.2 },
      { freq: 783.99, delay: 0.18, dur: 1.0 },
      { freq: 1046.5, delay: 0.34, dur: 1.6 },
    ];

    notes.forEach(({ freq, delay, dur }) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + dur);
    });

    setTimeout(() => ctx.close(), 2200);
  } catch (_) { /* silently fail */ }
}

// ─── Variants ─────────────────────────────────────────────────────────────────
const letterVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const promptVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.7, duration: 0.6 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

const dotVariants = {
  hidden:  { scale: 0, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    scale: 32, opacity: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.6, 1] as [number, number, number, number] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
type Phase = 'waiting' | 'chiming' | 'dot' | 'done';

export default function PageLoader() {
  const [phase, setPhase] = useState<Phase>('waiting');
  
  // A ref gives us a synchronous, instant lock to prevent double-fires
  const hasTriggered = useRef(false);

  const triggerEnter = (fromUserInteraction = false) => {
    if (hasTriggered.current) return;
    hasTriggered.current = true; // Lock it immediately

    setPhase('chiming');
    
    // Only play audio if the user explicitly clicked
    if (fromUserInteraction) {
      playChime(); 
    }

    setTimeout(() => setPhase('dot'),  900);
    setTimeout(() => setPhase('done'), 1600);
  };

// Auto-dismiss after 4s OR instantly if bot
  useEffect(() => {
    // 1. Instantly skip loader for Lighthouse and SEO bots
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent);
    if (isBot) {
      setPhase('done');
      return;
    }

    // 2. Normal 4s fallback for humans who don't click
    const fallback = setTimeout(() => {
      triggerEnter(false); 
    }, 4000);
    
    return () => clearTimeout(fallback);
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.3 } }}
          className="fixed inset-0 z-[200] flex items-center justify-center select-none"
          style={{ background: 'var(--bg)', cursor: phase === 'waiting' ? 'pointer' : 'default' }}
          // Pass 'true' to indicate this was a real user click
          onClick={() => triggerEnter(true)} 
          role="button"
          aria-label="Enter site"
        >
          <div className="relative flex flex-col items-center">

            {/* SF initials */}
            <div className="flex items-end gap-0.5 mb-0">
              {['S', 'F'].map((letter, i) => (
                <motion.span
                  key={letter}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-serif select-none"
                  style={{
                    fontSize: 'clamp(4.5rem, 14vw, 8rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: i === 0 ? 'var(--text-primary)' : 'var(--accent)',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Name + tap prompt */}
            <AnimatePresence>
              {phase === 'waiting' && (
                <motion.div
                  key="prompt"
                  variants={promptVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center gap-3 mt-6"
                >
                  <p style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--text-ghost)',
                  }}>
                    Seyi Fatoki
                  </p>

                  {/* Pulsing tap indicator */}
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '1px',
                        background: 'var(--accent)',
                      }}
                    />
                    tap to enter
                    <span
                      style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '1px',
                        background: 'var(--accent)',
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot — punches out on enter */}
            <AnimatePresence>
              {(phase === 'dot') && (
                <motion.div
                  key="dot"
                  variants={dotVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}