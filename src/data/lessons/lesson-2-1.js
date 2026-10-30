// Lesson 2.1. See CONTENT-GUIDE.md in the project root for question templates.
export default {
  id: '2.1',
  title: 'What is a PLC?',
  intro: {
    mascot: '🤖',
    heading: 'The brain of a machine',
    paragraphs: [
      'A PLC (Programmable Logic Controller) is a rugged industrial computer that controls machines.',
      'It repeats one loop forever, called the scan cycle: read the inputs, run the program, update the outputs.',
    ],
  },
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What does PLC stand for?',
      options: [
        'Programmable Logic Controller',
        'Power Line Circuit',
        'Primary Logic Console',
        'Programmed Loop Computer',
      ],
      answer: 0,
      explanation: 'PLC = Programmable Logic Controller.',
    },
    {
      id: 'q2',
      type: 'drag_order',
      prompt: 'Drag the scan cycle into the right order',
      items: [
        'Read the inputs',
        'Run the program logic',
        'Update the outputs',
        'Start again from the top',
      ],
      explanation: 'The PLC reads, thinks, acts, then repeats, many times per second.',
    },
    {
      id: 'q3',
      type: 'true_false',
      prompt: 'A PLC runs its program once and then stops.',
      answer: false,
      explanation: 'A PLC scans continuously while it is in RUN mode.',
    },
    {
      id: 'q4',
      type: 'match_pairs',
      prompt: 'Match each PLC part to its job',
      pairs: [
        { left: 'Input module', right: 'Receives signals from sensors and buttons' },
        { left: 'CPU', right: 'Runs the program' },
        { left: 'Output module', right: 'Sends signals to motors and lamps' },
        { left: 'Power supply', right: 'Provides electricity to the PLC' },
      ],
      explanation: 'Inputs in, CPU thinks, outputs out, power keeps it alive.',
    },
  ],
};
