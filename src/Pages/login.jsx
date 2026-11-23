
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import { auth } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const successMessage = location.state?.message;

  // Redirect after 10 seconds
  function redirectAfterSuccess(message) {
    setSuccess(message);

    setTimeout(() => {
      navigate('/', { replace: true });
    }, 10000);
  }

  // Email and Password Login
  async function handleLogin(event) {
    event.preventDefault();

    setError('');
    setSuccess('');

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      redirectAfterSuccess('Logged in successfully! Welcome back.');

    } catch (err) {
      console.error('Login error:', err);

      setError(
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
          ? 'Email or password is incorrect. Please try again.'
          : err.code === 'auth/invalid-email'
          ? 'Please enter a valid email address.'
          : err.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  // Google Login
  async function handleGoogleLogin() {
    setError('');
    setSuccess('');

    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, provider);

      console.log('Google login successful:', result.user.email);

      redirectAfterSuccess(
        `Logged in successfully with Google! Welcome ${result.user.displayName || ''}.`
      );

    } catch (err) {
      console.error('Google login error:', err);

      setError(
        err.code === 'auth/popup-closed-by-user'
          ? 'Google login was cancelled. Please try again.'
          : err.code === 'auth/unauthorized-domain'
          ? 'This domain is not authorised in Firebase.'
          : err.message || 'Google login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">

        <p className="eyebrow">DEV@DEAKIN / CHITKARA</p>

        <h1>Welcome back</h1>

        <p className="auth-intro">
          Log in to your account to continue.
        </p>

        {successMessage && (
          <p className="auth-success" role="status">
            {successMessage}
          </p>
        )}

        {success && (
          <p className="auth-success" role="status">
            {success}
            <br />
            Redirecting to home page in 10 seconds...
          </p>
        )}

        <form className="auth-form" onSubmit={handleLogin}>

          <label htmlFor="loginEmail">
            Email address
          </label>

          <input
            id="loginEmail"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="loginPassword">
            Password
          </label>

          <input
            id="loginPassword"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !!success}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

        </form>

        <div className="google-login">

          <p>OR</p>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={loading || !!success}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />

            {loading ? 'Please wait...' : 'Continue with Google'}
          </button>

        </div>

        <p className="auth-switch">
          New to DEV@Deakin?{' '}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </section>
    </main>
  );
}

export default Login;
