'use client';
import React, { useEffect, useRef, useCallback } from 'react';

const CODE_CHARS = ['01', '{}', '//', '=>', '[]', '()', '&&', '||', '**', ';;', '<>', '~', '#', 'fn', 'AI'];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  opacity: number; char: string; size: number;
}

export default function AtmosphereCanvas() {
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