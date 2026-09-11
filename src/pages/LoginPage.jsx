import { Link } from 'react-router-dom';
import './Auth.css';

export default function LoginPage() {
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
          <h1 className="t-headline auth-title">Welcome back</h1>
          <p className="t-statement auth-subtitle">Enter your details to access your dashboard.</p>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="t-label form-label">Email</label>
            <input type="email" className="form-input" placeholder="name@company.com" />
          </div>

          <div className="form-group">
            <div className="form-label-group">
              <label className="t-label form-label">Password</label>
              <a href="#" className="t-label form-link">Forgot password?</a>
            </div>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>

          <div className="form-group form-checkbox">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="t-label">Remember me for 30 days</label>
          </div>

          <button type="submit" className="auth-submit">Sign In</button>
        </form>

        <div className="auth-footer">
          <span className="t-label">Don't have an account? </span>
          <Link to="/signup" className="t-label form-link">Get Started</Link>
        </div>
      </div>
    </div>
  );
}
