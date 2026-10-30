import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email box + send button. Shows "check your email" once the message is sent.
// onSubmit(email)         what to do with the email
// onSwitchToLogin(email)  optional: offered when that email already has an account
// onRefresh()             optional: "I've clicked the link" button
export default function EmailForm({ submitText, onSubmit, onSwitchToLogin, onRefresh }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | busy | sent
  const [error, setError] = useState(null);
  const [taken, setTaken] = useState(false);
  const valid = EMAIL_RE.test(email.trim());

  async function run(action) {
    setStatus('busy');
    setError(null);
    setTaken(false);
    try {
      await action(email.trim());
      setStatus('sent');
    } catch (err) {
      if (err.code === 'email_exists' && onSwitchToLogin) setTaken(true);
      setError(err.message);
      setStatus('idle');
    }
  }

  if (status === 'sent') {
    return (
      <div className="card sent">
        <strong>Check your email</strong>
        <p>We sent a link to {email}. Open it to finish. It also works if you open it on another device. Check your spam folder if you don't see it.</p>
        {onRefresh && <button className="btn btn--ghost" onClick={onRefresh}>I've clicked the link</button>}
      </div>
    );
  }

  return (
    <form
      className="stack"
      onSubmit={(e) => { e.preventDefault(); if (valid && status !== 'busy') run(onSubmit); }}
    >
      <input
        className="text-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
      />
      {error && <p className="form-error">{error}</p>}
      {taken && (
        <button type="button" className="btn btn--ghost" onClick={() => run(onSwitchToLogin)}>
          Log in to that account instead
        </button>
      )}
      <button className="btn btn--primary" type="submit" disabled={!valid || status === 'busy'}>
        {status === 'busy' ? 'Sending...' : submitText}
      </button>
    </form>
  );
}
