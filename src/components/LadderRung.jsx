import '../styles/ladder.css';

// Draws one ladder-logic rung. Power flow is calculated automatically.
// elements: [{ type: 'NO' | 'NC', label: string, on: boolean }]
// reveal: false = show the rung without power colours (used before answering)
export default function LadderRung({ elements = [], reveal = true }) {
  const n = elements.length;
  const coilX = 130 + n * 70;
  const parts = [];
  let live = true;
  let prevX = 20;

  const wire = (key, x1, x2, isLive) => (
    <line key={key} x1={x1} x2={x2} y1="60" y2="60" className={`rung__wire ${reveal && isLive ? 'is-live' : ''}`} />
  );

  elements.forEach((el, i) => {
    const cx = 80 + i * 80;
    parts.push(wire(`w${i}`, prevX, cx - 10, live));
    const passes = el.type === 'NO' ? el.on : !el.on;
    live = live && passes;
    parts.push(
      <g key={`c${i}`} className={`rung__contact ${reveal && live ? 'is-live' : ''}`}>
        <line x1={cx - 10} x2={cx - 10} y1="44" y2="76" />
        <line x1={cx + 10} x2={cx + 10} y1="44" y2="76" />
        {el.type === 'NC' && <line x1={cx - 14} x2={cx + 14} y1="78" y2="42" />}
        <text x={cx} y="30" textAnchor="middle" className="rung__state">{el.on ? 'ON' : 'OFF'}</text>
        <text x={cx} y="102" textAnchor="middle" className="rung__label">{el.label}</text>
      </g>
    );
    prevX = cx + 10;
  });

  parts.push(wire('wc', prevX, coilX - 16, live));
  parts.push(wire('wr', coilX + 16, 340, live));
  parts.push(
    <g key="coil" className={`rung__coil ${reveal && live ? 'is-on' : ''}`}>
      <circle cx={coilX} cy="60" r="16" />
      <text x={coilX} y="102" textAnchor="middle" className="rung__label">Lamp</text>
    </g>
  );

  return (
    <svg className="rung" viewBox="0 0 360 120" role="img" aria-label="Ladder logic rung">
      <line x1="20" x2="20" y1="10" y2="110" className="rung__rail" />
      <line x1="340" x2="340" y1="10" y2="110" className="rung__rail" />
      {parts}
    </svg>
  );
}
