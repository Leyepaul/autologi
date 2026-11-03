// Lesson 2.5. See CONTENT-GUIDE.md in the project root for question templates.
export default {
    id: '2.5',
    title: 'Your First PLC Challenge',
    intro: {
    mascot: '🤖',
    heading: 'Think like a PLC engineer',
    paragraphs: [
        'You have explored PLC fundamentals, hardware components, input and output signals, and how controllers execute their programs.',
        'Now it is time to put that knowledge to work.',
    ],
    },

  questions: [
  {
    id: 'q1',
    type: 'multiple_choice',
    prompt: 'A conveyor motor needs to run at different speeds based on production requirements. Which PLC output is most suitable for sending a speed reference to the VFD?',
    options: [
      'Digital input',
      'Analog output',
      'Digital output',
      'Analog input',
    ],
    answer: 1,
    explanation: 'An analog output can provide a variable reference signal, such as 0–10 V or 4–20 mA, to control the VFD speed.',
  },

  {
    id: 'q2',
    type: 'predict_output',
    prompt: 'The Start input is ON, but the Permissive input is OFF. Is the Motor coil ON or OFF?',
    rung: [
      { type: 'NO', label: 'Start', on: true },
      { type: 'NO', label: 'Permissive', on: false }
    ],
    options: ['ON', 'OFF'],
    answer: 'OFF',
    explanation: 'Both contacts are in series. Since the Permissive input is OFF, the rung condition is false and the motor coil remains OFF.',
  },

  {
    id: 'q3',
    type: 'multiple_choice',
    prompt: 'A pressure transmitter is configured for 0–10 bar using a 4–20 mA signal. What pressure does a 4 mA reading represent?',
    options: [
      '0 bar',
      '2.5 bar',
      '5 bar',
      '10 bar',
    ],
    answer: 0,
    explanation: 'For a transmitter scaled from 0–10 bar, 4 mA represents the lower range value of 0 bar.',
  },

  {
    id: 'q4',
    type: 'true_false',
    prompt: 'A PLC can control multiple outputs using a single input signal.',
    answer: true,
    explanation: 'A single input condition can be used in the PLC program to control multiple outputs, depending on the programmed logic.',
  },

  {
    id: 'q5',
    type: 'multiple_choice',
    prompt: 'A PLC output indicator is ON, but the connected solenoid valve does not operate. What should the engineer check first?',
    options: [
      'Field wiring and power supply',
      'HMI screen resolution',
      'PLC program comments',
      'Network device names',
    ],
    answer: 0,
    explanation: 'Check the output wiring, supply voltage, fuse, and solenoid coil to identify a possible field-side fault.',
  },

  {
    id: 'q6',
    type: 'drag_order',
    prompt: 'Arrange the steps showing how a PLC controls a conveyor when a sensor detects an object.',
    items: [
        'Sensor detects an object',
        'PLC receives the input signal',
        'PLC executes its control logic',
        'PLC activates the output',
        'Conveyor responds',
    ],
    explanation: 'The sensor detects the object, the PLC processes the signal, and its output controls the conveyor.',
  },

  {
    id: 'q7',
    type: 'multiple_choice',
    prompt: 'A sensor changes state just after the PLC has read its inputs during a scan. When will a typical scan-based PLC process this change?',
    options: [
      'During the next input update',
      'Before the current scan ends',
      'After the PLC restarts',
      'Only when the program is edited',
    ],
    answer: 0,
    explanation: 'In a typical scan-based PLC, the new input state is read during the next input update.',
  },

  {
    id: 'q8',
    type: 'predict_output',
    prompt: 'The Auto Mode input is ON and the Fault input is OFF. Is the Motor coil ON or OFF?',
    rung: [
      { type: 'NO', label: 'Auto Mode', on: true },
      { type: 'NC', label: 'Fault', on: false }
    ],
    options: ['ON', 'OFF'],
    answer: 'ON',
    explanation: 'The Auto Mode contact is true, and the NC Fault contact is also true because its input bit is OFF. Both conditions are satisfied.',
  },

  {
    id: 'q9',
    type: 'multiple_choice',
    prompt: 'A PLC has a 24 VDC digital output, but the connected contactor has a 230 VAC coil. What is the appropriate solution?',
    options: [
      'Use a suitable interposing relay',
      'Connect the coil directly',
      'Replace the PLC CPU',
      'Use an analog input module',
    ],
    answer: 0,
    explanation: 'A suitably rated interface relay can allow the 24 VDC PLC output to switch the 230 VAC contactor coil. Verify voltage, current, isolation, and ratings.',
  },

  {
    id: 'q10',
    type: 'true_false',
    prompt: 'A PLC can use feedback from a motor to confirm whether it has actually started.',
    answer: true,
    explanation: 'Feedback from an auxiliary contact, drive status signal, or suitable sensor can help the PLC verify equipment operation.',
  },
]
};