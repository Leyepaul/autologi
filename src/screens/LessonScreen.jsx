import { useEffect } from 'react';
import { useLesson } from '../hooks/useLesson';
import ProgressBar from '../components/ProgressBar';
import CheckBar from '../components/CheckBar';
import QuestionRenderer from '../components/questions/QuestionRenderer';
import SoundToggle from '../components/SoundToggle';
import { play } from '../audio/sounds';

// just above  if (L.finished) return null;  add:
// useEffect(() => {
//   if (L.result === 'correct') play('correct');
//   if (L.result === 'wrong') play('wrong');
// }, [L.result]);

// right after <ProgressBar value={L.progress} />  add:
{/* <SoundToggle className="icon-button" /> */}

export default function LessonScreen({ lesson, onFinish, onQuit }) {
  const L = useLesson(lesson.questions);

  useEffect(() => {
    if (L.finished) onFinish(L.stats);
  }, [L.finished]);

  useEffect(() => {
  if (L.result === 'correct') play('correct');
  if (L.result === 'wrong') play('wrong');
  }, [L.result]);

  if (L.finished) return null;

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar__close" onClick={onQuit} aria-label="Quit lesson">✕</button>
        <ProgressBar value={L.progress} /><SoundToggle className="icon-button" />
      </header>
      <main className="screen__body">
        <QuestionRenderer
          key={`${L.index}-${L.current.id}`}
          question={L.current}
          answer={L.answer}
          onChange={L.setAnswer}
          locked={L.result !== null}
        />
      </main>
      <CheckBar
        result={L.result}
        explanation={L.current.explanation}
        canCheck={L.answer !== null}
        onCheck={L.check}
        onContinue={L.next}
      />
    </div>
  );
}
