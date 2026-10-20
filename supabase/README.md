create extension if not exists "uuid-ossp";

create table if not exists public.leagues (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  country text,
  logo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  short_name text,
  country text,
  logo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.matches (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  league_id uuid references public.leagues(id) on delete set null,
  home_team_id uuid references public.teams(id) on delete set null,
  away_team_id uuid references public.teams(id) on delete set null,
  kickoff_at timestamptz not null,
  status text not null default 'upcoming' check (status in ('upcoming', 'live', 'finished')),
  home_score integer default 0,
  away_score integer default 0,
  stadium text,
  season text,
  summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.standings (
  id uuid primary key default uuid_generate_v4(),
  league_id uuid references public.leagues(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  position integer,
  played integer default 0,
  won integer default 0,
  drawn integer default 0,
  lost integer default 0,
  goals_for integer default 0,
  goals_against integer default 0,
  points integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.leagues enable row level security;
alter table public.teams enable row level security;
alter table public.matches enable row level security;
alter table public.standings enable row level security;
alter table public.settings enable row level security;

create policy "Public can read matches and rankings" on public.matches for select using (true);
create policy "Public can read leagues" on public.leagues for select using (true);
create policy "Public can read teams" on public.teams for select using (true);
create policy "Public can read standings" on public.standings for select using (true);
create policy "Public can read settings" on public.settings for select using (true);

create policy "Admins can manage matches" on public.matches for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can manage leagues" on public.leagues for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can manage teams" on public.teams for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can manage standings" on public.standings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can manage settings" on public.settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_for_leagues before update on public.leagues for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_for_teams before update on public.teams for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_for_matches before update on public.matches for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_for_standings before update on public.standings for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_for_settings before update on public.settings for each row execute procedure public.handle_updated_at();

-- Example rows for quick start
insert into public.leagues (name, country, logo_url)
values ('دوري روشن', 'السعودية', ''),
       ('الدوري الإنجليزي', 'إنجلترا', ''),
       ('الدوري الإسباني', 'إسبانيا', '')
on conflict do nothing;

insert into public.teams (name, short_name, country, logo_url)
values ('الأهلي', 'AHL', 'السعودية', ''),
       ('النصر', 'NAS', 'السعودية', ''),
       ('الهلال', 'HIL', 'السعودية', ''),
       ('الاتحاد', 'ITS', 'السعودية', '')
on conflict do nothing;

insert into public.matches (slug, league_id, home_team_id, away_team_id, kickoff_at, status, home_score, away_score, stadium, season, summary)
select l.id, t1.id, t2.id, now() + interval '3 hours', 'live', 2, 1, 'ملعب الملك فهد', '2025/2026', 'مباراة قوية ومتصلة في الشوط الثاني'
from public.leagues l, public.teams t1, public.teams t2
where l.name = 'دوري روشن' and t1.name='الأهلي' and t2.name='النصر'
on conflict (slug) do nothing;

insert into public.standings (league_id, team_id, position, played, won, drawn, lost, goals_for, goals_against, points)
select l.id, t.id, 1, 10, 8, 0, 2, 22, 9, 24
from public.leagues l, public.teams t
where l.name='دوري روشن' and t.name='الأهلي'
on conflict do nothing;
