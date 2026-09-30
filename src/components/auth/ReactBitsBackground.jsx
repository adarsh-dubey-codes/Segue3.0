import React, { useEffect, useRef } from 'react';

export default function ReactBitsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Particle system for ambient sparkles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
    }));

    // Dynamic wave parameters (ReactBits Waves style)
    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear canvas with base warm cream color
      ctx.fillStyle = '#FFF7F8';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw large ambient radial gradient orbs (Pitch UI style mesh background)
      const orb1X = width * 0.25 + Math.sin(time * 0.5) * 60 + (mouse.x - width / 2) * 0.05;
      const orb1Y = height * 0.3 + Math.cos(time * 0.4) * 40 + (mouse.y - height / 2) * 0.05;
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, width * 0.45);
      grad1.addColorStop(0, 'rgba(253, 227, 235, 0.75)');
      grad1.addColorStop(0.6, 'rgba(254, 240, 244, 0.35)');
      grad1.addColorStop(1, 'rgba(255, 247, 248, 0)');
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(orb1X, orb1Y, width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      const orb2X = width * 0.75 + Math.cos(time * 0.6) * 70 + (mouse.x - width / 2) * 0.03;
      const orb2Y = height * 0.7 + Math.sin(time * 0.5) * 50 + (mouse.y - height / 2) * 0.03;
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, width * 0.5);
      grad2.addColorStop(0, 'rgba(246, 203, 215, 0.55)');
      grad2.addColorStop(0.5, 'rgba(253, 231, 237, 0.25)');
      grad2.addColorStop(1, 'rgba(255, 247, 248, 0)');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(orb2X, orb2Y, width * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Deep plum accent subtle glow orb in center bottom
      const orb3X = width * 0.5 + Math.sin(time * 0.3) * 30;
      const orb3Y = height * 0.85 + Math.cos(time * 0.3) * 20;
      const grad3 = ctx.createRadialGradient(orb3X, orb3Y, 5, orb3X, orb3Y, width * 0.35);
      grad3.addColorStop(0, 'rgba(110, 44, 75, 0.06)');
      grad3.addColorStop(0.7, 'rgba(236, 115, 143, 0.03)');
      grad3.addColorStop(1, 'rgba(255, 247, 248, 0)');
      ctx.fillStyle = grad3;
      ctx.beginPath();
      ctx.arc(orb3X, orb3Y, width * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw smooth organic wave ribbons (ReactBits Threads / Waves background)
      const waveColors = [
        'rgba(236, 115, 143, 0.12)',
        'rgba(246, 185, 200, 0.18)',
        'rgba(110, 44, 75, 0.05)',
      ];

      waveColors.forEach((color, i) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        const waveY = height * (0.45 + i * 0.18);
        ctx.moveTo(0, height);
        ctx.lineTo(0, waveY);

        for (let x = 0; x <= width; x += 30) {
          const distortion = Math.sin(x * 0.003 + time + i * 1.5) * 35 
            + Math.cos(x * 0.007 - time * 0.7) * 20
            + (mouse.y - height / 2) * 0.02;
          ctx.lineTo(x, waveY + distortion);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      });

      // 3. Draw ambient sparkling particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(time + p.y * 0.01) * 0.2;
        p.opacity += Math.sin(time * 5 + p.x) * p.pulse;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(236, 115, 143, ${Math.max(0.1, Math.min(0.75, p.opacity))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {/* Pitch UI Tactile Linen Noise Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
