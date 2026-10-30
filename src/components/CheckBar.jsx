// Bottom bar: CHECK button, then feedback + CONTINUE
export default function CheckBar({ result, explanation, canCheck, onCheck, onContinue }) {
  const state = result || 'idle';
  return (
    <footer className={`checkbar checkbar--${state}`}>
      <div className="checkbar__inner">
        {result && (
          <div className="checkbar__feedback">
            <strong>{result === 'correct' ? 'Nicely done!' : 'Not quite'}</strong>
            <span>{explanation}</span>
          </div>
        )}
        {result ? (
          <button className={`btn ${result === 'correct' ? 'btn--success' : 'btn--danger'}`} onClick={onContinue}>
            Continue
          </button>
        ) : (
          <button className="btn btn--primary" disabled={!canCheck} onClick={onCheck}>
            Check
          </button>
        )}
      </div>
    </footer>
  );
}
