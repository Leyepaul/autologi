// Replaces a run of "coming soon" lessons at the end of a unit with one compact card.
export default function SoonCard({ lessons }) {
  return (
    <div className="soon-card">
      <p className="soon-card__title">Coming soon</p>
      <ul className="soon-card__list">
        {lessons.map((l) => <li key={l.id}>{l.title}</li>)}
      </ul>
    </div>
  );
}
