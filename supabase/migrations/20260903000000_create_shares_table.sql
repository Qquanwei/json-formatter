create table if not exists public.shares (
  id text primary key,
  data text not null,
  created_at timestamptz not null default now()
);

alter table public.shares enable row level security;
