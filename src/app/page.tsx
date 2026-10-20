import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { signOutAdmin, createMatch, updateMatch, deleteMatch } from '@/app/admin/actions';
import { getStatusLabel, safeDate } from '@/lib/admin';

async function getAdminPageData() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    redirect('/admin/login?error=missing-config');
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const { data: adminRow } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', session.user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (!adminRow) {
    redirect('/admin/login?error=forbidden');
  }

  const [leaguesRes, teamsRes, matchesRes, standingsRes] = await Promise.all([
    supabase.from('leagues').select('*').order('name', { ascending: true }),
    supabase.from('teams').select('*').order('name', { ascending: true }),
    supabase.from('matches').select('*').order('kickoff_at', { ascending: true }),
    supabase.from('standings').select('*').order('position', { ascending: true })
  ]);

  if (leaguesRes.error || teamsRes.error || matchesRes.error || standingsRes.error) {
    throw new Error('Unable to load admin data');
  }

  return {
    leagues: leaguesRes.data ?? [],
    teams: teamsRes.data ?? [],
    matches: matchesRes.data ?? [],
    standings: standingsRes.data ?? []
  };
}

export default async function AdminPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const data = await getAdminPageData();
  const error = searchParams?.error;

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900 p-5">
          <div>
            <p className="text-sm text-emerald-300">لوحة الإدارة</p>
            <h1 className="text-3xl font-black text-white">Kora Plus Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">الموقع العام</Link>
            <form action={signOutAdmin}>
              <button className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950" type="submit">تسجيل الخروج</button>
            </form>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            {decodeURIComponent(error)}
          </div>
        )}

        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><p className="text-sm text-slate-400">المباريات</p><p className="mt-2 text-3xl font-black text-white">{data.matches.length}</p></div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><p className="text-sm text-slate-400">الدوريات</p><p className="mt-2 text-3xl font-black text-white">{data.leagues.length}</p></div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><p className="text-sm text-slate-400">الفرق</p><p className="mt-2 text-3xl font-black text-white">{data.teams.length}</p></div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><p className="text-sm text-slate-400">الترتيب</p><p className="mt-2 text-3xl font-black text-white">{data.standings.length}</p></div>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-5">
          <h2 className="mb-4 text-xl font-black text-white">إضافة مباراة جديدة</h2>
          <form action={createMatch} className="grid gap-4 md:grid-cols-2">
            <input name="slug" placeholder="slug" className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <select name="league_id" className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white">
              <option value="">اختر البطولة</option>
              {data.leagues.map((league) => (
                <option key={league.id} value={league.id}>{league.name}</option>
              ))}
            </select>
            <select name="home_team_id" className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white">
              <option value="">الفريق المضيف</option>
              {data.teams.map((team) => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <select name="away_team_id" className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white">
              <option value="">الفريق الضيف</option>
              {data.teams.map((team) => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <input type="datetime-local" name="kickoff_at" className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <select name="status" className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white">
              <option value="upcoming">قادم</option>
              <option value="live">مباشر</option>
              <option value="finished">منتهي</option>
            </select>
            <input type="number" name="home_score" defaultValue={0} className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input type="number" name="away_score" defaultValue={0} className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input name="stadium" placeholder="الملعب" className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white md:col-span-2" />
            <input name="season" placeholder="الموسم" defaultValue="2025/2026" className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white md:col-span-2" />
            <textarea name="summary" placeholder="ملخص المباراة" rows={3} className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white md:col-span-2" />
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="rounded-full bg-emerald-500 px-5 py-3 font-bold text-slate-950">حفظ المباراة</button>
            </div>
          </form>
        </div>

        <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5">
          <h2 className="mb-4 text-xl font-black text-white">إدارة المباريات</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="px-3 py-2 text-right">المباراة</th>
                  <th className="px-3 py-2 text-right">الحالة</th>
                  <th className="px-3 py-2 text-right">التاريخ</th>
                  <th className="px-3 py-2 text-right">النتيجة</th>
                  <th className="px-3 py-2 text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {data.matches.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-slate-400">لا توجد مباريات حاليا.</td>
                  </tr>
                ) : data.matches.map((match) => (
                  <tr key={match.id} className="border-t border-slate-800">
                    <td className="px-3 py-3">
                      <div className="font-semibold text-white">{match.slug}</div>
                      <div className="text-xs text-slate-400">{match.stadium}</div>
                    </td>
                    <td className="px-3 py-3">{getStatusLabel(match.status)}</td>
                    <td className="px-3 py-3">{safeDate(match.kickoff_at)}</td>
                    <td className="px-3 py-3">{match.home_score} - {match.away_score}</td>
                    <td className="px-3 py-3">
                      <form action={async () => {
                        'use server';
                        await deleteMatch(match.id);
                      }}>
                        <button type="submit" className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white">حذف</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
