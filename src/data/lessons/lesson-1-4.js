export default {
id: '1.4',
title: 'Making Machines Think',
intro: {
  mascot: '🤖',
  heading: 'The logic behind every action',
  paragraphs: [
    'Machines follow programmed instructions to decide when to start, stop, move, or respond to changing conditions.',
    'In this section, you will explore how control logic, conditions, interlocks, and sequences work together to determine machine behaviour and keep automated processes running as intended.',
  ],
},
    questions: [
  {
    id: 'q1',
    type: 'multiple_choice',
    prompt: 'A motor should start only when the Start button is pressed AND the safety guard is closed. What happens if the Start button is pressed while the guard is open?',
    options: [
      'The motor starts immediately',
      'The motor starts for a few seconds',
      'The motor remains off because both conditions are not satisfied',
      'The PLC automatically closes the safety guard',
    ],
    answer: 2,
    explanation: 'Both conditions must be true for the motor to start. If the safety guard is open, the required conditions are not satisfied, so the motor should remain off.',
  },

  {
    id: 'q2',
    type: 'true_false',
    prompt: 'An interlock can be used to prevent two machine operations from occurring at the same time when doing so could be unsafe or undesirable.',
    answer: true,
    explanation: 'Interlocks are used to enforce conditions between machine operations. For example, an interlock can prevent a forward command and reverse command from being active at the same time.',
  },

  {
    id: 'q3',
    type: 'multiple_choice',
    prompt: 'A conveyor system should run when either Sensor A OR Sensor B detects a product. Which logic condition best represents this requirement?',
    options: [
      'AND',
      'OR',
      'NOT',
      'None of these',
    ],
    answer: 1,
    explanation: 'OR logic allows the action to occur when at least one of the specified conditions is true. Here, either Sensor A or Sensor B can trigger the conveyor.',
  },

  {
    id: 'q4',
    type: 'drag_order',
    prompt: 'A machine uses a start button, a motor, and a stop condition. Arrange the basic sequence for starting the machine.',
    items: [
      'Operator presses the Start button',
      'PLC receives the start signal',
      'PLC checks the required conditions',
      'PLC activates the motor output',
      'Motor starts',
    ],
    explanation: 'The PLC receives the operator command, checks whether the required conditions are satisfied, and then activates the motor output. The motor responds to that command.',
  },

  {
    id: 'q5',
    type: 'multiple_choice',
    prompt: 'A motor is allowed to run only when the emergency stop is healthy, the safety guard is closed, and the Start command is active. What does this represent?',
    options: [
      'A single input condition',
      'A sequence of unrelated events',
      'Multiple permissive conditions',
      'A communication protocol',
    ],
    answer: 2,
    explanation: 'Permissives are conditions that must be satisfied before an operation is allowed. Here, all three conditions must be satisfied before the motor can run.',
  },

  {
    id: 'q6',
    type: 'true_false',
    prompt: 'A normally closed condition in control logic always means the physical device connected to it must be physically closed.',
    answer: false,
    explanation: 'Normally open and normally closed can describe the state of a physical contact or how a contact is represented in control logic. The logical state and the physical device state should not be assumed to be identical in every situation.',
  },

  {
    id: 'q7',
    type: 'multiple_choice',
    prompt: 'A pump should start when the tank level is LOW and stop when the tank reaches HIGH level. What is this type of control commonly designed to achieve?',
    options: [
      'Maintaining a process within desired operating limits',
      'Increasing the network speed',
      'Changing the PLC programming language',
      'Preventing the sensor from measuring level',
    ],
    answer: 0,
    explanation: 'The control system uses different level conditions to start and stop the pump, keeping the tank level within a desired operating range.',
  },

  {
    id: 'q8',
    type: 'multiple_choice',
    prompt: 'A conveyor should start only after a product is detected and remain running until the product reaches the next sensor. What type of control concept is most relevant?',
    options: [
      'Sequence control',
      'Network addressing',
      'Signal conversion',
      'Manual calibration',
    ],
    answer: 0,
    explanation: 'Sequence control defines how a machine performs operations in a particular order based on events or conditions.',
  },

  {
    id: 'q9',
    type: 'multiple_choice',
    prompt: 'A motor is commanded to run, but the PLC immediately removes the output because a safety condition becomes false. What is the control system demonstrating?',
    options: [
      'A permissive or interlock condition affecting the machine operation',
      'A change in the PLC programming language',
      'A sensor converting into an actuator',
      'A network switch changing the motor speed',
    ],
    answer: 0,
    explanation: 'Safety conditions and interlocks can override a normal run command when required conditions are no longer satisfied. This helps prevent unsafe or unwanted machine operation.',
  },

  {
    id: 'q10',
    type: 'drag_order',
    prompt: 'A machine must complete three operations in sequence. Arrange the control process correctly.',
    items: [
      'Start the machine',
      'Detect that Operation 1 is complete',
      'Move to Operation 2',
      'Detect that Operation 2 is complete',
      'Move to Operation 3',
    ],
    explanation: 'Sequence control allows a machine to progress from one operation to the next based on defined conditions or completion signals. The controller determines when each step is complete before moving forward.',
  },
]
}  