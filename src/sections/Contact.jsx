import StatementReveal from '../components/StatementReveal';
import './Contact.css';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__content">
        <div className="contact__grid">
          
          <div className="contact__text">
            <span className="contact__label t-label">Schedule a Call</span>
            <StatementReveal
              text="Tell us what you are trying to grow."
              className="t-display contact__headline"
              tag="h2"
            />
            <p className="contact__sub t-statement">
              We create accounts by invitation. The first step is a conversation about the land, the timelines, and what you need to prove. Twenty minutes is usually enough.
            </p>

            <div className="contact__info">
              <div className="contact__info-row">
                <span className="t-label contact__info-label">Address</span>
                <span className="t-statement contact__info-value">Coimbatore, Tamil Nadu<br />Palakkad, Kerala</span>
              </div>
              <div className="contact__info-row">
                <span className="t-label contact__info-label">Phone</span>
                <a href="tel:+916238409297" className="t-statement contact__info-value contact__info-link">+91 62384 09297</a>
              </div>
              <div className="contact__info-row">
                <span className="t-label contact__info-label">Email</span>
                <a href="mailto:outreach.coclimate@gmail.com" className="t-statement contact__info-value contact__info-link">outreach.coclimate@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="contact__form-wrapper glass">
            <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label className="t-label form-label">Your Name</label>
                  <input type="text" className="form-input" placeholder="Jane Doe" autoComplete="name" />
                </div>
                <div className="form-group">
                  <label className="t-label form-label">Work Email</label>
                  <input type="email" className="form-input" placeholder="jane@company.com" autoComplete="email" />
                </div>
              </div>
              
              <div className="form-group">
                <label className="t-label form-label">Organisation</label>
                <input type="text" className="form-input" placeholder="Company or project name" autoComplete="organization" />
              </div>

              <div className="form-group">
                <label className="t-label form-label">Your Role</label>
                <input type="text" className="form-input" placeholder="Sustainability lead, founder, programme manager" autoComplete="organization-title" />
              </div>

              <div className="form-group">
                <label className="t-label form-label">What are you looking after?</label>
                <input type="text" className="form-input" placeholder="40 acres across three sites, or 12,000 saplings" />
              </div>

              <div className="form-group">
                <label className="t-label form-label">Anything we should know before the call?</label>
                <textarea className="form-input form-textarea" placeholder="Tell us about your project or goal..." rows={3}></textarea>
              </div>

              <button type="submit" className="contact__submit">Request a Call</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
