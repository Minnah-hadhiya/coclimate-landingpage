import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import StatementReveal from '../components/StatementReveal';
import MagneticButton from '../components/MagneticButton';
import './ActOne.css';

const HeroScene = lazy(() => import('../scenes/HeroScene'));

export default function ActOne({ isMobile = false }) {
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
    <section ref={sectionRef} className="act-one" id="discover">
      <div className="act-one__canvas">
        {isVisible && (
          <Suspense fallback={null}>
            <HeroScene progress={progress} isMobile={isMobile} />
          </Suspense>
        )}
      </div>

      <div className="act-one__content">
        <div className="act-one__hero-text">
          <StatementReveal
            text="The planet doesn't need promises."
            className="t-display act-one__headline"
            tag="h1"
          />
          <StatementReveal
            text="It needs proof."
            className="t-display act-one__headline act-one__headline--accent"
            tag="h1"
            delay={600}
          />
          
          <p className="t-subheading act-one__sub" style={{ opacity: 0, animation: 'fadeInUp 1s ease 0.8s forwards' }}>
            Land-based climate projects, fully monitored with technology. Carbon-free zones, green auditing, and carbon credit pre-certification — with proofs you can verify.
          </p>

          <div className="act-one__cta-group" style={{ opacity: 0, animation: 'fadeInUp 1s ease 1.2s forwards' }}>
            <MagneticButton href="#contact">Schedule a Call</MagneticButton>
            <MagneticButton href="#how-it-works" className="magnetic-btn--outline">See How It Works</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
