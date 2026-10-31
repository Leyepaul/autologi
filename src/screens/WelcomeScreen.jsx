import { useState } from 'react';
import EmailForm from '../components/account/EmailForm';
import Wordmark from '../components/Wordmark';
 
// Shown when nobody is signed in on this browser
export default function WelcomeScreen({ onStartGuest, onLogin }) {
  const [mode, setMode] = useState('menu'); // menu | login
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
 
  async function startGuest() {
    setBusy(true);
    setError(null);
    try {
      await onStartGuest();
    } catch (e) {
      console.error(e);
      setError(e.message || 'Could not start. Check your connection and try again.');
      setBusy(false);
    }
  }
 
  return (
    <div className="screen">
      <main className="screen__body name-form">
        <div className="result__emoji"><img src="/images/autologic-robot.png" alt="Autologic mascot" /></div>
        <h1 className="title"><Wordmark /></h1>
        {mode === 'menu' ? (
          <div className="stack">
            <p className="body-text">Learn automation engineering, one small lesson at a time.</p>
            {error && <p className="form-error">{error}</p>}
            <button className="btn btn--primary" onClick={startGuest} disabled={busy}>
              {busy ? 'Starting...' : 'Start playing'}
            </button>
            <button className="btn btn--ghost" onClick={() => setMode('login')}>
              I already have an account
            </button>
          </div>
        ) : (
          <div className="stack">
            <p className="body-text">Enter your email and we'll send you a login link. No password needed.</p>
            <EmailForm submitText="Send login link" onSubmit={onLogin} />
            <button className="link-button link-button--inline" onClick={() => setMode('menu')}>Back</button>
          </div>
        )}
      </main>
    </div>
  );
}




