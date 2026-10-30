import { useState } from 'react';

// Shown once, on the first visit, when the leaderboard is switched on.
export default function NameScreen({ onSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const valid = name.trim().length >= 2 && name.trim().length <= 20;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError(null);
    try {
      await onSubmit(name);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="screen">
      <form className="screen__body name-form" onSubmit={handleSubmit}>
        <div className="result__emoji">🤖</div>
        <h1 className="title">Pick a player name</h1>
        <p className="body-text">Other players will see this on the leaderboard. Please don't use your real name.</p>
        <input
          className="text-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          placeholder="e.g. PLC_Ninja"
          autoFocus
        />
        <p className="hint">2 to 20 characters</p>
        {error && <p className="form-error">{error}</p>}
        <button className="btn btn--primary" type="submit" disabled={!valid || busy}>
          {busy ? 'Saving...' : "Let's go"}
        </button>
      </form>
    </div>
  );
}
