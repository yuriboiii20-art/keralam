import { useLayoutEffect } from 'react';

let locks = 0;
let previousBodyOverflow = '';
let previousHtmlOverflow = '';

export default function useScrollLock(active) {
  useLayoutEffect(() => {
    if (!active) return;
    if (locks++ === 0) {
      previousBodyOverflow = document.body.style.overflow;
      previousHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      if (--locks === 0) {
        document.body.style.overflow = previousBodyOverflow || '';
        document.documentElement.style.overflow = previousHtmlOverflow || '';
      }
    };
  }, [active]);
}

