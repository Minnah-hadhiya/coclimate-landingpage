import { useRef, useEffect, useState } from 'react';
import StatementReveal from '../components/StatementReveal';
import { VERIFICATION_STEPS } from '../utils/constants';
import './ActFour.css';

export default function ActFour() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);

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

  useEffect(() => {
    if (isVisible) {
      // Sequence timing: reveal steps one by one
      const timeouts = [];
      for (let i = 0; i <= 4; i++) {
        timeouts.push(setTimeout(() => {
          setRevealedSteps(i);
        }, i * 600)); // 600ms per step
      }
      return () => timeouts.forEach(clearTimeout);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="act-four" id="how-it-works">
      <div className={`act-four__content ${isVisible ? 'act-four__content--visible' : ''}`}>
        
        {/* Header with field image card */}
        <div className="act-four__header-split">
          <div className="act-four__header">
            <span className="act-four__label t-label">How It Works</span>
            <StatementReveal
              text="An impact report you can check, not just trust."
              className="t-headline"
              tag="h2"
            />
            <p className="act-four__subtext t-statement">
              Every approved count becomes a monitoring record. What comes out is a verifiable trail of evidence — photographs, GPS, and dates — signed off by a named reviewer.
            </p>
          </div>

          {/* Field image card — evidence from the ground */}
          <div className={`act-four__field-card ${isVisible ? 'act-four__field-card--visible' : ''}`}>
            <div className="act-four__field-image-wrapper">
              <img
                src="/images/cinematic/field_closeup.jpg"
                alt="Ground-level view of monitored trees and vegetation"
                className="act-four__field-image"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="act-four__field-meta">
              <span className="act-four__field-tag t-label">Field Evidence</span>
              <span className="act-four__field-date t-mono">Aug 2026</span>
            </div>
          </div>
        </div>

        <div className="act-four__sequence">
          {VERIFICATION_STEPS.map((step, i) => {
            // A step is revealed if the sequence has reached it.
            const isRevealed = i < revealedSteps;
            const isHovered = hoveredStep === i;
            
            return (
              <div
                key={step.id}
                className={`act-four__step ${isRevealed ? 'act-four__step--revealed' : ''} ${isHovered ? 'act-four__step--hovered' : ''}`}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className="act-four__step-header">
                  <span className="act-four__step-num t-mono">0{i + 1}</span>
                  <div className="act-four__step-line-wrapper">
                    <div className="act-four__step-line"></div>
                  </div>
                </div>
                
                <div className="act-four__step-body">
                  <h3 className="act-four__step-title">{step.label}</h3>
                  <div className="act-four__step-desc-wrapper">
                    <p className="act-four__step-desc">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
