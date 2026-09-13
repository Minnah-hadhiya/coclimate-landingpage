import { useRef, useEffect, useState } from 'react';
import StatementReveal from '../components/StatementReveal';
import './Coda.css';

/**
 * Coda — Final emotional return to the land
 * 
 * After technology, data, and platform:
 * the visual language becomes simpler again.
 * 
 * "Proof the trees are still standing."
 * 
 * This is the quietest and strongest moment of the website.
 */
export default function Coda() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="coda" id="coda">
      {/* Environmental landscape background — return to the land */}
      <div className="coda__landscape-container">
        <img
          src="/images/cinematic/landscape_return.jpg"
          alt=""
          className={`coda__landscape ${imageLoaded ? 'coda__landscape--loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
          decoding="async"
        />
        <div className="coda__overlay" />
      </div>

      <div className="coda__content">
        <div className={`coda__main ${isVisible ? 'coda__main--visible' : ''}`}>
          <div className="coda__hero-text-mask" />
          <StatementReveal
            text="Proof the trees are still standing."
            className="t-display coda__headline"
            tag="h2"
          />

          <div className="coda__actions">
            <a href="#discover" className="coda__btn coda__btn--outline">Back to top</a>
          </div>
        </div>

        <footer className="coda__footer">
          <div className="coda__footer-left">
            <span className="coda__footer-logo">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(30 50 50)">
                  <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="12" strokeDasharray="198.968 39.793" strokeLinecap="butt" />
                  <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="12" strokeDasharray="115.192 23.038" strokeLinecap="butt" />
                </g>
              </svg>
              Co-Climate
            </span>
            <span className="coda__footer-copy t-label">© {new Date().getFullYear()}</span>
          </div>

          <div className="coda__footer-links">
            <a href="https://www.linkedin.com/company/co-climate/" target="_blank" rel="noreferrer" className="coda__footer-link t-label">LinkedIn</a>
            <a href="https://www.instagram.com/co.climate/" target="_blank" rel="noreferrer" className="coda__footer-link t-label">Instagram</a>
            <a href="mailto:outreach.coclimate@gmail.com" className="coda__footer-link t-label">Email</a>
          </div>

          <div className="coda__footer-right">
            <span className="t-mono" style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
              COIMBATORE & PALAKKAD, INDIA
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
