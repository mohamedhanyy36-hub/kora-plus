-- Kora Plus database schema for Supabase
create extension if not exists "uuid-ossp";

create table if not exists public.leagues (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  country text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  short_name text,
  country text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  league_id uuid not null references public.leagues(id) on delete restrict,
  home_team_id uuid not null references public.teams(id) on delete restrict,
  away_team_id uuid not null references public.teams(id) on delete restrict,
  kickoff_at timestamptz not null,
  status text not null default 'upcoming' check (status in ('upcoming', 'live', 'finished')),
  home_score integer not null default 0,
  away_score integer not null default 0,
  stadium text,
  season text,
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_fixture_teams check (home_team_id <> away_team_id)
);

create table if not exists public.standings (
  id uuid primary key default uuid_generate_v4(),
  league_id uuid not null references public.leagues(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  position integer not null default 1,
  played integer not null default 0,
  won integer not null default 0,
  drawn integer not null default 0,
  lost integer not null default 0,
  goals_for integer not null default 0,
  goals_against integer not null default 0,
  points integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (league_id, team_id)
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  is_active boolean not null default true,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_matches_league_kickoff
  on public.matches (league_id, kickoff_at);
create index if not exists idx_matches_status
  on public.matches (status);
create index if not exists idx_standings_league_position
  on public.standings (league_id, position);
create index if not exists idx_admin_users_active
  on public.admin_users (is_active);

alter table public.leagues enable row level security;
alter table public.teams enable row level security;
alter table public.matches enable row level security;
alter table public.standings enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_catalog
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
      and au.is_active = true
  );
$$;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at_leagues
before update on public.leagues
for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_teams
before update on public.teams
for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_matches
before update on public.matches
for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_standings
before update on public.standings
for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_admin_users
before update on public.admin_users
for each row execute procedure public.handle_updated_at();

create policy "Public view leagues"
on public.leagues for select using (true);
create policy "Public view teams"
on public.teams for select using (true);
create policy "Public view matches"
on public.matches for select using (true);
create policy "Public view standings"
on public.standings for select using (true);

create policy "Admins can manage leagues"
on public.leagues for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Admins can manage teams"
on public.teams for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Admins can manage matches"
on public.matches for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Admins can manage standings"
on public.standings for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Admins can manage admin_users"
on public.admin_users for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- Example seed data. This is intentionally minimal and safe for initial setup.
insert into public.leagues (name, country, logo_url)
values ('دوري روشن', 'السعودية', ''),
       ('الدوري الإنجليزي', 'إنجلترا', ''),
       ('الدوري الإسباني', 'إسبانيا', '')
on conflict do nothing;

insert into public.teams (name, short_name, country, logo_url)
values ('الأهلي', 'AHL', 'السعودية', ''),
       ('النصر', 'NAS', 'السعودية', ''),
       ('الهلال', 'HIL', 'السعودية', ''),
       ('الاتحاد', 'ITS', 'السعودية', ''),
       ('تشيلسي', 'CHE', 'إنجلترا', ''),
       ('ليفربول', 'LIV', 'إنجلترا', '')
on conflict do nothing;

-- Matches are created only when you intentionally insert them in the dashboard.
-- No mock score data is committed here.
