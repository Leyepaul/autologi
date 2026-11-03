// Lesson 2.4. See CONTENT-GUIDE.md in the project root for question templates.
export default {
    id: '2.4',
    title: 'How PLCs Work',
    intro: {
    mascot: '🤖',
    heading: 'Inside the PLC scan cycle',
    paragraphs: [
        'A PLC continuously executes its control program to monitor conditions and control connected equipment.',
        'In this section, you will explore how PLCs execute instructions, manage operating modes, and respond to changing conditions.',
    ],
},

  questions: [
  {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the PLC scan cycle?',
        options: [
        'A repeating process of executing the control program',
        'A procedure for installing PLC hardware',
        'A method of connecting industrial networks',
        'A process for calibrating field instruments',
        ],
        answer: 0,
        explanation: 'The scan cycle is the repeating process through which a PLC reads inputs, executes logic, and updates outputs.',
    },

    {
        id: 'q2',
        type: 'drag_order',
        prompt: 'Arrange the main stages of a typical PLC scan cycle.',
        items: [
        'Read input states',
        'Execute the control program',
        'Update output states',
        'Repeat the scan cycle',
        ],
        explanation: 'A typical PLC scan reads inputs, executes the program, updates outputs, and begins another cycle.',
    },

    {
        id: 'q3',
        type: 'true_false',
        prompt: 'A PLC normally repeats its scan cycle continuously while operating in RUN mode.',
        answer: true,
        explanation: 'In RUN mode, the PLC repeatedly executes its control program according to its operating cycle.',
    },

    {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What does PLC scan time represent?',
        options: [
        'Time taken to complete one scan cycle',
        'Time taken to install the controller',
        'Time required to connect an HMI',
        'Time taken to power up a motor',
        ],
        answer: 0,
        explanation: 'Scan time is the time required for the PLC to complete one execution cycle.',
    },

    {
        id: 'q5',
        type: 'predict_output',
        prompt: 'The Start input is ON. Is the Motor coil ON or OFF?',
        rung: [
        { type: 'NO', label: 'Start', on: true }
        ],
        options: ['ON', 'OFF'],
        answer: 'ON',
        explanation: 'The NO instruction is true when its input bit is ON, allowing the rung to energise the motor output.',
    },

    {
        id: 'q6',
        type: 'multiple_choice',
        prompt: 'Which PLC operating mode allows the controller to execute its control program?',
        options: [
        'RUN mode',
        'STOP mode',
        'PROGRAM mode',
        'MAINTENANCE mode',
        ],
        answer: 0,
        explanation: 'RUN mode allows the PLC to execute its control program. The behaviour of other modes depends on the PLC platform.',
    },

    {
        id: 'q7',
        type: 'true_false',
        prompt: 'When a PLC is in STOP mode, it normally stops executing its control program.',
        answer: true,
        explanation: 'In STOP mode, the PLC does not execute its normal control program. Exact behaviour of outputs depends on the controller configuration.',
    },

    {
        id: 'q8',
        type: 'multiple_choice',
        prompt: 'What happens if a PLC input changes state while the controller is executing its program?',
        options: [
            'The change is read during an input update',
            'The PLC immediately restarts its program',
            'The CPU automatically enters STOP mode',
            'The output module loses its configuration',
        ],
        answer: 0,
        explanation: 'In a typical scan-based PLC, input changes are read during the input update stage of the scan cycle.',
    },

    {
        id: 'q9',
        type: 'predict_output',
        prompt: 'The Stop input is OFF. Is the Lamp coil ON or OFF?',
        rung: [
        { type: 'NC', label: 'Stop', on: false }
        ],
        options: ['ON', 'OFF'],
        answer: 'ON',
        explanation: 'The NC instruction is true when its input bit is OFF, allowing the rung to energise the lamp output.',
    },

    {
        id: 'q10',
        type: 'multiple_choice',
        prompt: 'A PLC program becomes more complex and its scan time increases. What is a possible consequence?',
        options: [
        'Slower response to changing inputs',
        'Automatic increase in input voltage',
        'Permanent expansion of I/O capacity',
        'Automatic improvement in network speed',
        ],
        answer: 0,
        explanation: 'A longer scan time can delay the PLCs response to changing conditions, depending on the control application.',
    },
    ]
};