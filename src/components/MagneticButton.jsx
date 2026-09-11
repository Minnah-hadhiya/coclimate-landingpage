import { useRef, useEffect, useCallback } from 'react';
import './MagneticButton.css';

export default function MagneticButton({ children, href, onClick, className = '' }) {
  const btnRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current;
    const text = textRef.current;
    if (!btn || !text) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const strength = 0.3;
    const textStrength = 0.5;

    btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    text.style.transform = `translate(${x * textStrength}px, ${y * textStrength}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    const text = textRef.current;
    if (!btn || !text) return;

    btn.style.transform = 'translate(0, 0)';
    text.style.transform = 'translate(0, 0)';
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    // Create a larger hit area for the magnetic effect
    const parent = btn.parentElement;
    if (!parent) return;

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const Tag = href ? 'a' : 'button';
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };

  return (
    <div className="magnetic-wrapper">
      <Tag ref={btnRef} className={`magnetic-btn ${className}`} {...props}>
        <span ref={textRef} className="magnetic-btn__text">{children}</span>
        <span className="magnetic-btn__glow" />
      </Tag>
    </div>
  );
}
