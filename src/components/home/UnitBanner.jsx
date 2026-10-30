// status: { locked, done, total } from getUnitStatus()
// blockingUnit: the first unfinished unit (named in the "finish ... to unlock" message)
export default function UnitBanner({ unit, status, blockingUnit }) {
  return (
    <div className="unit-banner">
      <p className="unit-banner__label">Unit {unit.id}{status.locked ? ' 🔒' : ''}</p>
      <h2 className="unit-banner__title">{unit.title}</h2>
      <p className="unit-banner__desc">
        {status.locked ? `Finish Unit ${blockingUnit.id} to unlock` : unit.description}
      </p>
      {!status.locked && (
        <p className="unit-banner__progress">{status.done} of {status.total} lessons done</p>
      )}
    </div>
  );
}