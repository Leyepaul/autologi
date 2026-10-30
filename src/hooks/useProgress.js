import { useEffect, useState } from 'react';
import { fetchMyResults, submitResult } from '../services/leaderboardService';
import { LEGACY_KEY, MERGE_KEY, progressKey } from '../utils/storageKeys';

// Progress lives in TWO places:
//   1. this browser (localStorage), a fast cache that also works offline
//   2. the database (Supabase), the permanent copy that follows the player to any device
// On login we download the database copy, MERGE it with the local copy (best score per
// lesson wins), then upload anything the database was missing.

function read(key) {
  try { return JSON.parse(localStorage.getItem(key))?.completed || {}; } catch { return {}; }
}
function write(key, completed) {
  localStorage.setItem(key, JSON.stringify({ completed }));
}
// Combine two progress objects, keeping the best xp and accuracy per lesson
function mergeBest(a, b) {
  const out = { ...a };
  for (const [id, r] of Object.entries(b)) {
    const old = out[id];
    out[id] = { xp: Math.max(r.xp, old?.xp || 0), accuracy: Math.max(r.accuracy, old?.accuracy || 0) };
  }
  return out;
}
const isBetter = (mine, theirs) => !theirs || mine.xp > theirs.xp || mine.accuracy > theirs.accuracy;

export function useProgress(player) {
  const { status, userId } = player;
  const [completed, setCompleted] = useState(() => read(LEGACY_KEY));
  const storageKey = userId ? progressKey(userId) : LEGACY_KEY;

  useEffect(() => {
    // No online account (Supabase off, or offline): just use the local copy
    if (status === 'off' || status === 'error') {
      setCompleted(read(storageKey));
      return;
    }
    if (status !== 'ready' || !userId) return;

    let cancelled = false;
    (async () => {
      const key = progressKey(userId);
      let local = read(key);

      // Pick up progress saved before accounts existed
      const legacy = read(LEGACY_KEY);
      if (Object.keys(legacy).length) { local = mergeBest(local, legacy); localStorage.removeItem(LEGACY_KEY); }

      // Pick up progress from the guest account we were using before logging in
      const from = localStorage.getItem(MERGE_KEY);
      if (from && from !== userId) {
        local = mergeBest(local, read(progressKey(from)));
        localStorage.removeItem(progressKey(from));
      }
      localStorage.removeItem(MERGE_KEY);

      write(key, local);
      setCompleted(local); // show local progress immediately

      try {
        const remote = await fetchMyResults();   // <- the "load results on login" step
        if (cancelled) return;
        const merged = mergeBest(local, remote);
        write(key, merged);
        setCompleted(merged);
        // Upload whatever the database is missing or has a lower score for
        await Promise.all(
          Object.entries(merged)
            .filter(([id, r]) => isBetter(r, remote[id]))
            .map(([id, r]) => submitResult(id, r).catch(() => {}))
        );
      } catch {
        /* offline: keep the local copy, it syncs next time */
      }
    })();
    return () => { cancelled = true; };
  }, [status, userId]);

  const complete = (lessonId, stats) => {
    const next = mergeBest(completed, { [lessonId]: { xp: stats.xp, accuracy: stats.accuracy } });
    setCompleted(next);
    write(storageKey, next);
    if (status === 'ready') {
      submitResult(lessonId, stats).catch((e) => console.warn('Could not upload result', e));
    }
  };

  const reset = () => { setCompleted({}); write(storageKey, {}); };
  const totalXp = Object.values(completed).reduce((sum, r) => sum + r.xp, 0);

  return { completed, complete, reset, totalXp };
}
