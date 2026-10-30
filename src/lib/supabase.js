import { createClient } from '@supabase/supabase-js';

// Reads the two values from your .env file. If they are missing, the app still works,
// just without the leaderboard.
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isConfigured = Boolean(url && key);
export const supabase = isConfigured ? createClient(url, key) : null;
