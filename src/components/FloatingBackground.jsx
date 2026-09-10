import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FloatingBackground() {
  const containerRef = useRef(null);
  const cursorBlobRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const targetX = clientX - 150;
      const targetY = clientY - 150;

      if (cursorBlobRef.current) {
        gsap.to(cursorBlobRef.current, {
          x: targetX,
          y: targetY,
          duration: 1.8,
          overwrite: 'auto',
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Deep Space Background Mesh */}
      <div className="absolute inset-0 bg-[#080c16] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,41,59,0.5),rgba(255,255,255,0))]" />

      {/* Mouse Following Gravity Blob */}
      <div
        ref={cursorBlobRef}
        className="absolute top-0 left-0 w-80 h-80 rounded-full bg-gradient-to-r from-amber-500/15 to-yellow-600/10 blur-[100px] transition-opacity duration-700"
      />

      {/* Ambient Floating Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] animate-pulse-blob" />
      <div className="absolute top-2/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-blue-600/10 blur-[140px] animate-pulse-blob [animation-delay:3s]" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-amber-400/10 blur-[110px] animate-pulse-blob [animation-delay:6s]" />

      {/* Subtle Dust & Floating Star Spec Grid */}
      <div 
        className="absolute inset-0 opacity-15" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
}
