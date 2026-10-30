export default function ProgressBar({ value }) {
  return (
    <div className="progress" role="progressbar" aria-valuenow={Math.round(value * 100)}>
      <div className="progress__fill" style={{ width: `${Math.max(value * 100, 4)}%` }} />
    </div>
  );
}
