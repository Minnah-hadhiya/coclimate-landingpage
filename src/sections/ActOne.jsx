import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatementReveal from '../components/StatementReveal';
import MagneticButton from '../components/MagneticButton';
import './ActOne.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Act One — "The planet doesn't need promises. It needs proof."
 *
 * Multi-layer depth composition hero:
 * - Layer 1 (back): hero_landscape.jpg — the main panoramic landscape
 * - Layer 2 (front): hero_foreground.jpg — close vegetation framing, blended via mix-blend-mode
 * - Layer 3 (atmosphere): CSS-driven haze/fog drift
 *
 * Each layer moves independently on scroll (different parallax rates) and has
 * its own subtle CSS sway animation, creating genuine spatial depth.
 *
 * GSAP ScrollTrigger handles:
 * - Hero text fade-out as user scrolls
 * - Layer parallax rates (back slower, front faster)
 * - Smooth handoff into the Observe section
 */
export default function ActOne({ isMobile = false }) {
  const sectionRef = useRef(null);
  const backLayerRef = useRef(null);
  const frontLayerRef = useRef(null);
  const textRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const backLayer = backLayerRef.current;
    const frontLayer = frontLayerRef.current;
    const textEl = textRef.current;
    if (!section || !backLayer || !frontLayer || !textEl) return;

    // Wait for layout
    const timer = setTimeout(() => {
      // Hero text fades out and shifts up as user scrolls past 30% of section
      gsap.to(textEl, {
        opacity: 0,
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '40% top',
          scrub: true,
        },
      });

      // Back layer: very slow parallax (moves at 0.85x scroll speed)
      gsap.to(backLayer, {
        yPercent: isMobile ? 5 : 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Front layer: faster parallax (moves at 1.15x relative to back)
      gsap.to(frontLayer, {
        yPercent: isMobile ? -3 : -8,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="act-one" id="discover">

      {/* Layer 1 (back): Main landscape — distant mountains, valley, sky */}
      <div className="act-one__layer act-one__layer--back">
        <img
          ref={backLayerRef}
          src="/images/cinematic/hero_landscape_green.jpg"
          alt="Forested valley landscape at golden hour"
          className={`act-one__layer-img ${isLoaded ? 'act-one__layer-img--loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Layer 2 (front): Foreground vegetation framing — creates depth */}
      <div className="act-one__layer act-one__layer--front">
        <img
          ref={frontLayerRef}
          src="/images/cinematic/hero_foreground.jpg"
          alt=""
          className="act-one__layer-img act-one__layer-img--front"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Layer 3: Atmospheric haze drift */}
      <div className="act-one__haze" />

      {/* Hero content */}
      <div className="act-one__content" ref={textRef}>
        <div className="act-one__text">
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

      {/* Scroll indicator */}
      <div className="act-one__scroll-hint" style={{ opacity: 0, animation: 'fadeInUp 1s ease 1.8s forwards' }}>
        <div className="act-one__scroll-line" />
      </div>
    </section>
  );
}
