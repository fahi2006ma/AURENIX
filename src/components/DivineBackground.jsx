import React, { useEffect, useRef } from 'react';

export default function DivineBackground({ isDark = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate celestial stardust particles
    const particleCount = isDark ? 65 : 30;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.4 ? '#F59E0B' : '#38BDF8' // Gold or Cyan
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.02;

      // Draw particles & subtle constellation lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha + Math.sin(time * p.pulseSpeed * 10) * 0.2;
        const safeAlpha = Math.max(0.1, Math.min(1, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = safeAlpha * (isDark ? 0.7 : 0.4);
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Connect near particles with delicate celestial threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#F59E0B';
            ctx.globalAlpha = (1 - dist / 110) * 0.12 * (isDark ? 1 : 0.6);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Divine Atmospheric Nebulae Gradients */}
      {isDark ? (
        <>
          <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-sky-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[45vw] rounded-full bg-gradient-to-t from-midnight-800/40 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-amber-200/40 via-amber-100/20 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-sky-100/50 via-blue-100/20 to-transparent blur-3xl pointer-events-none" />
        </>
      )}

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}
