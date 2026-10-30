import { useCallback, useEffect, useState } from 'react';
import { isConfigured, supabase } from '../lib/supabase';
import {
  getCurrentUser, startAsGuest, getMyProfile, setDisplayName,
  saveProgressWithEmail, sendLoginLink, signOut,
} from '../services/leaderboardService';
import { MERGE_KEY } from '../utils/storageKeys';

// Who is playing? `status` is one of:
// 'off'         Supabase not set up: the app works, online features are disabled
// 'loading'     checking who is signed in
// 'welcome'     nobody signed in: choose "Start playing" or "Log in"
// 'needs_name'  signed in but no player name yet
// 'ready'       signed in with a name
// 'error'       could not reach Supabase: app works offline
export function usePlayer() {
  const [state, setState] = useState({
    status: isConfigured ? 'loading' : 'off',
    userId: null, name: null, email: null, isGuest: false, error: null,
  });

  // Reads the latest sign-in + profile from Supabase and updates `state`
  const load = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        setState({ status: 'welcome', userId: null, name: null, email: null, isGuest: false, error: null });
        return;
      }
      const profile = await getMyProfile(user.id);
      setState({
        status: profile ? 'ready' : 'needs_name',
        userId: user.id,
        name: profile?.display_name ?? null,
        email: user.email || null,
        isGuest: Boolean(user.is_anonymous),
        error: null,
      });
    } catch (e) {
      setState((s) => ({ ...s, status: 'error', error: e.message }));
    }
  }, []);

  useEffect(() => {
    if (!isConfigured) return;
    load();
    // Re-check when someone signs in/out, or confirms their email link (even in another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (['SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED'].includes(event)) setTimeout(load, 0);
    });
    // Re-check when coming back to this tab (for example after confirming the email on a phone)
    window.addEventListener('focus', load);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('focus', load);
    };
  }, [load]);

  const startGuest = async () => { await startAsGuest(); await load(); };

  const chooseName = async (name) => {
    await setDisplayName(name); // throws a friendly error if the name is taken
    await load();
  };

  // Guest keeps the SAME account and just adds an email to it
  const saveWithEmail = (email) => saveProgressWithEmail(email);

  // Log in to an account. If we are a guest right now, remember who, so this device's
  // progress can be merged into the account we log in to (see useProgress).
  const logInWithEmail = async (email) => {
    if (state.userId && state.isGuest) localStorage.setItem(MERGE_KEY, state.userId);
    await sendLoginLink(email);
  };

  const logOut = async () => { await signOut(); await load(); };

  return { ...state, refresh: load, startGuest, chooseName, saveWithEmail, logInWithEmail, logOut };
}
