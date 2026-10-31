export default {
id: '1.2',
title: 'Know Your Tools',
intro: {
  mascot: '🤖',
  heading: 'Meet the tools behind automation',
  paragraphs: [
    'Automated systems rely on different devices to sense, control, move, and monitor a process.',
    'In this section, you will get familiar with the tools automation engineers work with, from sensors and actuators to PLCs, HMIs, drives, and basic networking equipment.',
  ],
},
    questions: [
  {
    id: 'q1',
    type: 'multiple_choice',
    prompt: 'Which device is commonly used to detect the presence of an object without physically touching it?',
    options: [
      'Contactor',
      'Proximity sensor',
      'Solenoid valve',
      'Circuit breaker',
    ],
    answer: 1,
    explanation: 'A proximity sensor detects the presence of an object without physical contact. Different types can detect different materials and conditions.',
  },

  {
    id: 'q2',
    type: 'multiple_choice',
    prompt: 'Which sensor is best suited for detecting a metal object without physical contact?',
    options: [
      'Inductive proximity sensor',
      'Pressure sensor',
      'Temperature sensor',
      'Float switch',
    ],
    answer: 0,
    explanation: 'Inductive proximity sensors are commonly used to detect metallic objects without physical contact.',
  },

  {
    id: 'q3',
    type: 'true_false',
    prompt: 'A solenoid valve can be used as an actuator in an automated system.',
    answer: true,
    explanation: 'A solenoid valve uses an electrical signal to control the flow of a fluid or gas, making it an actuator in many automated systems.',
  },

  {
    id: 'q4',
    type: 'multiple_choice',
    prompt: 'What is the primary purpose of a contactor?',
    options: [
      'To measure temperature',
      'To detect the position of an object',
      'To switch electrical power to loads such as motors',
      'To store a PLC program',
    ],
    answer: 2,
    explanation: 'A contactor is an electrically controlled switching device commonly used to switch power to electrical loads such as motors.',
  },

  {
    id: 'q5',
    type: 'multiple_choice',
    prompt: 'What is the primary purpose of a Variable Frequency Drive (VFD)?',
    options: [
      'To measure pressure in a process',
      'To control the speed of an AC motor',
      'To detect metallic objects',
      'To display information to an operator',
    ],
    answer: 1,
    explanation: 'A VFD (Variable Frequency Drive) controls the speed and other operating characteristics of an AC motor by varying the frequency and voltage supplied to the motor.',
  },

  {
    id: 'q6',
    type: 'drag_order',
    prompt: 'Arrange these components to show a simple automated motor-control system.',
    items: [
      'Sensor detects a condition',
      'PLC processes the input',
      'PLC sends an output command',
      'Motor or drive responds',
    ],
    explanation: 'The sensor provides information to the PLC, the PLC processes it using its programmed logic, and the resulting output command controls the motor or drive.',
  },

  {
    id: 'q7',
    type: 'multiple_choice',
    prompt: 'What is the main purpose of an Human Machine Interface (HMI) in an automated system?',
    options: [
      'To physically move a machine',
      'To allow an operator to monitor and interact with the control system',
      'To replace every sensor in the system',
      'To provide mechanical power to a motor',
    ],
    answer: 1,
    explanation: 'An HMI (Human-Machine Interface) allows operators to view process information, monitor equipment, acknowledge alarms, and interact with the control system.',
  },

  {
    id: 'q8',
    type: 'true_false',
    prompt: 'An Ethernet switch can allow multiple industrial devices to communicate over a network.',
    answer: true,
    explanation: 'An Ethernet switch connects devices on a network and forwards Ethernet traffic between them. In automation, it can connect devices such as PLCs, HMIs, SCADA computers, and other networked equipment.',
  },

  {
    id: 'q9',
    type: 'multiple_choice',
    prompt: 'A PLC needs to exchange data with an HMI over an Ethernet network. Which device can be used to connect multiple Ethernet devices on the same network?',
    options: [
      'Ethernet switch',
      'Solenoid valve',
      'Contactor',
      'Overload relay',
    ],
    answer: 0,
    explanation: 'An Ethernet switch provides network connectivity between multiple Ethernet devices, allowing devices such as PLCs and HMIs to exchange data.',
  },

  {
    id: 'q10',
    type: 'multiple_choice',
    prompt: 'A conveyor system needs to detect products, control its motor, and allow an operator to monitor its status. Which combination of tools would best support these functions?',
    options: [
      'Proximity sensor, PLC, motor drive, and HMI',
      'Circuit breaker, pressure gauge, and contactor only',
      'Temperature sensor, solenoid valve, and Ethernet cable',
      'HMI, circuit breaker, and proximity sensor only',
    ],
    answer: 0,
    explanation: 'The proximity sensor can detect products, the PLC can process the information and control the system, the motor drive can control the conveyor motor, and the HMI can allow the operator to monitor and interact with the process.',
  },
]
}