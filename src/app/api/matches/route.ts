import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Supabase is not configured for this environment.'
      },
      { status: 500 }
    );
  }

  const [leaguesRes, matchesRes, standingsRes] = await Promise.all([
    supabase.from('leagues').select('*').order('name', { ascending: true }),
    supabase.from('matches').select('*').order('kickoff_at', { ascending: true }),
    supabase.from('standings').select('*').order('position', { ascending: true })
  ]);

  if (leaguesRes.error || matchesRes.error || standingsRes.error) {
    return NextResponse.json(
      {
        ok: false,
        message: leaguesRes.error?.message ?? matchesRes.error?.message ?? standingsRes.error?.message ?? 'Failed to load matches data.'
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    data: {
      leagues: leaguesRes.data ?? [],
      matches: matchesRes.data ?? [],
      standings: standingsRes.data ?? []
    }
  });
}
