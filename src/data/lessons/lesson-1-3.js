export default {
id: '1.3',
title: 'Inside the Control System',
intro: {
  mascot: '🤖',
  heading: 'How machines make decisions',
  paragraphs: [
    'Behind every automated process is a control system that receives information, processes it, and decides what should happen next.',
    'In this section, you will explore how inputs, PLCs, signals, logic, and outputs work together to monitor processes and control machines.',
  ],
},
    questions: [
  {
    id: 'q1',
    type: 'multiple_choice',
    prompt: 'A push button is connected to a PLC input. When the button is pressed, what does the PLC receive?',
    options: [
      'A mechanical movement',
      'An input signal representing the button state',
      'A motor speed command',
      'A new PLC program',
    ],
    answer: 1,
    explanation: 'The push button provides an input signal to the PLC. The PLC can then use that signal in its control logic to determine what should happen next.',
  },

  {
    id: 'q2',
    type: 'true_false',
    prompt: 'A digital input typically has two basic states, such as ON and OFF.',
    answer: true,
    explanation: 'Digital signals typically represent discrete states, commonly ON/OFF, 1/0, or TRUE/FALSE.',
  },

  {
    id: 'q3',
    type: 'multiple_choice',
    prompt: 'Which of these is an example of an analog input?',
    options: [
      'A start push button',
      'An emergency stop switch',
      'A temperature transmitter providing a 4–20 mA signal',
      'A motor contactor feedback contact',
    ],
    answer: 2,
    explanation: 'A temperature transmitter can provide a continuously varying signal such as 4–20 mA. This is an analog input because the value can represent a range of temperatures rather than simply ON or OFF.',
  },

  {
    id: 'q4',
    type: 'drag_order',
    prompt: 'Put these steps in the typical order of a PLC scan cycle.',
    items: [
      'Read the input states',
      'Execute the control program',
      'Update the outputs',
    ],
    explanation: 'A PLC typically reads its inputs, executes its programmed logic using those values, and then updates its outputs. The process repeats continuously while the PLC is running.',
  },

  {
    id: 'q5',
    type: 'multiple_choice',
    prompt: 'A tank level transmitter is reading 65%. What type of information is the PLC receiving?',
    options: [
      'A discrete ON/OFF state only',
      'A continuously variable process measurement',
      'A PLC programming command',
      'A network address',
    ],
    answer: 1,
    explanation: 'A level transmitter provides a process measurement that can vary across a range. The PLC can use this value to make control decisions based on the actual tank level.',
  },

  {
    id: 'q6',
    type: 'true_false',
    prompt: 'A PLC can use an input condition together with programmed logic to determine whether an output should be activated.',
    answer: true,
    explanation: 'This is one of the fundamental functions of a PLC. It evaluates input conditions according to its program and controls outputs based on the programmed logic.',
  },

  {
    id: 'q7',
    type: 'multiple_choice',
    prompt: 'A temperature control system is designed to maintain a process at 80°C. What is 80°C called in this control system?',
    options: [
      'Feedback',
      'Input signal',
      'Setpoint',
      'Output',
    ],
    answer: 2,
    explanation: 'A setpoint is the desired target value for a controlled process. In this example, 80°C is the desired temperature.',
  },

  {
    id: 'q8',
    type: 'multiple_choice',
    prompt: 'A temperature sensor measures 75°C while the desired temperature is 80°C. What should a control system typically do?',
    options: [
      'Ignore the temperature measurement',
      'Compare the measured value with the desired value and determine an appropriate action',
      'Immediately shut down the entire PLC',
      'Change the setpoint to 75°C automatically in every situation',
    ],
    answer: 1,
    explanation: 'A control system can compare the measured process value with the setpoint and use its programmed control strategy to determine the appropriate action.',
  },

  {
    id: 'q9',
    type: 'drag_order',
    prompt: 'A PLC is controlling a conveyor. Arrange the events in the order they would typically occur.',
    items: [
      'The sensor detects a product',
      'The PLC reads the input',
      'The PLC evaluates its program',
      'The PLC updates an output',
      'The conveyor responds',
    ],
    explanation: 'The sensor first detects the product. The PLC reads that input, evaluates its programmed logic, and updates the relevant output. The controlled equipment then responds to that output.',
  },

  {
    id: 'q10',
    type: 'multiple_choice',
    prompt: 'A motor should only run when the Start button is pressed AND the safety condition is healthy. Which type of logic relationship is being used?',
    options: [
      'OR logic',
      'AND logic',
      'NOT logic',
      'Random logic',
    ],
    answer: 1,
    explanation: 'AND logic requires multiple conditions to be true before the resulting action occurs. Here, both the Start command and the safety condition must be satisfied before the motor can run.',
  },
]
}  