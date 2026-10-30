# Automation 101

A Duolingo-style learning app for automation engineering.

## Run it
```
npm install
npm run dev
```
(Run `npm install` again whenever package.json changes.)

## Folder map
| Folder / file | What it does |
|---|---|
| `CONTENT-GUIDE.md` | How to add and edit questions and lessons |
| `src/config.js` | Dev switch: unlock all lessons for testing |
| `src/data/units.js` | Course map: units, lesson names, unit colours |
| `src/data/lessons/` | One file per lesson (questions live here) + `index.js` registry |
| `src/hooks/useLesson.js` | Lesson logic: check, continue, retry wrong answers, XP |
| `src/hooks/useProgress.js` | Saves completed lessons in the browser |
| `src/utils/` | `checkAnswer.js`, `pathState.js` (locked/unlocked), `shuffle.js` |
| `src/screens/` | Home, Intro, Lesson, Result |
| `src/components/home/` | Unit banner and lesson path nodes |
| `src/components/questions/` | One file per question type + `QuestionRenderer.jsx` |
| `src/styles/` | CSS by purpose. All colours: `variables.css` |

## Leaderboard (optional)
See `SETUP-LEADERBOARD.md`. Files: `supabase/schema.sql`, `src/lib/supabase.js`,
`src/services/leaderboardService.js`, `src/hooks/usePlayer.js`,
`src/screens/NameScreen.jsx`, `src/screens/LeaderboardScreen.jsx`,
`src/components/leaderboard/`, `src/styles/leaderboard.css`.

## Accounts and sync
`src/hooks/usePlayer.js` (who is signed in), `src/hooks/useProgress.js` (local + online progress, merged),
`src/screens/WelcomeScreen.jsx`, `src/screens/AccountScreen.jsx`, `src/components/account/EmailForm.jsx`,
`src/utils/storageKeys.js`. Setup: section "Email login" in `SETUP-LEADERBOARD.md`.
