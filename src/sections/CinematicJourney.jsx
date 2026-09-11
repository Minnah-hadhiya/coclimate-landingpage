import { useRef, useEffect, useState } from 'react';
import StatementReveal from '../components/StatementReveal';
import './CinematicJourney.css';

/**
 * CinematicJourney
 * 
 * Replaces ActOne, ActTwo, and ActThree.
 * A single continuous scroll-driven cinematic sequence:
 * EARTH → DESCENT → PROJECT → VEGETATION → MONITORING → DATA
 */
export default function CinematicJourney({ isMobile = false }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress from 0 to 1 across the entire 500vh container
      const scrolled = -rect.top;
      const total = Math.max(1, sectionHeight - viewportHeight);
      const currentProgress = Math.max(0, Math.min(1, scrolled / total));
      
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine which text layer is visible based on progress
  // 0.0 - 0.2: Hero
  // 0.2 - 0.4: Descent / Land
  // 0.4 - 0.6: Vegetation
  // 0.6 - 0.8: Monitoring
  // 0.8 - 1.0: Data Transition

  return (
    <section ref={sectionRef} className="cinematic" id="discover">
      
      {/* The sticky canvas container for the visual sequence */}
      <div className="cinematic__canvas">
        {/* Placeholder for the hybrid rendering layer (Video + Canvas) */}
        <div className="cinematic__visual-placeholder">
          <div className="t-mono" style={{ color: 'var(--chalk-40)', opacity: 0.5 }}>
            [ Cinematic Visual Layer ]<br/>
            Progress: {(progress * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* The scrollable content overlays */}
      <div className="cinematic__content">
        
        {/* 1. HERO (EARTH) */}
        <div className="cinematic__stage" style={{ opacity: progress < 0.15 ? 1 : Math.max(0, 1 - (progress - 0.15) * 10) }}>
          <div className="cinematic__text-center">
            <StatementReveal
              text="The planet doesn't need promises."
              className="t-display cinematic__headline"
              tag="h1"
            />
            <StatementReveal
              text="It needs proof."
              className="t-display cinematic__headline cinematic__headline--accent"
              tag="h1"
              delay={600}
            />
            
            <p className="cinematic__sub" style={{ opacity: 0, animation: 'fadeInUp 1s ease 0.8s forwards' }}>
              Land-based climate projects, fully monitored with technology. Carbon-free zones, green auditing, and carbon credit pre-certification — with proofs you can verify.
            </p>

            <div className="cinematic__cta-group" style={{ opacity: 0, animation: 'fadeInUp 1s ease 1.2s forwards' }}>
              <a href="#contact" className="cinematic__cta">Schedule a Call</a>
              <a href="#how-it-works" className="cinematic__cta cinematic__cta--outline">See How It Works</a>
            </div>
          </div>
        </div>

        {/* 2. PROJECT / LAND */}
        <div className="cinematic__stage" style={{ 
          opacity: progress > 0.2 && progress < 0.4 ? 1 : 
                   progress <= 0.2 ? Math.max(0, (progress - 0.15) * 20) : 
                   Math.max(0, 1 - (progress - 0.4) * 10),
          pointerEvents: progress > 0.2 && progress < 0.4 ? 'auto' : 'none'
        }}>
          <div className="cinematic__text-side">
            <h2 className="t-headline">Observe every hectare.</h2>
            <p className="t-statement cinematic__mt">
              Continuous environmental monitoring transforms invisible carbon into verifiable impact. We track real project boundaries.
            </p>
          </div>
        </div>

        {/* 3. MONITORING / DATA */}
        <div className="cinematic__stage" style={{ 
          opacity: progress > 0.6 && progress < 0.85 ? 1 : 
                   progress <= 0.6 ? Math.max(0, (progress - 0.55) * 20) : 
                   Math.max(0, 1 - (progress - 0.85) * 10),
          pointerEvents: progress > 0.6 && progress < 0.85 ? 'auto' : 'none'
        }}>
          <div className="cinematic__text-side cinematic__text-side--right">
            <h2 className="t-headline">From earth to data.</h2>
            <p className="t-statement cinematic__mt">
              Every tree, every observation, every metric becomes structured, immutable data ready for certification.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
