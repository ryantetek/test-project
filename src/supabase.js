import { createClient } from '@supabase/supabase-js'

// Vite exposes env vars prefixed with VITE_ to browser code.
// Locally they come from .env.local; on Vercel from Project Settings -> Environment Variables.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(url, key)
