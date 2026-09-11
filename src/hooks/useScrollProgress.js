import { useState, useEffect } from 'react';

/**
 * Track scroll progress (0 to 1) of a ref element
 * If no ref provided, tracks overall page scroll
 */
export function useScrollProgress(ref = null) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = ref.current.offsetHeight;
        const totalScroll = elementHeight - windowHeight;
        const scrolled = -rect.top;
        setProgress(Math.max(0, Math.min(1, scrolled / totalScroll)));
      } else {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        setProgress(totalScroll > 0 ? Math.max(0, Math.min(1, scrolled / totalScroll)) : 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
}
