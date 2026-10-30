# Leaderboard setup (about 15 minutes)

The app works without this. Follow these steps to switch the leaderboard on.

## 1. Create a Supabase project
1. Go to supabase.com and sign up (free).
2. New project: pick a name, a database password (save it somewhere), and the region closest to your players.

## 2. Allow anonymous sign-in
Players get an invisible account, so nobody needs an email or password.
Authentication > Sign In / Providers (or Settings) > turn ON **Allow anonymous sign-ins**.

## 3. Create the tables
1. Left menu: **SQL Editor** > New query.
2. Open `supabase/schema.sql` from this project, copy everything, paste, click **Run**.
3. You should see "Success". If you see an error, copy the message and ask for help.

## 4. Connect the app
1. In Supabase: Project Settings > **API** (or API Keys). Copy the **Project URL** and the **anon / publishable key**.
2. In the project folder, copy `.env.example` to `.env`:
   - Windows Command Prompt: `copy .env.example .env`
3. Open `.env` and paste your two values.
4. Install the library: `npm install @supabase/supabase-js`
5. **Stop and restart** `npm run dev` (the .env file is only read when the server starts).

## 5. Test with two players
Open the app in a normal browser window and an incognito window. Each one is a different player.
Pick two names, finish a lesson in each, then tap the 🏆 Ranks button.

## How the pieces fit
| File | Job |
|---|---|
| `supabase/schema.sql` | Tables, security rules, ranking view |
| `src/lib/supabase.js` | Connects using your .env values |
| `src/services/leaderboardService.js` | Every database call (the only file that talks to Supabase) |
| `src/hooks/usePlayer.js` | Who is playing: sign-in, nickname, status |
| `src/screens/NameScreen.jsx` | First-visit nickname screen |
| `src/screens/LeaderboardScreen.jsx` | The ranking list |
| `src/App.jsx` | Uploads the result after each lesson |

## Known limits (important)
- **Cheating:** scoring happens in the browser, so a determined player could send fake XP. The database caps XP per lesson and keeps one row per lesson, which limits the damage, but it is fine for friends, a class or a team, not for prizes. Stronger protection later: check answers on the server.
- **Identity:** anonymous accounts live in the browser. Clearing browser data or switching device creates a new player. Later you can add email login to keep accounts.
- **Names are public.** There is no profanity filter yet.
- **Free plan:** Supabase pauses free projects after a period of no activity. You can resume it from the dashboard.
- **Deploying:** when you publish (for example on Vercel), add the same two values as environment variables there.

---

# Email login and progress on any device

No new SQL is needed. These are dashboard settings plus one test.

## A. Dashboard settings (Supabase)
1. **Authentication > URL Configuration**
   - **Site URL:** `http://localhost:5173`
   - **Redirect URLs:** add `http://localhost:*/**` (this also covers port 5174 if 5173 is busy)
   - When you deploy, add your real website address here too.
2. **Authentication > Sign In / Providers > Email:** make sure Email is enabled and **Confirm email** is ON.
3. Leave the default email templates as they are.

## B. How it works
| Moment | What happens |
|---|---|
| New device, nobody signed in | Welcome screen: **Start playing** (guest) or **I already have an account** |
| Guest taps 👤 and adds email | Same account, now permanent. Score, name and progress are kept. |
| Log in with email on any device | Magic link, no password. Progress is downloaded from the database and merged with this device (best score per lesson wins). |
| Log out | Only for email accounts. Guests can't log out, because they'd lose the account. |

The key code: `useProgress.js` (download + merge + upload) and `usePlayer.js` (who is signed in).

## C. Test it (one computer, two browsers)
1. Browser 1: **Start playing**, pick a name, finish a lesson.
2. Tap 👤, enter your email, click **Save my progress**, then open the email link.
3. 👤 should now say "Signed in as your@email".
4. Browser 2 (or an incognito window): **I already have an account**, enter the same email, open the link.
5. The home path should show the lesson you finished in browser 1, with your name on the leaderboard once.

## D. Limits you must know
- **The email link points to localhost**, so it only opens on this computer until you deploy. Real phone testing needs a deployed site (for example Vercel) with its address added to Redirect URLs.
- **Supabase's built-in email sender is for testing.** It allows only a few emails per hour. Before real users, set up your own SMTP provider (Authentication > Emails > SMTP Settings).
- **A typo in the email locks the account to an address nobody owns.** Confirm email being ON protects against this, since the link must be clicked.
- **Logging in to an existing account from a guest leaves the old guest entry on the leaderboard.** Its score is merged into your account, so you'd appear twice until the guest is removed. Remove stale guests in Authentication > Users, or run this occasionally in the SQL Editor (it deletes guests older than 60 days who never finished a lesson):
  ```sql
  delete from auth.users
  where is_anonymous = true
    and created_at < now() - interval '60 days'
    and id not in (select user_id from public.lesson_results);
  ```
- **"Reset my progress"** only appears when the leaderboard is off, because online results can't be undone from the app.
