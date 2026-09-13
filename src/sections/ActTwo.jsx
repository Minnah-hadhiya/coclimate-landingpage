import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatementReveal from '../components/StatementReveal';
import './ActTwo.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Act Two — "Observe every hectare."
 *
 * Editorial split: headline left, aerial image card right.
 * The aerial image is editorial material WITHIN the layout, not a background.
 *
 * Interactions:
 * - Text enters first, card enters with slight delay (staggered choreography)
 * - Card has subtle parallax (moves slightly slower than text)
 * - Image crop shifts subtly as user scrolls (object-position animation)
 * - Card bottom overlaps into Evidence section for visual continuity
 * - Card has coordinate/monitoring metadata to feel like evidence material
 */
export default function ActTwo({ isMobile = false }) {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textCol = textColRef.current;
    const card = cardRef.current;
    const image = imageRef.current;
    if (!section || !textCol || !card || !image) return;

    const timer = setTimeout(() => {
      // Text column enters: staggered reveal
      gsap.fromTo(textCol,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Card enters: delayed, with slight rotation settling
      gsap.fromTo(card,
        { opacity: 0, y: 70, rotation: -1.5 },
        {
          opacity: 1, y: 0, rotation: 0,
          duration: 1.2,
          ease: 'expo.out',
          delay: 0.25,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Card parallax: moves at 0.95x scroll speed (subtle depth)
      if (!isMobile) {
        gsap.to(card, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Image crop shift: subtle pan across the monitored area
      gsap.fromTo(image,
        { objectPosition: 'center 40%' },
        {
          objectPosition: 'center 60%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section || t.trigger === card) t.kill();
      });
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="act-two" id="observe">
      <div className="act-two__inner">

        <div className="act-two__split">

          {/* Text column */}
          <div ref={textColRef} className="act-two__text-col">
            <span className="act-two__label t-label">In the Field</span>
            <StatementReveal
              text="Observe every hectare."
              className="t-headline act-two__headline"
              tag="h2"
            />
            <p className="t-statement act-two__sub">
              We monitor the health, growth, and environmental conditions of every project using satellite and on-the-ground data. Every tree is counted. Every count is reviewed by a human.
            </p>
            
            {/* Editorial Information Block */}
            <div className="act-two__info-block">
              <span className="act-two__info-label t-label">What we observe</span>
              <div className="act-two__info-list">
                <span className="act-two__info-item">Tree health</span>
                <span className="act-two__info-dot">·</span>
                <span className="act-two__info-item">Survival</span>
                <span className="act-two__info-dot">·</span>
                <span className="act-two__info-item">Site condition</span>
                <span className="act-two__info-dot">·</span>
                <span className="act-two__info-item">Environmental change</span>
              </div>
            </div>
          </div>

          {/* Aerial image card */}
          <div ref={cardRef} className="act-two__card">
            <div className="act-two__card-image-wrapper">
              <img
                ref={imageRef}
                src="/images/cinematic/aerial_forest_network.jpg"
                alt="Aerial view of monitored forest landscape with network overlay"
                className="act-two__card-image"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="act-two__card-meta">
              <span className="act-two__card-coord t-mono">10°46'N 76°39'E</span>
              <span className="act-two__card-tag t-label">Active Node Network</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
