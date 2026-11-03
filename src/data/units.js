// The course map shown on the home page: units and the lessons inside them.
// A lesson only becomes playable when a matching file exists in src/data/lessons/
// and is registered in src/data/lessons/index.js. Until then it shows as "coming soon".
// Colours: `color` is the main unit colour, `colorDark` is the button "edge".

export const units = [
  {
    id: 1,
    title: 'Introduction to Automation',
    description: 'Understand the basics of industrial automation and control systems',
    color: '#1d5fe0',
    colorDark: '#164bb3',
    lessons: [
      { id: '1.1', title: 'Automation 101', icon: '⚙️' },
      { id: '1.2', title: 'Know Your Tools', icon: '🧩' },
      { id: '1.3', title: 'Inside the Control System', icon: '📡' },
      { id: '1.4', title: 'Making Machines Think', icon: '🔧' },
      { id: '1.5', title: 'Put it to Work', icon: '〰️' },
    ],
  },
  {
    id: 2,
    title: 'PLC basics and ladder logic',
    description: 'Read and write simple ladder logic',
    color: '#c2410c',
    colorDark: '#9a3412',
    lessons: [
      { id: '2.1', title: 'PLC Fundamentals', icon: '🖥️' },
      { id: '2.2', title: 'Anatomy of a PLC', icon: '🧩' },
      { id: '2.3', title: 'Understanding PLC Inputs & Outputs', icon: '📥' },
      { id: '2.4', title: 'How PLCs Work', icon: '🔁' },
      { id: '2.5', title: 'Your First PLC Challenge', icon: '🎯' },
    ],
  },
  {
    id: 3,
    title: 'Timers, counters and real control',
    description: 'Solve small, realistic automation problems',
    color: '#7c3aed',
    colorDark: '#5b21b6',
    lessons: [
      { id: '3.1', title: 'Timers (TON, TOF)', icon: '⏱️' },
      { id: '3.2', title: 'Counters (CTU, CTD)', icon: '🔢' },
      { id: '3.3', title: 'Sequencing', icon: '📋' },
      { id: '3.4', title: 'Safety basics', icon: '🛑' },
      { id: '3.5', title: 'Troubleshooting', icon: '🔍' },
    ],
  },
];
