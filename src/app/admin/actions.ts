'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdminSession } from '@/lib/admin';

export async function signOutAdmin() {
  const supabase = createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect('/admin/login');
}

export async function signInAdmin(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect('/admin/login?error=invalid');
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    redirect('/admin/login?error=missing-config');
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect('/admin/login?error=invalid');
  }

  redirect('/admin');
}

export async function createMatch(formData: FormData) {
  const { supabase } = await requireAdminSession();

  const payload = {
    slug: String(formData.get('slug') ?? '').trim() || `match-${Date.now()}`,
    league_id: String(formData.get('league_id') ?? ''),
    home_team_id: String(formData.get('home_team_id') ?? ''),
    away_team_id: String(formData.get('away_team_id') ?? ''),
    kickoff_at: String(formData.get('kickoff_at') ?? ''),
    status: String(formData.get('status') ?? 'upcoming'),
    home_score: Number(formData.get('home_score') ?? 0),
    away_score: Number(formData.get('away_score') ?? 0),
    stadium: String(formData.get('stadium') ?? ''),
    season: String(formData.get('season') ?? '2025/2026'),
    summary: String(formData.get('summary') ?? '')
  };

  if (!payload.league_id || !payload.home_team_id || !payload.away_team_id || !payload.kickoff_at) {
    redirect('/admin?error=missing-fields');
  }

  const { error } = await supabase.from('matches').insert([payload]);

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateMatch(matchId: string, formData: FormData) {
  const { supabase } = await requireAdminSession();

  const payload = {
    league_id: String(formData.get('league_id') ?? ''),
    home_team_id: String(formData.get('home_team_id') ?? ''),
    away_team_id: String(formData.get('away_team_id') ?? ''),
    kickoff_at: String(formData.get('kickoff_at') ?? ''),
    status: String(formData.get('status') ?? 'upcoming'),
    home_score: Number(formData.get('home_score') ?? 0),
    away_score: Number(formData.get('away_score') ?? 0),
    stadium: String(formData.get('stadium') ?? ''),
    season: String(formData.get('season') ?? '2025/2026'),
    summary: String(formData.get('summary') ?? '')
  };

  const { error } = await supabase.from('matches').update(payload).eq('id', matchId);

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteMatch(matchId: string) {
  const { supabase } = await requireAdminSession();

  const { error } = await supabase.from('matches').delete().eq('id', matchId);

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/admin');
  redirect('/admin');
}
