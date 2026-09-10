import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const particleIdRef = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth elastic lag for trailing ring
  const springConfig = { damping: 22, stiffness: 260, mass: 0.45 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor if device has mouse/fine pointer
    const mediaQuery = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);



    const handleMouseMove = (e) => {
      if (!mediaQuery.matches) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Spawn gold cursor particle trail (lightweight canvas-less particle system)
      if (Math.random() < 0.25) {
        const newParticle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
        };
        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.glass-card-hover') ||
        target.closest('[data-cursor="expand"]');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Cleanup old particles
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.slice(1));
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  if (!isFinePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Particle Trail */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, y: p.y + 8 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: '#D4A64A',
            boxShadow: '0 0 8px #D4A64A',
          }}
        />
      ))}

      {/* Center Core Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#D4A64A] shadow-[0_0_10px_#D4A64A]"
      />

      {/* Trailing Elastic Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          borderColor: isHovered ? '#FAF7F0' : '#D4A64A',
          backgroundColor: isHovered ? 'rgba(212, 166, 74, 0.15)' : 'rgba(212, 166, 74, 0)',
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#D4A64A]/60 shadow-[0_0_15px_rgba(212,166,74,0.3)] backdrop-blur-[1px]"
      />
    </div>
  );
}
