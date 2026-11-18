import React, { useRef, useEffect } from 'react';

export default function AuraAiOrb({ state = 'idle', size = 68, onClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const center = size / 2;
    const radius = size * 0.32;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      time += state === 'thinking' ? 0.08 : state === 'listening' ? 0.06 : 0.03;

      // Outer ethereal divine aura
      const pulse = Math.sin(time) * 4;
      const auraGrad = ctx.createRadialGradient(
        center, center, radius * 0.4,
        center, center, radius + 14 + pulse
      );
      auraGrad.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
      auraGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.25)');
      auraGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

      ctx.beginPath();
      ctx.arc(center, center, radius + 14 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // Rotating celestial rings
      for (let r = 0; r < 2; r++) {
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(time * (r === 0 ? 0.8 : -0.6) + (r * Math.PI) / 3);
        ctx.scale(1, 0.45);

        ctx.beginPath();
        ctx.arc(0, 0, radius + 4 + r * 5, 0, Math.PI * 2);
        ctx.strokeStyle = r === 0 ? 'rgba(255, 215, 0, 0.75)' : 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Tiny stardust bead on orbit
        ctx.beginPath();
        ctx.arc(radius + 4 + r * 5, 0, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      // Core Divine Orb Sphere
      const sphereGrad = ctx.createRadialGradient(
        center - radius * 0.3, center - radius * 0.3, radius * 0.1,
        center, center, radius
      );
      sphereGrad.addColorStop(0, '#FFFBEB');
      sphereGrad.addColorStop(0.3, '#F59E0B');
      sphereGrad.addColorStop(0.7, '#1E3A8A');
      sphereGrad.addColorStop(1, '#0B132B');

      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 12;
      ctx.fill();

      // Ethereal specular starlight highlight
      ctx.beginPath();
      ctx.arc(center - radius * 0.32, center - radius * 0.32, radius * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.shadowBlur = 4;
      ctx.fill();

      // If listening: sound wave ripples
      if (state === 'listening') {
        ctx.beginPath();
        ctx.arc(center, center, radius + (time * 18) % 18, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${1 - ((time * 18) % 18) / 18})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [state, size]);

  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full transition-transform active:scale-95"
      aria-label="AURA AI Assistant"
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="cursor-pointer transition-transform duration-300 group-hover:scale-110"
      />
      {/* Online indicator badge */}
      <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-midnight-950 shadow-sm shadow-emerald-400 animate-pulse" />
    </button>
  );
}
