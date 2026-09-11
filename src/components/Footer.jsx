import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(30 50 50)">
                  <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="12" strokeDasharray="198.968 39.793" strokeLinecap="butt" />
                  <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="12" strokeDasharray="115.192 23.038" strokeLinecap="butt" />
                </g>
              </svg>
              Co-Climate
            </Link>
            <p className="footer__desc t-label">
              Making climate action interesting and feasible. <br />
              Land-based restoration projects, fully monitored and documented with technology.
            </p>
            <p className="footer__address t-label">
              Coimbatore, Tamil Nadu &amp; Palakkad, Kerala
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <span className="t-label footer__column-title">Platform</span>
              <a href="#platform" className="footer__link">The Platform</a>
              <a href="#verify" className="footer__link">How It Works</a>
              <a href="#contact" className="footer__link">Schedule a Call</a>
            </div>
            
            <div className="footer__column">
              <span className="t-label footer__column-title">Services</span>
              <a href="#contact" className="footer__link">Carbon-Free Zones</a>
              <a href="#contact" className="footer__link">Green Auditing</a>
              <a href="#contact" className="footer__link">Carbon Credit Pre-certification</a>
            </div>

            <div className="footer__column">
              <span className="t-label footer__column-title">Connect</span>
              <a href="https://www.linkedin.com/company/co-climate/" target="_blank" rel="noreferrer" className="footer__link">LinkedIn</a>
              <a href="https://www.instagram.com/co.climate/" target="_blank" rel="noreferrer" className="footer__link">Instagram</a>
              <a href="mailto:outreach.coclimate@gmail.com" className="footer__link">outreach.coclimate@gmail.com</a>
              <a href="tel:+916238409297" className="footer__link">+91 62384 09297</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="t-label footer__copy">© {new Date().getFullYear()} Co-Climate. All rights reserved.</span>
          <div className="footer__legal">
            <Link to="/login" className="t-label footer__link">Sign In</Link>
            <a href="#" className="t-label footer__link">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
