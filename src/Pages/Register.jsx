import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setError('');
    if (fullName.trim().split(/\s+/).length < 2) {
      setError('Please enter your first and last name.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: fullName.trim() });
      await setDoc(doc(db, 'users', credential.user.uid), {
        uid: credential.user.uid,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp()
      });
      await signOut(auth);
      navigate('/login', { replace: true, state: { message: 'Account created successfully. Please log in.' } });
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use'
        ? 'This email is already registered. Please log in.'
        : err.code === 'auth/invalid-email'
          ? 'Please enter a valid email address.'
          : err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">DEV@DEAKIN / CHITKARA</p>
        <h1>Create your account</h1>
        <p className="auth-intro">Enter your details to join the platform.</p>
        <form className="auth-form" onSubmit={handleRegister}>
          <label htmlFor="fullName">Full name</label>
          <input id="fullName" type="text" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="First and last name" required />
          <label htmlFor="registerEmail">Email address</label>
          <input id="registerEmail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          <label htmlFor="registerPassword">Password</label>
          <input id="registerPassword" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} required />
          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter password again" required />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </section>
    </main>
  );
}

export default Register;
