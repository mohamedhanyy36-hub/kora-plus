import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function requireAdminSession() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    redirect('/admin/login?error=missing-config');
  }

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const { data: adminRow, error: adminError } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', session.user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (adminError || !adminRow) {
    redirect('/admin/login?error=forbidden');
  }

  return { supabase, session };
}
