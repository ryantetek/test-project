# Reminder App (Supabase + Vercel + GitHub demo)

A tiny reminders list: Vite + plain JavaScript in the browser, data stored in Supabase (Postgres).

```
Browser (Vercel-hosted static site) ──supabase-js──▶ Supabase Postgres
        ▲
GitHub repo ──push──▶ Vercel auto-builds & deploys
```

## 1. Supabase (database)
1. Create a free project at https://supabase.com/dashboard.
2. SQL Editor → New query → paste `supabase/schema.sql` → Run.
3. Project Settings → API: copy the **Project URL** and **anon public** key.

## 2. Run locally
```
copy .env.example .env.local   # then paste your URL + anon key
npm install
npm run dev                    # open http://localhost:5173
```

## 3. GitHub (source control)
1. Create an empty repo at https://github.com/new (no README).
2. ```
   git remote add origin https://github.com/<you>/reminder-app.git
   git push -u origin main
   ```

## 4. Vercel (hosting)
1. https://vercel.com/new → Import the GitHub repo (framework auto-detected as Vite).
2. Add Environment Variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Deploy. Every later `git push` to `main` redeploys automatically; pushes to other branches get preview URLs.

## Security note
The demo RLS policy lets anyone with the anon key read/write all reminders. For a real app, add Supabase Auth, a `user_id` column, and policies like `using (auth.uid() = user_id)`.
