import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getPublicPageData } from '@/lib/data';

export async function GET() {
  const supabaseClient = createSupabaseServerClient();

  if (!supabaseClient) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Supabase is not configured for this environment.'
      },
      { status: 503 }
    );
  }

  try {
    const data = await getPublicPageData();

    return NextResponse.json({
      ok: true,
      data
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load matches data.';

    return NextResponse.json(
      {
        ok: false,
        message
      },
      { status: 500 }
    );
  }
}
