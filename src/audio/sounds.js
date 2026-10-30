// Sound effects made with the browser's Web Audio API: no audio files to download,
// nothing to license. To change a sound, edit the notes below.
//
//   tone({ freq, start, duration, type, volume, slideTo })
//     freq      pitch in Hz (higher = higher note). C5=523, E5=659, G5=784, A5=880
//     start     seconds from now (use it to line up notes in a melody)
//     duration  how long the note lasts, in seconds
//     type      'sine' (soft), 'triangle' (warm), 'square'/'sawtooth' (harsh)
//     volume    0 to 1
//     slideTo   optional: glide to this pitch while playing

const MUTE_KEY = 'automation101-muted';
const MASTER_VOLUME = 0.8;

let ctx = null;
let muted = (() => {
  try { return localStorage.getItem(MUTE_KEY) === '1'; } catch { return false; }
})();

function getCtx() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// Browsers (especially iPhone) keep sound locked until the first tap.
// main.jsx calls this once on the first touch or click.
export function unlockAudio() {
  const c = getCtx();
  if (!c) return;
  const silent = c.createBufferSource();
  silent.buffer = c.createBuffer(1, 1, 22050);
  silent.connect(c.destination);
  silent.start(0);
}

function tone({ freq, start = 0, duration = 0.15, type = 'sine', volume = 0.2, slideTo }) {
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + duration);
  // quick fade in and out so notes never click or pop
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(volume * MASTER_VOLUME, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + duration + 0.03);
}

// The sound library. Each one is a tiny list of notes.
const SOUNDS = {
  // tapping an answer option
  tap: () => tone({ freq: 520, duration: 0.05, type: 'triangle', volume: 0.12 }),

  // correct answer: two rising notes
  correct: () => {
    tone({ freq: 659.25, duration: 0.16, volume: 0.22 });
    tone({ freq: 880, start: 0.09, duration: 0.24, volume: 0.22 });
  },

  // wrong answer: a short low buzz that sinks
  wrong: () => tone({ freq: 220, slideTo: 140, duration: 0.3, type: 'sawtooth', volume: 0.1 }),

  // one correct pair in a match question
  match: () => tone({ freq: 740, duration: 0.13, volume: 0.2 }),

  // picking up and dropping a drag-and-drop item
  pickup: () => tone({ freq: 440, duration: 0.06, type: 'triangle', volume: 0.12 }),
  drop: () => tone({ freq: 330, duration: 0.09, type: 'triangle', volume: 0.16 }),

  // lesson complete: a rising fanfare (C, E, G, high C)
  complete: () => {
    [523.25, 659.25, 783.99].forEach((freq, i) =>
      tone({ freq, start: i * 0.11, duration: 0.22, volume: 0.2 })
    );
    tone({ freq: 1046.5, start: 0.33, duration: 0.55, volume: 0.22 });
    tone({ freq: 523.25, start: 0.33, duration: 0.55, type: 'triangle', volume: 0.12 });
  },
};

export function play(name) {
  if (muted) return;
  try {
    SOUNDS[name]?.();
  } catch (e) {
    console.warn('Sound failed:', e); // never let a sound problem break the lesson
  }
}

export const isMuted = () => muted;

export function setMuted(value) {
  muted = value;
  try { localStorage.setItem(MUTE_KEY, value ? '1' : '0'); } catch { /* ignore */ }
}
