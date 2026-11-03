import { useCallback, useEffect, useRef } from 'react';
import { createStopwatch } from '../utils/stopwatch';

// A stopwatch for one lesson run. It starts straight away, pauses while the page is hidden
// (switching tabs or apps), and stays stopped after stop() is called.
// It stores the time in a ref, so counting never re-draws the lesson screen.
export function useStopwatch() {
  const watch = useRef(null);
  if (watch.current === null) watch.current = createStopwatch();
  const stopped = useRef(false);

  useEffect(() => {
    const sw = watch.current;
    const sync = () => {
      if (stopped.current) return;
      if (document.hidden) sw.pause();
      else sw.start();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => {
      document.removeEventListener('visibilitychange', sync);
      sw.pause();
    };
  }, []);

  const getSeconds = useCallback(() => watch.current.seconds(), []);
  const stop = useCallback(() => { stopped.current = true; watch.current.pause(); }, []);
  return { getSeconds, stop };
}
