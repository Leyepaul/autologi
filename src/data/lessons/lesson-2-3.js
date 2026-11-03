// Lesson 2.3. See CONTENT-GUIDE.md in the project root for question templates.
export default {
  id: '2.3',
  title: 'Understanding PLC Inputs and Outputs',
  intro: {
    mascot: '🤖',
    heading: 'Inside the PLC',
    paragraphs: [
      'A PLC is made up of several hardware components that work together to control machines and industrial processes.',
      'In this section, you will explore how these components are organised, connected, and expanded to suit different applications.',
    ],
  },

  questions: [
    {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Which signal type represents only two states: ON or OFF?',
        options: [
        'Digital signal',
        'Analog signal',
        'Frequency signal',
        'Variable signal',
        ],
        answer: 0,
        explanation: 'Digital signals represent discrete states, commonly ON and OFF.',
    },

    {
        id: 'q2',
        type: 'true_false',
        prompt: 'A 4–20 mA transmitter provides an analog signal to a PLC.',
        answer: true,
        explanation: 'A 4–20 mA signal represents a continuously varying process measurement.',
    },

    {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the primary purpose of a PLC analog output module?',
        options: [
        'To provide variable control signals',
        'To receive pushbutton signals',
        'To detect equipment vibration',
        'To monitor digital switch states',
        ],
        answer: 0,
        explanation: 'Analog output modules provide variable signals, such as 4–20 mA or 0–10 V, to control devices.',
    },

    {
        id: 'q4',
        type: 'match_pairs',
        prompt: 'Match each field device to its typical PLC signal type.',
        pairs: [
        {
            left: 'Pushbutton',
            right: 'Digital input',
        },
        {
            left: 'Pressure transmitter',
            right: 'Analog input',
        },
        {
            left: 'Solenoid valve',
            right: 'Digital output',
        },
        {
            left: 'Speed reference',
            right: 'Analog output',
        },
        ],
        explanation: 'Digital signals represent discrete states, while analog signals represent varying values.',
    },

    {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'A PLC digital input is rated for 24 VDC. What voltage would typically represent an ON signal?',
        options: [
            '24 VDC',
            '0 VDC',
            '4 mA',
            '10 VAC',
        ],
        answer: 0,
        explanation: 'A 24 VDC digital input typically detects a positive voltage near its rated level as ON, subject to the module’s input thresholds.',
    },

    {
        id: 'q6',
        type: 'multiple_choice',
        prompt: 'A PNP sensor switches ON. What does it typically provide to a compatible PLC input?',
        options: [
        'A positive voltage signal',
        'A negative voltage signal',
        'A variable current signal',
        'A frequency output signal',
        ],
        answer: 0,
        explanation: 'A PNP sensor typically switches the positive supply voltage to its output when activated.',
    },

    {
        id: 'q7',
        type: 'predict_output',
        prompt: 'The proximity sensor detects an object (input ON). Is the lamp ON or OFF?',
        rung: [
        { type: 'NO', label: 'Proximity sensor', on: true }
        ],
        options: ['ON', 'OFF'],
        answer: 'ON',
        explanation: 'The NO instruction becomes true when its input bit is ON, allowing the rung to energise the output.',
    },

    {
        id: 'q8',
        type: 'true_false',
        prompt: 'A standard digital input module can directly measure a 0–10 V signal.',
        answer: false,
        explanation: 'A compatible analog input module is required to measure a 0–10 V signal.',
    },

    {
        id: 'q9',
        type: 'predict_output',
        prompt: 'The Stop button input turns ON. Is the lamp ON or OFF?',
        rung: [
        { type: 'NC', label: 'Stop button', on: true }
        ],
        options: ['ON', 'OFF'],
        answer: 'OFF',
        explanation: 'The NC instruction becomes false when its input bit is ON, breaking the rung condition.',
    },

    {
        id: 'q10',
        type: 'multiple_choice',
        prompt: 'A tank pressure transmitter uses a 4–20 mA signal. Which PLC module is required?',
        options: [
        'Analog input module',
        'Digital input module',
        'Analog output module',
        'Digital output module',
        ],
        answer: 0,
        explanation: 'An analog input module receives and converts the 4–20 mA signal into a value the PLC can process.',
    },
    ]
};
