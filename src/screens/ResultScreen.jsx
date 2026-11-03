import { useEffect, useRef } from 'react';
import { play } from '../audio/sounds';
import { formatTime } from '../utils/stopwatch';

export default function ResultScreen({ stats, onRestart, onHome }) {
  const played = useRef(false); // stops a double fanfare in development mode

  useEffect(() => {
    if (played.current) return;
    played.current = true;
    play('complete');
  }, []);

  return (
    <div className="screen">
      <main className="screen__body result">
        <div className="result__emoji">🏆</div>
        <h1 className="title">Lesson complete!</h1>
        <div className="stats">
          <div className="stat stat--xp"><span>Total XP</span><strong>{stats.xp}</strong></div>
          <div className="stat stat--acc"><span>Accuracy</span><strong>{stats.accuracy}%</strong></div>
          {stats.seconds !== undefined && (<div className="stat stat--time"><span>Time</span><strong>{formatTime(stats.seconds)}</strong></div>)}
        </div>
      </main>
      <footer className="checkbar checkbar--idle">
        <div className="checkbar__inner">
          <button className="btn btn--ghost" onClick={onRestart}>Practice again</button>
          <button className="btn btn--primary" onClick={onHome}>Back to path</button>
        </div>
      </footer>
    </div>
  );
}
