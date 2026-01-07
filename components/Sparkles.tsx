
import React, { useEffect, useRef } from 'react';

const Sparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100, active: false });
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const trailParticles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      color: string;

      constructor(x?: number, y?: number, isTrail = false) {
        this.x = x ?? Math.random() * (canvas?.width || window.innerWidth);
        this.y = y ?? Math.random() * (canvas?.height || window.innerHeight);
        this.size = isTrail ? Math.random() * 3 + 1 : Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * (isTrail ? 2 : 0.5);
        this.speedY = (Math.random() - 0.5) * (isTrail ? 2 : 0.5);
        this.opacity = Math.random();
        this.fadeSpeed = isTrail ? Math.random() * 0.03 + 0.02 : Math.random() * 0.01 + 0.005;
        this.color = isTrail ? '252, 211, 77' : '251, 191, 36'; // Trail is a bit brighter golden
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;

        if (this.opacity <= 0) {
          return false; // Mark for removal
        }
        return true;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update ambient background particles
      particles.forEach((p, index) => {
        if (!p.update()) {
          particles[index] = new Particle();
        }
        p.draw();
      });

      // Update and draw wand trail only if active
      if (mouseRef.current.active) {
        for (let i = 0; i < 2; i++) {
          trailParticles.push(new Particle(mouseRef.current.x, mouseRef.current.y, true));
        }
      }

      for (let i = trailParticles.length - 1; i >= 0; i--) {
        if (!trailParticles[i].update()) {
          trailParticles.splice(i, 1);
        } else {
          trailParticles[i].draw();
        }
      }

      // Keep trail buffer managed
      if (trailParticles.length > 120) trailParticles.shift();

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      
      // On desktop, stop generating after 100ms of no movement to prevent "static" trail clumps
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        mouseRef.current.active = false;
      }, 100);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
      }
    };

    const handleInteractionEnd = () => {
      mouseRef.current.active = false;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleInteractionEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleInteractionEnd);
    window.addEventListener('touchcancel', handleInteractionEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleInteractionEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleInteractionEnd);
      window.removeEventListener('touchcancel', handleInteractionEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1000]"
    />
  );
};

export default Sparkles;
