import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import StatementReveal from '../components/StatementReveal';
import './ActTwo.css';

const ObservationScene = lazy(() => import('../scenes/ObservationScene'));

export default function ActTwo({ isMobile = false }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      // If the section is taller than viewport, we track progress through it
      const total = Math.max(1, sectionHeight - viewportHeight);
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="act-two" id="observe">
      <div className="act-two__content">
        <div className="act-two__hero-text">
          <span className="act-two__label t-label">In the Field</span>
          <StatementReveal
            text="Observe every hectare."
            className="t-display act-two__headline"
            tag="h2"
          />
          <p className="t-subheading act-two__sub" style={{ opacity: 0, animation: 'fadeInUp 1s ease 0.8s forwards' }}>
            We monitor the health, growth, and environmental conditions of every project using satellite and on-the-ground data.
          </p>
        </div>
      </div>
    </section>
  );
}
