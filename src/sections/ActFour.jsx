import { useRef, useEffect, useState } from 'react';
import StatementReveal from '../components/StatementReveal';
import { VERIFICATION_STEPS } from '../utils/constants';
import './ActFour.css';

export default function ActFour() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
          setActiveStep(i);
        }, i * 600)); // 600ms per step
      }
      return () => timeouts.forEach(clearTimeout);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="act-four" id="how-it-works">
      <div className={`act-four__content ${isVisible ? 'act-four__content--visible' : ''}`}>
        
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

        <div className="act-four__sequence">
          {VERIFICATION_STEPS.map((step, i) => {
            // A step is revealed if the sequence has reached it.
            const isRevealed = i < activeStep;
            
            return (
              <div
                key={step.id}
                className={`act-four__step ${isRevealed ? 'act-four__step--revealed' : ''}`}
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
