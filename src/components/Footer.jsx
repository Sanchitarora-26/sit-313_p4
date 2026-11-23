import { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  function handleSubscribe(event) {
    event.preventDefault();
    setMessage(`Thanks! ${email} has been added for future updates.`);
    setEmail('');
  }
  return (
    <footer>
      <div className="newsletter" id="newsletter">
        <div><p className="eyebrow">STAY CONNECTED</p><h2>Sign up for the DEV@Deakin/Chitkara newsletter</h2><p>Enter your email to receive updates.</p></div>
        <form onSubmit={handleSubscribe}>
          <label className="sr-only" htmlFor="footer-email">Email address</label>
          <div className="form-row"><input id="footer-email" type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit">Subscribe</button></div>
          <p className="form-message" role="status" aria-live="polite">{message}</p>
        </form>
      </div>
      <div className="footer-main">
        <div><h3>Explore</h3><a href="/#top">Home</a><a href="/#about">About</a><a href="/#articles">Articles</a><a href="/#tutorials">Tutorials</a></div>
        <div><h3>Support</h3><a href="/#newsletter">Newsletter</a><a href="/#contact">Contact</a><a href="mailto:sanchit9085.ai25@chitkara.edu.in">Email me</a></div>
        <div><h3>Stay connected</h3><p>sanchit9085.ai25@chitkara.edu.in</p></div>
      </div>
      <div className="footer-bottom"><strong>DEV@Deakin/Chitkara {new Date().getFullYear()}</strong><span>Privacy Policy</span><span>Terms</span><span>Code of Conduct</span></div>
      <button className="top-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</button>
    </footer>
  );
}
export default Footer;
