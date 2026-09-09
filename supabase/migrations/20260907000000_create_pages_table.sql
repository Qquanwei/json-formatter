create table if not exists public.pages (
  id text primary key,
  html text not null,
  created_at timestamptz not null default now()
);

alter table public.pages enable row level security;
