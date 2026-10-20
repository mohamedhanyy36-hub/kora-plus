import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const isConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET() {
  if (!isConfigured) {
    return NextResponse.json({ ok: false, message: 'Supabase is not configured yet.' });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.from('matches').select('*').limit(10);

  if (error) {
    return NextResponse.json({ ok: false, message: error.message });
  }

  return NextResponse.json({ ok: true, data });
}
