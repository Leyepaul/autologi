// Lesson 2.2. See CONTENT-GUIDE.md in the project root for question templates.
export default {
  id: '2.2',
  title: 'Anatomy of a PLC',
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
      prompt: 'In a modular PLC system, what is the primary purpose of the chassis or rack?',
      options: [
        'To house and support PLC modules',
        'To convert analog signals into digital values',
        'To execute the control program',
        'To supply power to field instruments',
      ],
      answer: 0,
      explanation: 'The chassis or rack holds PLC modules and provides the physical structure for the system.',
    },

    {
      id: 'q2',
      type: 'true_false',
      prompt: 'Adding more I/O modules to a modular PLC always increases its capacity without any limitations.',
      answer: false,
      explanation: 'Expansion is limited by the PLC model, available slots, power capacity, and supported I/O limits.',
    },

    {
      id: 'q3',
      type: 'multiple_choice',
      prompt: 'Which PLC configuration is generally suited to applications requiring flexible hardware expansion?',
      options: [
        'A modular PLC system',
        'A fixed-function relay circuit',
        'A standalone HMI panel',
        'A basic motor starter',
      ],
      answer: 0,
      explanation: 'Modular PLC systems allow compatible hardware modules to be added or changed as requirements grow.',
    },

    {
      id: 'q4',
      type: 'multiple_choice',
      prompt: 'An engineer wants to add an I/O module to an existing PLC rack. What should be checked first?',
      options: [
        'Module compatibility with the PLC',
        'Colour of the module housing',
        'Brand of the connected HMI',
        'Size of the operator workstation',
      ],
      answer: 0,
      explanation: 'The module must be compatible with the PLC platform and its hardware configuration.',
    },

    {
      id: 'q5',
      type: 'multiple_choice',
      prompt: 'A PLC rack has no free slots for additional modules. What could the engineer consider?',
      options: [
        'Using a supported expansion rack',
        'Increasing the CPU clock speed',
        'Replacing the HMI display',
        'Changing the field sensor type',
      ],
      answer: 0,
      explanation: 'A compatible expansion rack can provide additional module slots where the PLC platform supports it.',
    },

    {
      id: 'q6',
      type: 'drag_order',
      prompt: 'Arrange these steps when planning a modular PLC hardware configuration.',
      items: [
        'Identify the required field connections',
        'Select a compatible PLC platform',
        'Choose suitable I/O modules',
        'Check rack space and power capacity',
        'Verify the complete hardware configuration',
      ],
      explanation: 'Good hardware planning starts with application requirements and ends with compatibility and capacity checks.',
    },

    {
      id: 'q7',
      type: 'multiple_choice',
      prompt: 'What is commonly used to connect remote I/O stations to a PLC system?',
      options: [
        'An industrial communication network',
        'A mechanical coupling assembly',
        'A pneumatic distribution manifold',
        'A standard motor contactor',
      ],
      answer: 0,
      explanation: 'Remote I/O stations communicate with the controller over supported industrial networks.',
    },

    {
      id: 'q8',
      type: 'true_false',
      prompt: 'Remote I/O can reduce the need to run individual field signal cables back to the main PLC cabinet.',
      answer: true,
      explanation: 'Remote I/O allows field connections closer to equipment, with communication links connecting them to the controller.',
    },

    {
      id: 'q9',
      type: 'drag_order',
      prompt: 'Arrange the steps for adding a remote I/O station to an existing PLC system.',
      items: [
        'Check PLC and network compatibility',
        'Select a suitable remote I/O station',
        'Install the remote I/O hardware',
        'Connect the communication network',
        'Configure and verify the I/O points',
      ],
      explanation: 'Remote I/O deployment requires hardware compatibility, network configuration, and verification of the connected signals.',
    },

    {
      id: 'q10',
      type: 'multiple_choice',
      prompt: 'An engineer wants to replace a PLC module while the system remains powered. What should be verified first?',
      options: [
        'Whether the PLC supports hot swapping',
        'Whether the HMI has a larger screen',
        'Whether the module has the same colour',
        'Whether the field sensors are switched off',
      ],
      answer: 0,
      explanation: 'Hot swapping is supported only by certain PLC platforms and modules. Always verify manufacturer requirements and follow approved procedures.',
    },
  ],
};
