import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const isConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  if (!isConfigured) {
    return NextResponse.json({ ok: true, source: 'demo', data: [] });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.from('matches').select('*').order('kickoff_at', { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, source: 'supabase', data });
}
