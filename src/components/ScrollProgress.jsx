import { useEffect, useRef } from 'react';
export default function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.max(0, Math.min(1, window.scrollY / height)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return <div aria-hidden="true" className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
    <div ref={bar} style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} className="h-full bg-gradient-to-r from-[#D4A64A] via-amber-400 to-yellow-500" />
  </div>;
}
