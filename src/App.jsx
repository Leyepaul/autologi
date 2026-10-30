import { useState } from 'react';
import { units } from './data/units';
import { lessons } from './data/lessons';
import { useProgress } from './hooks/useProgress';
import { usePlayer } from './hooks/usePlayer';
import HomeScreen from './screens/HomeScreen';
import IntroScreen from './screens/IntroScreen';
import LessonScreen from './screens/LessonScreen';
import ResultScreen from './screens/ResultScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import AccountScreen from './screens/AccountScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import NameScreen from './screens/NameScreen';

// Screen switcher: home -> intro -> lesson -> result -> home   (+ leaderboard, account from home)
// Before any of that, `player.status` decides if we show Welcome or the name screen.
export default function App() {
  const [screen, setScreen] = useState('home');
  const [lessonId, setLessonId] = useState(null);
  const [stats, setStats] = useState(null);
  const [attempt, setAttempt] = useState(0); // changing this key resets the lesson
  const player = usePlayer();                      // who is playing
  const { completed, complete, reset, totalXp } = useProgress(player); // what they have finished

  const lesson = lessonId ? lessons[lessonId] : null;
  const unit = lessonId ? units.find((u) => u.lessons.some((l) => l.id === lessonId)) : null;
  const goHome = () => setScreen('home');
  const online = player.status === 'ready';

  if (player.status === 'loading') return <div className="screen splash">Loading...</div>;
  if (player.status === 'welcome') {
    return <WelcomeScreen onStartGuest={player.startGuest} onLogin={player.logInWithEmail} />;
  }
  if (player.status === 'needs_name') return <NameScreen onSubmit={player.chooseName} />;

  if (screen === 'leaderboard') return <LeaderboardScreen player={player} onBack={goHome} />;
  if (screen === 'account') {
    return (
      <AccountScreen
        player={player}
        onBack={goHome}
        onLogOut={async () => { await player.logOut(); setScreen('home'); }}
      />
    );
  }
  if (screen === 'intro') {
    return <IntroScreen lesson={lesson} unit={unit} onBack={goHome} onStart={() => setScreen('lesson')} />;
  }
  if (screen === 'lesson') {
    return (
      <LessonScreen
        key={attempt}
        lesson={lesson}
        onQuit={goHome}
        onFinish={(s) => { complete(lesson.id, s); setStats(s); setScreen('result'); }}
      />
    );
  }
  if (screen === 'result') {
    return (
      <ResultScreen
        stats={stats}
        onHome={goHome}
        onRestart={() => { setAttempt((a) => a + 1); setScreen('lesson'); }}
      />
    );
  }
  return (
    <HomeScreen
      completed={completed}
      totalXp={totalXp}
      onReset={player.status === 'off' ? reset : undefined}
      onOpenLeaderboard={() => setScreen('leaderboard')}
      onOpenAccount={online ? () => setScreen('account') : undefined}
      showSavePrompt={online && player.isGuest && Object.keys(completed).length > 0}
      onOpenLesson={(id) => { setLessonId(id); setAttempt((a) => a + 1); setScreen('intro'); }}
    />
  );
}
