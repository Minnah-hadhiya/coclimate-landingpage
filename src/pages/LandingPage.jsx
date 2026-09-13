import { useState, useCallback } from 'react';
import { useMobile } from '../hooks/useMobile';
import Preloader from '../components/Preloader';
import Navigation from '../components/Navigation';
import ScrollProgress from '../components/ScrollProgress';
import ActOne from '../sections/ActOne';
import ActTwo from '../sections/ActTwo';
import ActFour from '../sections/ActFour';
import ProductShowcase from '../sections/ProductShowcase';
import Services from '../sections/Services';
import Contact from '../sections/Contact';
import Coda from '../sections/Coda';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  const { isMobile } = useMobile();

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      <div className={`app ${loaded ? 'app--loaded' : ''}`}>
        <Navigation />
        <ScrollProgress />

        <main className="app__main">
          {/* 1. Hero — Full-screen cinematic landscape */}
          <ActOne isMobile={isMobile} />

          {/* 2. Observe — Editorial layout with aerial image card */}
          <ActTwo isMobile={isMobile} />

          {/* 3. Evidence — Verification steps with field image card */}
          <ActFour />

          {/* 4. Platform — Clean product UI */}
          <ProductShowcase />

          {/* 5. Services */}
          <Services />

          {/* 6. Contact */}
          <Contact />

          {/* 7. Coda — Return to the land */}
          <Coda />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
