import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import StatementReveal from '../components/StatementReveal';
import { GLOBAL_STATS } from '../utils/constants';
import './ActFive.css';

const GlobeScene = lazy(() => import('../scenes/GlobeScene'));

export default function ActFive({ isMobile = false }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ sites: 0, countries: 0, hectares: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '200px' }
    );
    observer.observe(section);

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const total = Math.max(1, sectionHeight - viewportHeight);
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);

      // Animate counters based on scroll
      const counterProgress = Math.max(0, Math.min(1, p / 0.5));
      const eased = 1 - Math.pow(1 - counterProgress, 3);
      setCounters({
        sites: Math.floor(eased * GLOBAL_STATS.sites),
        countries: Math.floor(eased * GLOBAL_STATS.countries),
        hectares: (eased * 1.2).toFixed(1),
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const statsVisible = progress > 0.1;

  return (
    <section ref={sectionRef} className="act-five" id="scale">
      <div className="act-five__canvas">
        {isVisible && (
          <Suspense fallback={null}>
            <GlobeScene progress={progress} isMobile={isMobile} />
          </Suspense>
        )}
      </div>

      <div className="act-five__content">
        <div className="act-five__grid">
          <div className="act-five__text">
            <span className="act-five__label t-label">Scale</span>
            <StatementReveal
              text="Small-scale projects. Planet-scale proof."
              className="t-headline"
              tag="h2"
            />
          </div>

          <div className={`act-five__stats ${statsVisible ? 'act-five__stats--visible' : ''}`}>
            <div className="act-five__stat">
              <span className="act-five__stat-value">{counters.sites.toLocaleString()}</span>
              <span className="act-five__stat-label t-label">Tasks Completed</span>
            </div>
            <div className="act-five__stat" style={{ '--delay': '150ms' }}>
              <span className="act-five__stat-value">{counters.countries}</span>
              <span className="act-five__stat-label t-label">Active Projects</span>
            </div>
            <div className="act-five__stat" style={{ '--delay': '300ms' }}>
              <span className="act-five__stat-value">{counters.hectares}M</span>
              <span className="act-five__stat-label t-label">Hectares Monitored</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
