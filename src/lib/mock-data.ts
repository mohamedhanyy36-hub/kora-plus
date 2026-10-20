import { mockMatches, mockStandings, mockLeagues } from './mock-data';

const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getHomePageData() {
  if (!isSupabaseConfigured) {
    return {
      matches: mockMatches,
      standings: mockStandings,
      leagues: mockLeagues
    };
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [{ data: matches }, { data: standings }, { data: leagues }] = await Promise.all([
    supabase.from('matches').select('*').order('kickoff_at', { ascending: true }).limit(12),
    supabase.from('standings').select('*').order('position', { ascending: true }).limit(20),
    supabase.from('leagues').select('*').limit(10)
  ]);

  return {
    matches: matches ?? mockMatches,
    standings: standings ?? mockStandings,
    leagues: leagues ?? mockLeagues
  };
}

export async function getMatchBySlug(slug: string) {
  if (!isSupabaseConfigured) {
    return mockMatches.find((match) => match.slug === slug) ?? null;
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase.from('matches').select('*').eq('slug', slug).single();
  return data ?? null;
}
