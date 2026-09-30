import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://bsgdedmxjjlcicyrutav.supabase.co';
const defaultKey = 'sb_publishable_QMdolqzPDweHXYLKtKAWGg_2eOJQ3y8';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || defaultKey;

if (!import.meta.env.VITE_SUPABASE_URL) {
  console.info('[Sakhi Cycle] Using configured default Supabase URL & Key.');
}

/**
 * Single Centralized Supabase Client for Sakhi Cycle Application
 */
export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'sakhi_cycle_auth_token'
    }
  }
);

