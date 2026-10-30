// By default the game follows its REAL unlock rules, even while you develop:
// a unit stays locked until every lesson in the previous unit is finished.
//
// To open everything while you are building or testing, add this line to your .env file
// and restart `npm run dev`:
//     VITE_UNLOCK_ALL=true
// It only works in development. A published build (`npm run build`) always uses the real rules.
export const DEV_UNLOCK_ALL = import.meta.env.DEV && import.meta.env.VITE_UNLOCK_ALL === 'true';