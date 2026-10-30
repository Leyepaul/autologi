import { useState } from 'react';
import { checkAnswer } from '../utils/checkAnswer';

// All lesson logic: queue, current question, check, continue, retry of wrong answers.
export function useLesson(questions) {
  const [queue, setQueue] = useState(questions);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(null);   // what the learner picked (null = nothing yet)
  const [result, setResult] = useState(null);   // null | 'correct' | 'wrong'
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongIds, setWrongIds] = useState([]);

  const current = queue[index];
  const finished = index >= queue.length;

  function check() {
    if (answer === null || result) return;
    const ok = checkAnswer(current, answer);
    setResult(ok ? 'correct' : 'wrong');
    if (ok) {
      setCorrectCount((c) => c + 1);
    } else {
      // Duolingo-style: wrong questions come back at the end
      setWrongIds((ids) => (ids.includes(current.id) ? ids : [...ids, current.id]));
      setQueue((q) => [...q, current]);
    }
  }

  function next() {
    setIndex((i) => i + 1);
    setAnswer(null);
    setResult(null);
  }

  const total = questions.length;
  return {
    current, index, finished, answer, setAnswer, result, check, next,
    progress: correctCount / total,
    stats: {
      xp: total * 10 - wrongIds.length * 5,
      accuracy: Math.round(((total - wrongIds.length) / total) * 100),
    },
  };
}
