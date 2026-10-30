import { units } from '../data/units';
import { lessons } from '../data/lessons';
import { DEV_UNLOCK_ALL } from '../config';
import { getPathState, getUnitStatus } from '../utils/pathState';
import UnitBanner from '../components/home/UnitBanner';
import LessonNode from '../components/home/LessonNode';
import SoonCard from '../components/home/SoonCard';
import BottomNav from '../components/BottomNav';
import SoundToggle from '../components/SoundToggle';
import Wordmark from '../components/Wordmark';

// Optional props: onOpenAccount (shows the Account tab), showSavePrompt (guest banner), onReset
export default function HomeScreen({
  completed, totalXp, onOpenLesson, onOpenLeaderboard, onOpenAccount, showSavePrompt, onReset,
}) {
  const states = getPathState(units, lessons, completed, DEV_UNLOCK_ALL);
  const unitStatus = getUnitStatus(units, completed, DEV_UNLOCK_ALL);

  return (
    <div className="screen home">
      <header className="home__top">
        <h1 className="home__brand"><Wordmark /></h1>
        <div className="home__actions">
          <span className="chip" title="Total XP">⚡ {totalXp} XP</span>
          <SoundToggle />
        </div>
      </header>

      <main className="home__body">
        {showSavePrompt && (
          <button className="guest-banner" onClick={onOpenAccount}>
            <span>💾 Save your progress to play on any device</span>
            <strong>Add email</strong>
          </button>
        )}

        {units.map((unit, unitIndex) => {
          // Lessons up to the last playable one get a circle; trailing "coming soon" lessons share one card
          const lastPlayable = unit.lessons.reduce((last, l, i) => (states[l.id] !== 'soon' ? i : last), -1);
          const playable = unit.lessons.slice(0, lastPlayable + 1);
          const upcoming = unit.lessons.slice(lastPlayable + 1);
          const locked = unitStatus[unit.id].locked;

          return (
            <section
              key={unit.id}
              className={`unit ${locked ? 'unit--locked' : ''}`}
              style={{ '--unit': unit.color, '--unit-dark': unit.colorDark }}
            >
              <UnitBanner unit={unit} status={unitStatus[unit.id]} blockingUnit={units[unitIndex - 1]} />
              {playable.length > 0 && (
                <ol className="path">
                  {playable.map((lesson, i) => (
                    <LessonNode
                      key={lesson.id}
                      lesson={lesson}
                      state={states[lesson.id]}
                      index={i}
                      onOpen={onOpenLesson}
                    />
                  ))}
                </ol>
              )}
              {upcoming.length > 0 && <SoonCard lessons={upcoming} />}
            </section>
          );
        })}

        {onReset && <button className="link-button" onClick={onReset}>Reset my progress on this device</button>}
      </main>

      <BottomNav
        active="learn"
        onLearn={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onRanks={onOpenLeaderboard}
        onAccount={onOpenAccount}
      />
    </div>
  );
}
