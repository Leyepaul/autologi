import { supabase } from '../lib/supabase';
 
// ALL database and login calls live in this one file. Screens never call Supabase directly.
 
const EMAIL_EXISTS = /already (been )?registered|already exists/i;
 
function friendly(error) {
  console.error('Supabase error:', error); // full details: press F12 and open the Console tab
  const msg = error.message || '';
  if (error.status === 429 || /rate limit/i.test(msg)) {
    return new Error('Too many emails sent. Please wait a few minutes and try again.');
  }
  if (/api key|jwt/i.test(msg) || error.status === 401) {
    return new Error('Supabase rejected the key. Check VITE_SUPABASE_ANON_KEY in your .env file, then restart npm run dev.');
  }
  if (/signups? (not allowed|are disabled)|provider is disabled|logins? are disabled/i.test(msg)) {
    return new Error('Email login is switched off in Supabase. Turn on the Email provider under Authentication > Sign In / Providers.');
  }
  if (/redirect/i.test(msg)) {
    return new Error('The redirect address is not allowed. Add http://localhost:*/** under Authentication > URL Configuration.');
  }
  if (/fetch|network/i.test(msg) || !error.status) {
    return new Error('Could not reach Supabase. Check VITE_SUPABASE_URL in your .env file and that the project is not paused.');
  }
  return new Error(`Could not send the email: ${msg}`);
}
 
// ---------- who is signed in ----------
 
// Returns the signed-in user, or null if nobody is signed in on this browser.
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession(); // local, no network
  if (!session) return null;
  const { data, error } = await supabase.auth.getUser();          // asks the server (fresh info)
  if (error) {
    const invalid = error.status === 401 || error.status === 403 || /session|jwt|not found/i.test(error.message);
    if (invalid) { await supabase.auth.signOut(); return null; }
    return session.user; // probably offline: trust the saved session
  }
  return data.user;
}
 
// "Start playing": an invisible guest account, no email needed
export async function startAsGuest() {
  const { error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.error('Guest sign-in failed:', error); // full details for the browser console (F12)
    const msg = error.message || '';
    if (/anonymous/i.test(msg)) {
      throw new Error('Anonymous sign-ins are switched off in Supabase. Turn on "Allow anonymous sign-ins" under Authentication > Sign In / Providers.');
    }
    if (/api key|jwt|401|403/i.test(msg) || error.status === 401 || error.status === 403) {
      throw new Error('Supabase rejected the key. Check VITE_SUPABASE_ANON_KEY in your .env file, then restart npm run dev.');
    }
    if (/captcha/i.test(msg)) {
      throw new Error('Supabase is asking for a CAPTCHA. Turn off bot protection under Authentication.');
    }
    if (/fetch|network|failed/i.test(msg) || error.status === 0 || !error.status) {
      throw new Error('Could not reach Supabase. Check VITE_SUPABASE_URL in your .env file and that the project is not paused.');
    }
    throw new Error(`Could not start: ${msg}`);
  }
}
 
// Guest -> permanent account. Keeps the SAME user, so score and name are kept.
// Supabase emails a confirmation link to the address.
export async function saveProgressWithEmail(email) {
  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo: window.location.origin }
  );
  if (error) {
    if (error.code === 'email_exists' || EMAIL_EXISTS.test(error.message)) {
      const e = new Error('That email already has an account.');
      e.code = 'email_exists';
      throw e;
    }
    throw friendly(error);
  }
}
 
// Log in to an existing account (or create one) with a magic link, no password
export async function sendLoginLink(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin, shouldCreateUser: true },
  });
  if (error) throw friendly(error);
}
 
export async function signOut() {
  await supabase.auth.signOut();
}
 
// ---------- profile ----------
 
export async function getMyProfile(userId) {
  const { data, error } = await supabase
    .from('profiles').select('display_name').eq('id', userId).maybeSingle();
  if (error) throw error;
  return data; // null if the player has not picked a name yet
}
 
export async function setDisplayName(name) {
  const { error } = await supabase.rpc('set_display_name', { p_name: name.trim() });
  if (error) {
    if (error.code === '23505') throw new Error('That name is already taken. Try another.');
    throw new Error('Could not save your name. Check your connection and try again.');
  }
}
 
// ---------- results ----------
 
// Called after every lesson. The database keeps only the BEST result per lesson.
export async function submitResult(lessonId, stats) {
  const { error } = await supabase.rpc('submit_result', {
    p_lesson_id: lessonId,
    p_xp: Math.max(0, Math.min(stats.xp, 200)),
    p_accuracy: Math.max(0, Math.min(stats.accuracy, 100)),
  });
  if (error) throw error;
}
 
// Download MY saved results (this is what restores progress on a new device)
// Row Level Security guarantees you only ever get your own rows.
export async function fetchMyResults() {
  const { data, error } = await supabase.from('lesson_results').select('lesson_id, xp, accuracy');
  if (error) throw error;
  return Object.fromEntries(data.map((r) => [r.lesson_id, { xp: r.xp, accuracy: r.accuracy }]));
}
 
// ---------- leaderboard ----------
 
export async function fetchLeaderboard(limit = 20) {
  const { data, error } = await supabase
    .from('leaderboard').select('*')
    .order('position', { ascending: true })
    .order('display_name', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data;
}
 
export async function fetchMyRow(userId) {
  const { data, error } = await supabase
    .from('leaderboard').select('*').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return data;
}




