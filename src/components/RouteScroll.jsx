import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
const positions = new Map();
export default function RouteScroll() {
  const { key, hash } = useLocation();
  const navigation = useNavigationType();
  useLayoutEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    let target;
    try { target = hash && document.getElementById(decodeURIComponent(hash.slice(1))); } catch { /* Invalid fragment */ }
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: navigation === 'POP' ? positions.get(key) || 0 : 0, behavior: 'instant' });
    let position = window.scrollY;
    const remember = () => { position = window.scrollY; };
    window.addEventListener('scroll', remember, { passive: true });
    return () => {
      positions.set(key, position);
      if (positions.size > 100) positions.delete(positions.keys().next().value);
      window.removeEventListener('scroll', remember);
      history.scrollRestoration = previous;
    };
  }, [key, hash, navigation]);
  return null;
}
