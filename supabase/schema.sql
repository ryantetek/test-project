-- Run this once in Supabase dashboard -> SQL Editor -> New query

create table if not exists public.reminders (
  id         bigint generated always as identity primary key,
  title      text not null,
  due_at     timestamptz,
  done       boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security: Supabase blocks all access from the browser
-- unless a policy allows it.
alter table public.reminders enable row level security;

-- DEMO ONLY: lets anyone with the public anon key read/write all rows.
-- A real app would add Supabase Auth and restrict rows to their owner.
create policy "demo public access" on public.reminders
  for all to anon using (true) with check (true);
