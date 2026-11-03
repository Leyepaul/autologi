// Lesson 2.1. See CONTENT-GUIDE.md in the project root for question templates.
export default {
  id: '2.1',
  title: 'PLC Fundamentals',
  intro: {
    mascot: '🤖',
    heading: 'Meet the brain behind the machine',
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
    explanation: 'PLC stands for Programmable Logic Controller. It is an industrial controller designed to execute programmed instructions and control machines or processes.',
  },

  {
    id: 'q2',
    type: 'multiple_choice',
    prompt: 'What is the primary purpose of a PLC in an industrial environment?',
    options: [
      'To provide mechanical power to machines',
      'To monitor inputs, execute control logic, and control outputs',
      'To replace all electrical equipment in a factory',
      'To manufacture products without any other equipment',
    ],
    answer: 1,
    explanation: 'A PLC receives information from connected devices, processes that information using its programmed logic, and controls outputs to operate machines and industrial processes.',
  },

  {
    id: 'q3',
    type: 'true_false',
    prompt: 'A PLC can be reprogrammed to perform different control tasks without changing its physical hardware in every case.',
    answer: true,
    explanation: 'One of the major advantages of PLCs is their flexibility. Their control behaviour can often be changed by modifying the program rather than redesigning the entire control circuit.',
  },

  {
    id: 'q4',
    type: 'match_pairs',
    prompt: 'Match each industrial control method or device to its description.',
    pairs: [
      {
        left: 'PLC',
        right: 'Executes control logic',
      },
      {
        left: 'Relay control circuit',
        right: 'Uses wired electrical contacts',
      },
      {
        left: 'HMI',
        right: 'Enables operator interaction',
      },
      {
        left: 'Industrial computer',
        right: 'Runs industrial applications',
      },
    ],
    explanation: 'Different devices serve different purposes. PLCs are designed for industrial control, relay circuits use hardwired logic, HMIs provide operator interaction, and industrial computers support broader computing applications.',
  },

  {
    id: 'q5',
    type: 'multiple_choice',
    prompt: 'Why are PLCs widely used in industrial environments?',
    options: [
      'They are designed to operate reliably in demanding industrial conditions',
      'They never experience faults or require maintenance',
      'They eliminate the need for sensors and actuators',
      'They can only control one machine at a time',
    ],
    answer: 0,
    explanation: 'PLCs are designed for industrial applications where reliability, predictable operation, electrical noise immunity, and maintainability are important. They still require proper installation and maintenance.',
  },

  {
    id: 'q6',
    type: 'true_false',
    prompt: 'A PLC can control more than one machine or process using a single program.',
    answer: true,
    explanation: 'A PLC can manage multiple machines, equipment groups, or process operations, provided it has suitable processing capacity, I/O resources, and an appropriately designed program.',
  },

  {
    id: 'q7',
    type: 'drag_order',
    prompt: 'Arrange the basic stages of how a PLC controls an industrial process.',
    items: [
      'Field devices provide input signals',
      'The PLC processes the information using its program',
      'The PLC updates its output signals',
      'Connected equipment responds to the output commands',
    ],
    explanation: 'A PLC receives information from field devices, evaluates its programmed instructions, and updates its outputs to control connected equipment.',
  },

  {
    id: 'q8',
    type: 'multiple_choice',
    prompt: 'A factory wants to change the operating sequence of a machine. Which feature of a PLC makes this easier than modifying a traditional hardwired relay circuit?',
    options: [
      'Its ability to store and execute a modifiable control program',
      'Its ability to generate mechanical movement',
      'Its ability to operate without electrical power',
      'Its ability to eliminate all control wiring',
    ],
    answer: 0,
    explanation: 'A PLC stores its control instructions as a program. Engineers can modify the program to change machine behaviour, although hardware, wiring, testing, and safety changes may also be necessary depending on the modification.',
  },

{
  id: 'q9',
  type: 'match_pairs',
  prompt: 'Match each PLC component to its function.',
  pairs: [
    {
      left: 'CPU',
      right: 'Executes logic',
    },
    {
      left: 'Input module',
      right: 'Receives signals',
    },
    {
      left: 'Output module',
      right: 'Sends commands',
    },
    {
      left: 'Power supply',
      right: 'Powers the PLC',
    },
  ],
  explanation: 'Each component performs a specific role in PLC operation.',
},

  {
    id: 'q10',
    type: 'multiple_choice',
    prompt: 'A factory currently uses a hardwired relay circuit to control a machine. The engineers want to introduce more complex operating sequences and make future changes easier. What would be a suitable improvement?',
    options: [
      'Replace every sensor with a manual switch',
      'Introduce a suitable PLC-based control system',
      'Remove all control devices from the machine',
      'Use a larger contactor to perform all control functions',
    ],
    answer: 1,
    explanation: 'A PLC-based control system can simplify complex control sequences and make future changes easier through software modifications. The conversion still requires appropriate hardware selection, engineering, commissioning, and validation.',
  },
]
};
