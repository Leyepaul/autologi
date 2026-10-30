import LadderRung from '../components/LadderRung';

export default function IntroScreen({ lesson, unit, onStart, onBack }) {
  const { intro } = lesson;
  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar__close" onClick={onBack} aria-label="Back to path">✕</button>
      </header>
      <main className="screen__body">
        <p className="muted" style={{ color: unit.color }}>Unit {unit.id}: {unit.title}</p>
        <h1 className="title">{lesson.title}</h1>
        <div className="mascot-row">
          <span className="mascot">{intro.mascot}</span>
          <div className="bubble">{intro.heading}</div>
        </div>
        {intro.rung && (
          <div className="card">
            <LadderRung elements={intro.rung} />
          </div>
        )}
        {intro.paragraphs.map((text) => (
          <p key={text} className="body-text">{text}</p>
        ))}
      </main>
      <footer className="checkbar checkbar--idle">
        <div className="checkbar__inner checkbar__inner--end">
          <button className="btn btn--primary" onClick={onStart}>Start quiz</button>
        </div>
      </footer>
    </div>
  );
}
