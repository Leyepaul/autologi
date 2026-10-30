# Content guide: how to update questions

You only edit files in `src/data/`. You never need to touch the screens or components.

## Where things live
| What | File |
|---|---|
| The course map (units, lesson names, unit colours) | `src/data/units.js` |
| Questions for one lesson | `src/data/lessons/lesson-X-Y.js` (one file per lesson) |
| List of lessons that are playable | `src/data/lessons/index.js` |

## Edit an existing question
Open the lesson file (for example `lesson-2-2.js`), change the text, save. The browser updates by itself.

## Add a question
Copy one of the templates below, paste it into the `questions: [ ... ]` list, give it a new `id`, and edit it.

### Multiple choice
`answer` is the position of the right option, counting from 0.
```js
{
  id: 'q5',
  type: 'multiple_choice',
  prompt: 'Which sensor detects a metal object without touching it?',
  options: ['Limit switch', 'Inductive proximity sensor', 'Thermocouple', 'Float switch'],
  answer: 1,
  explanation: 'Inductive sensors detect metal with no contact.',
},
```

### True / false
```js
{
  id: 'q6',
  type: 'true_false',
  prompt: 'A PLC scans its program only once.',
  answer: false,
  explanation: 'A PLC scans continuously.',
},
```

### Predict the output (ladder rung)
`type` is NO or NC. `on` is whether that input is ON. `answer` must be exactly 'ON' or 'OFF' as in `options`.
```js
{
  id: 'q7',
  type: 'predict_output',
  prompt: 'The button is pressed. Is the lamp ON or OFF?',
  rung: [{ type: 'NO', label: 'Start button', on: true }],
  options: ['ON', 'OFF'],
  answer: 'ON',
  explanation: 'A NO contact closes when its input is ON.',
},
```
Two contacts in series (AND logic) work too: put two objects in `rung`.

### Match pairs (each pair gets its own colour)
Use 3 to 5 pairs. Pair 1 is blue (A), pair 2 orange (B), pair 3 purple (C), pair 4 teal (D), pair 5 pink (E).
The colour appears when the learner matches that pair correctly.
```js
{
  id: 'q8',
  type: 'match_pairs',
  prompt: 'Match each sensor to what it detects',
  pairs: [
    { left: 'Thermocouple', right: 'Temperature' },
    { left: 'Load cell', right: 'Weight' },
    { left: 'Photoeye', right: 'Objects blocking a light beam' },
  ],
  explanation: 'Each sensor type is built for one measurement.',
},
```

### Drag to order
Write `items` in the CORRECT order. The app shuffles them for the learner.
```js
{
  id: 'q9',
  type: 'drag_order',
  prompt: 'Put the start-up steps in order',
  items: ['Check the area is clear', 'Press START', 'Motor runs', 'Press STOP'],
  explanation: 'Safety check first, then start, run, stop.',
},
```

## Add a whole new lesson (3 steps)
1. Copy `src/data/lessons/lesson-2-2.js` to a new file, for example `lesson-1-2.js`. Change `id` to match the lesson id in `units.js` (for example `'1.2'`), then edit the title, intro and questions.
2. Open `src/data/lessons/index.js`, add `import lesson12 from './lesson-1-2';` and add `lesson12` to the `all` list.
3. Save. The node on the home page changes from "coming soon" to playable.

## Change a lesson name or unit colour
Edit `src/data/units.js`. `color` is the unit colour and `colorDark` is the darker edge under buttons.

## Change the app colours
Edit `src/styles/variables.css`. Every colour in the app comes from that one file.

## Testing tip
`src/config.js` has `DEV_UNLOCK_ALL = true`, which opens every lesson that has content. Set it to `false` to test the real unlock order.

## Common mistakes
- Missing comma between two questions.
- Two questions with the same `id` in one lesson.
- Lesson `id` in the lesson file not matching `units.js`.
- A `drag_order` item repeated twice (items must be unique text).
- Forgetting to register a new lesson in `lessons/index.js`.
