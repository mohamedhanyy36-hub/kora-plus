import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getPublicPageData() {
  const client = createSupabaseServerClient();

  if (!client) {
    return {
      leagues: [],
      matches: [],
      standings: []
    };
  }

  const [leaguesRes, matchesRes, standingsRes] = await Promise.all([
    client.from('leagues').select('*').order('name', { ascending: true }),
    client.from('matches').select('*').order('kickoff_at', { ascending: true }),
    client.from('standings').select('*').order('position', { ascending: true })
  ]);

  if (leaguesRes.error) {
    throw new Error(leaguesRes.error.message);
  }

  if (matchesRes.error) {
    throw new Error(matchesRes.error.message);
  }

  if (standingsRes.error) {
    throw new Error(standingsRes.error.message);
  }

  return {
    leagues: leaguesRes.data ?? [],
    matches: matchesRes.data ?? [],
    standings: standingsRes.data ?? []
  };
}

export async function getMatchBySlug(slug: string) {
  const client = createSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from('matches')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
