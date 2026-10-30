-- Run this ONCE in Supabase: SQL Editor > New query > paste > Run.

-- 1. Players (public nickname only, no real names or emails here)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 20),
  created_at timestamptz not null default now()
);
create unique index if not exists profiles_display_name_key
  on public.profiles (lower(display_name));

-- 2. Best result per player per lesson
create table if not exists public.lesson_results (
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) <= 10),
  xp int not null check (xp between 0 and 200),
  accuracy int not null check (accuracy between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- 3. Row Level Security: the browser can READ profiles, but cannot write to any table directly.
alter table public.profiles enable row level security;
alter table public.lesson_results enable row level security;

drop policy if exists "profiles readable by everyone" on public.profiles;
create policy "profiles readable by everyone" on public.profiles for select using (true);

drop policy if exists "players read own results" on public.lesson_results;
create policy "players read own results" on public.lesson_results for select using (auth.uid() = user_id);

-- 4. The only ways to write: these two functions (they check who you are and validate the input)
create or replace function public.set_display_name(p_name text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  insert into public.profiles (id, display_name) values (auth.uid(), trim(p_name))
  on conflict (id) do update set display_name = excluded.display_name;
end; $$;

create or replace function public.submit_result(p_lesson_id text, p_xp int, p_accuracy int)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  insert into public.lesson_results (user_id, lesson_id, xp, accuracy)
  values (auth.uid(), p_lesson_id, p_xp, p_accuracy)
  on conflict (user_id, lesson_id) do update
    set xp = greatest(public.lesson_results.xp, excluded.xp),
        accuracy = greatest(public.lesson_results.accuracy, excluded.accuracy),
        updated_at = now();
end; $$;

revoke execute on function public.set_display_name(text) from public, anon;
revoke execute on function public.submit_result(text, int, int) from public, anon;
grant execute on function public.set_display_name(text) to authenticated;
grant execute on function public.submit_result(text, int, int) to authenticated;

-- 5. The leaderboard: total XP per player, with ranking (ties share a position)
create or replace view public.leaderboard as
select
  p.id as user_id,
  p.display_name,
  coalesce(sum(r.xp), 0)::int as total_xp,
  count(r.lesson_id)::int as lessons_done,
  rank() over (order by coalesce(sum(r.xp), 0) desc) as position
from public.profiles p
left join public.lesson_results r on r.user_id = p.id
group by p.id, p.display_name;

grant select on public.leaderboard to anon, authenticated;
