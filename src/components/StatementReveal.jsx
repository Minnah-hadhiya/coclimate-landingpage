import { useEffect, useRef } from 'react';
import './StatementReveal.css';

export default function StatementReveal({ text, className = '', tag: Tag = 'p', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('statement-reveal--visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split text into words for staggered animation
  const words = text.split(' ');

  return (
    <Tag
      ref={ref}
      className={`statement-reveal ${className}`}
      style={{ '--delay': `${delay}ms` }}
    >
      {words.map((word, i) => (
        <span key={i} className="statement-reveal__word" style={{ '--i': i }}>
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
