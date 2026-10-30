// One circle on the path. `state` comes from utils/pathState.js
export default function LessonNode({ lesson, state, index, onOpen }) {
  const offset = Math.round(Math.sin((index * Math.PI) / 2) * 54); // zig-zag
  const disabled = state === 'locked' || state === 'soon';
  const symbol = state === 'done' ? '✓' : state === 'locked' ? '🔒' : lesson.icon;
  const status = { done: 'Completed', current: 'Start', open: 'Start', locked: 'Locked', soon: 'Coming soon' }[state];

  return (
    <li className="path__item" style={{ transform: `translateX(${offset}px)` }}>
      {state === 'current' && <span className="path__bubble">Start</span>}
      <button
        className={`node node--${state}`}
        disabled={disabled}
        onClick={() => onOpen(lesson.id)}
        aria-label={`${lesson.title}. ${status}`}
      >
        {symbol}
      </button>
      <span className="path__label">{lesson.title}</span>
    </li>
  );
}
