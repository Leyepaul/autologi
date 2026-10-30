export default {
  id: '1.5',
title: 'Put it to Work',
intro: {
  mascot: '🤖',
  heading: 'Bring automation to life',
  paragraphs: [
    'You’ve learned the fundamentals of automation, explored the tools, and discovered how control systems make decisions. Now it’s time to put that knowledge into practice.',
    'In this section, you’ll tackle real-world automation scenarios, apply control logic, choose the right equipment, and troubleshoot problems just like an automation engineer.',
  ],
},
    questions:[
  {
    id: 'q1',
    type: 'multiple_choice',
    prompt: 'A factory wants to reduce manual handling of products on a conveyor system. Which solution best demonstrates industrial automation?',
    options: [
      'An operator manually checks and moves every product',
      'Sensors detect products, a PLC controls the sequence, and actuators perform the required actions',
      'A larger conveyor is installed without changing how it operates',
      'Operators record product counts on paper after each shift',
    ],
    answer: 1,
    explanation: 'Industrial automation combines sensing, control logic, and physical actions to perform tasks with reduced manual intervention. The PLC coordinates the process using information from sensors and commands to actuators.',
  },

  {
    id: 'q2',
    type: 'true_false',
    prompt: 'An automated system can continue operating without constant human intervention, even though people are still needed to supervise, maintain, and improve it.',
    answer: true,
    explanation: 'Automation reduces the need for continuous manual operation, but people remain important for monitoring, maintenance, fault recovery, and system improvements.',
  },

  {
    id: 'q3',
    type: 'multiple_choice',
    prompt: 'A packaging machine must detect when a metal container reaches a particular position. Which device is most suitable for detecting the container without physical contact?',
    options: [
      'Inductive proximity sensor',
      'Contactor',
      'Variable Frequency Drive',
      'Overload relay',
    ],
    answer: 0,
    explanation: 'An inductive proximity sensor detects metallic objects without physical contact. Its sensing range and mounting conditions must be suitable for the application.',
  },

  {
    id: 'q4',
    type: 'multiple_choice',
    prompt: 'A conveyor motor needs to run at different speeds depending on production demand. Which device is best suited to control its speed?',
    options: [
      'Circuit breaker',
      'Ethernet switch',
      'Variable Frequency Drive (VFD)',
      'Digital input module',
    ],
    answer: 2,
    explanation: 'A VFD varies the frequency and voltage supplied to a compatible AC motor to control its speed. The PLC can send speed commands to the drive when the system is configured for this type of control.',
  },

  {
    id: 'q5',
    type: 'multiple_choice',
    prompt: 'A tank has a level transmitter connected to a PLC through a 4–20 mA signal. What does this signal typically allow the PLC to determine?',
    options: [
      'Only whether the tank is completely full or empty',
      'The measured tank level across a configured range',
      'The network address of the transmitter',
      'Whether the PLC program has been deleted',
    ],
    answer: 1,
    explanation: 'A 4–20 mA analog signal can represent a range of measured values. Once the transmitter range is configured and the signal is scaled correctly, the PLC can calculate the corresponding tank level.',
  },

  {
    id: 'q6',
    type: 'drag_order',
    prompt: 'A bottle moves along a conveyor and must be detected before a PLC commands a mechanism to divert it. Arrange the control sequence.',
    items: [
      'The sensor detects the bottle',
      'The PLC reads the sensor input',
      'The PLC evaluates the programmed conditions',
      'The PLC activates the appropriate output',
      'The diversion mechanism responds',
    ],
    explanation: 'The sensor provides the detection signal, the PLC evaluates it against its programmed conditions, and the appropriate output commands the mechanism. The physical response depends on the connected equipment and system design.',
  },

  {
    id: 'q7',
    type: 'true_false',
    prompt: 'If a PLC output is programmed to turn on, the connected motor must start successfully.',
    answer: false,
    explanation: 'A PLC output is only a control command. The motor may still fail to start because of a drive fault, loss of power, a wiring problem, an active overload, or another equipment issue.',
  },

  {
    id: 'q8',
    type: 'multiple_choice',
    prompt: 'A machine is programmed to run only when the Start command is active and all required operating permissives are satisfied. The Start command is active, but one permissive is false. What should happen?',
    options: [
      'The machine should run because the Start command is active',
      'The machine should ignore the false permissive',
      'The machine should remain prevented from starting until the required conditions are satisfied',
      'The PLC should automatically remove the permissive from its program',
    ],
    answer: 2,
    explanation: 'When the control logic requires multiple conditions to be true, one false condition prevents the operation from being permitted. Safety-related functions must also be implemented using appropriately designed and validated safety systems, not assumed to be provided by ordinary PLC logic alone.',
  },

  {
    id: 'q9',
    type: 'multiple_choice',
    prompt: 'A PLC and an HMI are connected to the same industrial Ethernet switch, but the HMI cannot retrieve data from the PLC. What is the best initial troubleshooting approach?',
    options: [
      'Immediately replace the PLC',
      'Check network connectivity, device IP settings, and the configured communication connection',
      'Replace the PLC input modules with analog modules',
      'Increase the conveyor motor speed',
    ],
    answer: 1,
    explanation: 'Start with the basics: check power and Ethernet connections, verify that the devices have compatible IP settings, and confirm that the HMI communication settings are correct. If these are healthy, investigate protocol configuration, diagnostics, and other possible causes.',
  },

  {
    id: 'q10',
    type: 'multiple_choice',
    prompt: 'A conveyor motor refuses to start. The HMI shows that the Start command is active, but the PLC indicates that the guard-closed permissive is false. What should the engineer investigate first?',
    options: [
      'Increase the motor speed reference',
      'Force the permissive bit to true so production can continue',
      'Inspect the guard, its position switch, wiring, and corresponding PLC input or safety-system diagnostics',
      'Replace the Ethernet switch immediately',
    ],
    answer: 2,
    explanation: 'The displayed permissive identifies a condition preventing the conveyor from starting. Investigate the actual guard condition, switch, wiring, and relevant input or safety diagnostics. Never bypass a safety function just to restore production; follow the approved fault-finding and safety procedures.',
  },
]
}  