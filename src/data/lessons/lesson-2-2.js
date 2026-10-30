// Lesson 2.2. See CONTENT-GUIDE.md in the project root for question templates.
export default {
  id: '2.2',
  title: 'Contacts and coils',
  intro: {
    mascot: '🤖',
    heading: 'Meet the contact and the coil',
    paragraphs: [
      'A contact checks a condition, like a button being pressed.',
      'A coil is the output. It turns ON when power can flow through the rung.',
      'Normally open (NO) passes power when its input is ON. Normally closed (NC) passes power when its input is OFF.',
    ],
    // Optional example rung shown on the intro card
    rung: [{ type: 'NO', label: 'Start button', on: true }],
  },
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'A normally open (NO) contact is wired to a push button. The button is NOT pressed. Does power pass through?',
      options: ['Yes, power passes', 'No, power is blocked', 'Only after 5 seconds', 'It depends on the coil'],
      answer: 1,
      explanation: 'A NO contact stays open until its input turns ON.',
    },
    {
      id: 'q2',
      type: 'true_false',
      prompt: 'A coil turns ON when power can flow through its rung.',
      answer: true,
      explanation: 'The coil is the output. Power reaching it switches it ON.',
    },
    {
      id: 'q3',
      type: 'predict_output',
      prompt: 'The Stop button is pressed (input ON). Is the lamp coil ON or OFF?',
      rung: [{ type: 'NC', label: 'Stop button', on: true }],
      options: ['ON', 'OFF'],
      answer: 'OFF',
      explanation: 'An NC contact opens when its input turns ON, so power is blocked.',
    },
    {
      id: 'q4',
      type: 'match_pairs',
      prompt: 'Match each part to what it does',
      pairs: [
        { left: 'NO contact', right: 'Passes power when input is ON' },
        { left: 'NC contact', right: 'Passes power when input is OFF' },
        { left: 'Output coil', right: 'Turns ON when power reaches it' },
      ],
      explanation: 'Contacts check conditions. Coils are the outputs.',
    },
  ],
};
