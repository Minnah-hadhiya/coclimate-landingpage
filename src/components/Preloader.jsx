/**import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Preloader.css';

/**
 * Co-Climate Logo Intro Sequence
 * A sophisticated, premium loading sequence that uses the actual
 * Co-Climate logo geometry as a circular spinner.
 */
/**export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // loading -> done
  const shouldReduceMotion = useReducedMotion();
  
  const controlsGroup = useAnimation();
  const controlsGradient = useAnimation();
  const controlsWordmark = useAnimation();
  const controlsContainer = useAnimation();

  useEffect(() => {
    async function sequence() {
      if (shouldReduceMotion) {
        // Fallback for accessibility: No spinning
        controlsGradient.set({ stopColor: "var(--signal)" });
        await controlsWordmark.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } });
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        // Initial setup
        controlsGroup.set({ rotate: 0 });
        controlsGradient.set({ stopColor: "var(--canopy)" }); // A subtle, darker green for the gradient
        controlsWordmark.set({ opacity: 0, y: 15 });

        // Stage 1 & 2: Circular Loading Motion & Deceleration
        // Rotate the entire logo perfectly in place
        controlsGroup.start({
          rotate: 720, // 2 full spins
          transition: { 
            duration: 2.4, 
            ease: [0.16, 1, 0.3, 1] // Custom premium mechanical deceleration
          }
        });

        // Crossfade the gradient into solid green as it settles
        controlsGradient.start({
          stopColor: "var(--signal)",
          transition: { duration: 0.8, delay: 1.6, ease: "easeInOut" }
        });

        // Wait for rotation to perfectly settle
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Stage 3: Reveal wordmark elegantly
        await controlsWordmark.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" }
        });

        // Stage 4: Hold briefly to register the brand
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      // Stage 5: Transition to Hero seamlessly
      setPhase('revealing');
      await controlsContainer.start({
        opacity: 0,
        transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
      });

      setPhase('done');
      onComplete?.();
    }

    sequence();
  }, [controlsGroup, controlsGradient, controlsWordmark, controlsContainer, onComplete, shouldReduceMotion]);

  if (phase === 'done') return null;

  return (
    <motion.div 
      className="preloader" 
      animate={controlsContainer}
      style={{ pointerEvents: phase === 'revealing' ? 'none' : 'auto' }}
    >
      <div className="preloader__content">
        <div className="preloader__logo-container">
          <svg className="preloader__logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--signal)" />
                <motion.stop offset="100%" animate={controlsGradient} />
              </linearGradient>
            </defs>
            
            <motion.g 
              animate={controlsGroup} 
              style={{ originX: '50px', originY: '50px' }}
            >
              {/* Outer C */
/**<circle 
  cx="50" cy="50" r="38" 
  stroke="url(#spinner-grad)" 
  strokeWidth="12" 
  strokeDasharray="198.968 39.793" 
  strokeLinecap="butt" 
  transform="rotate(30 50 50)" 
/>
{/* Inner C */
/**<circle 
  cx="50" cy="50" r="22" 
  stroke="url(#spinner-grad)" 
  strokeWidth="12" 
  strokeDasharray="115.192 23.038" 
  strokeLinecap="butt" 
  transform="rotate(30 50 50)" 
/>
</motion.g>
</svg>
</div>
 
<motion.div className="preloader__wordmark" animate={controlsWordmark}>
Co-Climate
</motion.div>
</div>
</motion.div>
);
} */

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Preloader.css';

import logo from '../assets/coclimate-mark.svg';

/**
* Co-Climate Logo Intro Sequence
*
* Uses the ORIGINAL Co-Climate SVG.
* The logo geometry is never recreated in CSS/SVG.
* Animation is applied directly to the real logo.
*/
export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('loading');
  const shouldReduceMotion = useReducedMotion();

  const controlsLogo = useAnimation();
  const controlsWordmark = useAnimation();
  const controlsContainer = useAnimation();

  useEffect(() => {
    let cancelled = false;

    async function sequence() {
      // Initial state
      controlsLogo.set({
        rotate: 0,
        scale: 0.92,
        opacity: 0,
      });

      controlsWordmark.set({
        opacity: 0,
        y: 14,
      });

      if (shouldReduceMotion) {
        controlsLogo.set({
          rotate: 0,
          scale: 1,
          opacity: 1,
        });

        await controlsWordmark.start({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
          },
        });

        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        /*
         * PHASE 1
         * Logo gently appears.
         */
        await controlsLogo.start({
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          },
        });

        if (cancelled) return;

        /*
         * PHASE 2
         * Smooth circular loading rotation.
         *
         * Two complete rotations.
         * The first part is energetic, then it
         * naturally decelerates into the final position.
         */
        await controlsLogo.start({
          rotate: 720,
          transition: {
            duration: 2.5,
            ease: [0.16, 1, 0.3, 1],
          },
        });

        if (cancelled) return;

        /*
         * PHASE 3
         * Tiny settling movement.
         * This makes the final logo feel intentional
         * instead of simply stopping abruptly.
         */
        await controlsLogo.start({
          rotate: 720,
          scale: 1,
          transition: {
            duration: 0.25,
            ease: 'easeOut',
          },
        });

        if (cancelled) return;

        /*
         * PHASE 4
         * Reveal brand name.
         */
        await controlsWordmark.start({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        });

        /*
         * Hold the completed brand lockup briefly.
         */
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (cancelled) return;

      /*
       * PHASE 5
       * Fade the complete preloader away.
       */
      setPhase('revealing');

      await controlsContainer.start({
        opacity: 0,
        transition: {
          duration: 1,
          ease: [0.4, 0, 0.2, 1],
        },
      });

      if (cancelled) return;

      setPhase('done');
      onComplete?.();
    }

    sequence();

    return () => {
      cancelled = true;
    };
  }, [
    controlsLogo,
    controlsWordmark,
    controlsContainer,
    onComplete,
    shouldReduceMotion,
  ]);

  if (phase === 'done') return null;

  return (
    <motion.div
      className="preloader"
      animate={controlsContainer}
      style={{
        pointerEvents: phase === 'revealing' ? 'none' : 'auto',
      }}
    >
      <div className="preloader__content">

        <div className="preloader__logo-container">
          <motion.img
            src={logo}
            alt="Co-Climate"
            className="preloader__logo"
            animate={controlsLogo}
          />
        </div>

        <motion.div
          className="preloader__wordmark"
          animate={controlsWordmark}
        >
          Co-Climate
        </motion.div>

      </div>
    </motion.div>
  );
}
