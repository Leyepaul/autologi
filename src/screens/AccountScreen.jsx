import { useState } from 'react';
import EmailForm from '../components/account/EmailForm';

export default function AccountScreen({ player, onBack, onLogOut }) {
  const [showLogin, setShowLogin] = useState(false);
  const [confirming, setConfirming] = useState(false); // guests must confirm before logging out
  const [busy, setBusy] = useState(false);

  async function logOut() {
    setBusy(true);
    try {
      await onLogOut();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar__close" onClick={onBack} aria-label="Back to path">✕</button>
        <h1 className="topbar__title">Account</h1>
      </header>

      <main className="screen__body">
        <p className="body-text">Playing as <strong>{player.name}</strong></p>

        {player.isGuest ? (
          <>
            <div className="card">
              <strong>You're playing as a guest</strong>
              <p className="body-text">You stay signed in on this device. Add your email to keep your progress safe and pick up on any device.</p>
              <EmailForm
                submitText="Save my progress"
                onSubmit={player.saveWithEmail}
                onSwitchToLogin={player.logInWithEmail}
                onRefresh={player.refresh}
              />
            </div>

            {!showLogin ? (
              <button className="link-button" onClick={() => setShowLogin(true)}>
                Already have an account on another device? Log in
              </button>
            ) : (
              <div className="card">
                <strong>Log in to your account</strong>
                <p className="body-text">Progress on this device will be merged into that account.</p>
                <EmailForm submitText="Send login link" onSubmit={player.logInWithEmail} />
              </div>
            )}

            <div className="card">
              {!confirming ? (
                <button className="link-button link-button--inline" onClick={() => setConfirming(true)}>
                  Log out of guest account
                </button>
              ) : (
                <>
                  <strong>Log out of this guest account?</strong>
                  <p className="body-text">
                    A guest account has no email, so you won't be able to log back in. Your progress
                    and your leaderboard name will be lost to you. Add your email above first to keep them.
                  </p>
                  <div className="stack">
                    <button className="btn btn--ghost" onClick={() => setConfirming(false)}>Keep playing</button>
                    <button className="btn btn--danger" disabled={busy} onClick={logOut}>
                      {busy ? 'Logging out...' : 'Log out anyway'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="card">
            <p className="body-text">Signed in as <strong>{player.email}</strong></p>
            <p className="muted">Your progress is saved online. You stay signed in on this device until you log out. Log in with this email on any device to continue.</p>
            <button className="btn btn--ghost" disabled={busy} onClick={logOut}>
              {busy ? 'Logging out...' : 'Log out'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
