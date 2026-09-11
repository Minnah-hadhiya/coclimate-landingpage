import { Link } from 'react-router-dom';
import './Auth.css';

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <div className="auth-container glass">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="rotate(30 50 50)">
                <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="12" strokeDasharray="198.968 39.793" strokeLinecap="butt" />
                <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="12" strokeDasharray="115.192 23.038" strokeLinecap="butt" />
              </g>
            </svg>
            <span className="auth-logo-text">Co-Climate</span>
          </Link>
          <h1 className="t-headline auth-title">Get Started</h1>
        </div>

        <div className="auth-message" style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--chalk-60)' }}>
          <p className="t-statement" style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Accounts are created by invitation only.
          </p>
          <p className="t-statement" style={{ lineHeight: '1.6' }}>
            If you don't have an account yet, please ask your project manager — or{' '}
            <a href="mailto:outreach.coclimate@gmail.com" style={{ color: 'var(--signal)', textDecoration: 'none' }}>contact us directly</a>
            {' '}to schedule a call.
          </p>
        </div>

        <div className="auth-footer">
          <span className="t-label">Already have an account? </span>
          <Link to="/login" className="t-label form-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
