-- Run once in the resumed project's Supabase SQL Editor.
-- This table contains only a harmless public heartbeat row.
begin;

create table if not exists public.portfolio_heartbeat (
  id integer primary key check (id = 1)
);

insert into public.portfolio_heartbeat (id)
values (1)
on conflict (id) do nothing;

alter table public.portfolio_heartbeat enable row level security;

revoke all on table public.portfolio_heartbeat from public, anon, authenticated;
grant usage on schema public to anon;
grant select on table public.portfolio_heartbeat to anon;

drop policy if exists portfolio_heartbeat_read on public.portfolio_heartbeat;
create policy portfolio_heartbeat_read
  on public.portfolio_heartbeat
  for select
  to anon
  using (id = 1);

commit;
