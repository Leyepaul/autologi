import { useState } from 'react';
import { isMuted, setMuted, play } from '../audio/sounds';

// 🔊 / 🔇 button. The choice is remembered on this device.
export default function SoundToggle({ className = 'chip chip--button' }) {
  const [muted, setLocal] = useState(isMuted());

  function toggle() {
    const next = !muted;
    setMuted(next);
    setLocal(next);
    if (!next) play('tap'); // confirm that sound is back on
  }

  return (
    <button
      className={className}
      onClick={toggle}
      aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      aria-pressed={!muted}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
