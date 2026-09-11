import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('coclimate-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > lastScrollY && currentY > 400);
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isHome = location.pathname === '/';

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''} ${hidden ? 'nav--hidden' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__brand">
          <svg className="nav__logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(30 50 50)">
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="12" strokeDasharray="198.968 39.793" strokeLinecap="butt" />
              <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="12" strokeDasharray="115.192 23.038" strokeLinecap="butt" />
            </g>
          </svg>
          <span className="nav__logo-text">Co-Climate</span>
        </Link>

        <div className="nav__links">
          {isHome ? (
            <>
              <a href="#platform" className="nav__link t-label">The Platform</a>
              <a href="#how-it-works" className="nav__link t-label">How It Works</a>
              <a href="#services" className="nav__link t-label">Services</a>
              <a href="#contact" className="nav__link t-label">Contact</a>
            </>
          ) : (
            <>
              <a href="/#platform" className="nav__link t-label">The Platform</a>
              <a href="/#how-it-works" className="nav__link t-label">How It Works</a>
              <a href="/#services" className="nav__link t-label">Services</a>
              <a href="/#contact" className="nav__link t-label">Contact</a>
            </>
          )}
          
          <button className="nav__theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
          
          <div className="nav__divider"></div>
          
          <Link to="/login" className="nav__link t-label">Sign In</Link>
          <Link to="/signup" className="nav__cta t-label">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
