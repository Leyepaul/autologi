// Registry: every lesson file must be imported and listed here to appear on the home page.
import lesson11 from './lesson-1-1';
import lesson12 from './lesson-1-2';
import lesson13 from './lesson-1-3';
import lesson14 from './lesson-1-4';
import lesson15 from './lesson-1-5';
// import lesson21 from './lesson-2-1';
// import lesson22 from './lesson-2-2';

const all = [lesson11, lesson12,lesson13, lesson14, lesson15];

export const lessons = Object.fromEntries(all.map((l) => [l.id, l]));
