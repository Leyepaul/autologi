import { useEffect, useState } from 'react';
import { isConfigured } from '../lib/supabase';
import { fetchLeaderboard, fetchMyRow } from '../services/leaderboardService';
import LeaderboardRow from '../components/leaderboard/LeaderboardRow';

export default function LeaderboardScreen({ player, onBack }) {
  const [rows, setRows] = useState(null);
  const [me, setMe] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    setError(null);
    setRows(null);
    try {
      setRows(await fetchLeaderboard(20));
      setMe(player.userId ? await fetchMyRow(player.userId) : null);
    } catch (e) {
      setError('Could not load the leaderboard. Check your connection.');
    }
  }

  useEffect(() => {
    if (isConfigured && player.status === 'ready') load();
  }, [player.status]);

  const meInTop = rows?.some((r) => r.user_id === player.userId);

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar__close" onClick={onBack} aria-label="Back to path">✕</button>
        <h1 className="topbar__title">Leaderboard</h1>
        <button className="link-button link-button--inline" onClick={load}>Refresh</button>
      </header>

      <main className="screen__body">
        {!isConfigured && (
          <p className="body-text">The leaderboard is not set up yet. See SETUP-LEADERBOARD.md in the project folder.</p>
        )}
        {isConfigured && player.status === 'error' && (
          <p className="body-text">Can't reach the leaderboard right now. Your progress is still saved on this device.</p>
        )}
        {error && <p className="form-error">{error}</p>}
        {player.status === 'ready' && !rows && !error && <p className="muted">Loading...</p>}

        {rows && (
          <>
            {rows.length === 0 && <p className="body-text">No players yet. Finish a lesson to take first place!</p>}
            <ol className="lb">
              {rows.map((row) => (
                <LeaderboardRow key={row.user_id} row={row} isMe={row.user_id === player.userId} />
              ))}
            </ol>
            {me && !meInTop && (
              <>
                <p className="lb-gap">...</p>
                <ol className="lb"><LeaderboardRow row={me} isMe /></ol>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
