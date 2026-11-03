// A stopwatch that only counts while it is running. Pure logic, so it is easy to test.
// `now` can be replaced in tests with a fake clock.
export function createStopwatch(now = () => performance.now()) {
  let total = 0;        // milliseconds counted so far
  let startedAt = null; // when the current running stretch began (null = paused)
  return {
    start() { if (startedAt === null) startedAt = now(); },
    pause() { if (startedAt !== null) { total += now() - startedAt; startedAt = null; } },
    seconds() { return Math.floor((total + (startedAt === null ? 0 : now() - startedAt)) / 1000); },
    isRunning() { return startedAt !== null; },
  };
}

// 65 -> "1:05", 3725 -> "1:02:05"
export function formatTime(totalSeconds) {
  const s = Number.isFinite(totalSeconds) && totalSeconds > 0 ? Math.floor(totalSeconds) : 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
}
