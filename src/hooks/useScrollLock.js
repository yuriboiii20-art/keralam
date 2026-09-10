import { useLayoutEffect } from 'react';
let locks = 0;
let previousOverflow;
// Keep overlapping overlays from releasing each other's scroll lock.
export default function useScrollLock(active) {
  useLayoutEffect(() => {
    if (!active) return;
    if (locks++ === 0) {
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      if (--locks === 0) document.documentElement.style.overflow = previousOverflow;
    };
  }, [active]);
}
