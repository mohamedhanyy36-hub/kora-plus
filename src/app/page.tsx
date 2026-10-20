import { MatchCard } from '@/components/MatchCard';
import { LeagueTable } from '@/components/LeagueTable';
import { Header } from '@/components/Header';
import { getHomePageData } from '@/lib/data';

export default async function HomePage() {
  const { matches, standings, leagues } = await getHomePageData();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),transparent_30%),linear-gradient(180deg,#020817,#081a17)]">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6 shadow-card backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-300">تغطية يومية</p>
            <h1 className="mt-2 text-3xl font-black text-white md:text-5xl">Kora Plus</h1>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-200 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
              <p className="text-slate-400">مباريات اليوم</p>
              <p className="mt-2 text-2xl font-bold text-white">{matches.filter((m) => m.status === 'live').length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
              <p className="text-slate-400">النتائج</p>
              <p className="mt-2 text-2xl font-bold text-white">{matches.filter((m) => m.status === 'finished').length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
              <p className="text-slate-400">القادمة</p>
              <p className="mt-2 text-2xl font-bold text-white">{matches.filter((m) => m.status === 'upcoming').length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
              <p className="text-slate-400">الدوريات</p>
              <p className="mt-2 text-2xl font-bold text-white">{leagues.length}</p>
            </div>
          </div>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">المباريات المباشرة</h2>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">Live</span>
            </div>
            <div className="space-y-4">
              {matches.filter((match) => match.status === 'live').map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-lg font-bold text-white">بطولات اليوم</h3>
              <div className="space-y-3">
                {leagues.map((league) => (
                  <div key={league.id} className="flex items-center justify-between rounded-2xl bg-slate-950/60 px-3 py-2">
                    <div>
                      <p className="font-semibold text-white">{league.name}</p>
                      <p className="text-xs text-slate-400">{league.country}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">{league.matches}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-lg font-bold text-white">الأخبار السريعة</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>• تأكيد تغييرات التشكيل قبل النهائي الأوروبي.</li>
                <li>• جدول البطولة يتم تحديثه تلقائيًا من قاعدة البيانات.</li>
                <li>• تم ربط كل مباراة بصفحة تفاصيل مستقلة.</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">المباريات القادمة</h2>
              <span className="text-sm text-slate-400">اختار التاريخ والبطولة</span>
            </div>
            <div className="space-y-4">
              {matches.filter((match) => match.status === 'upcoming').slice(0, 4).map((match) => (
                <MatchCard key={match.id} match={match} compact />
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">النتائج النهائية</h2>
              <span className="text-sm text-slate-400">آخر 24 ساعة</span>
            </div>
            <div className="space-y-4">
              {matches.filter((match) => match.status === 'finished').slice(0, 4).map((match) => (
                <MatchCard key={match.id} match={match} compact />
              ))}
            </div>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <LeagueTable standings={standings} />
          <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-5">
            <h2 className="mb-4 text-2xl font-black text-white">مواعيد المباريات</h2>
            <div className="space-y-3">
              {matches.slice(0, 5).map((match) => (
                <div key={match.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-3">
                  <div>
                    <p className="text-sm text-slate-400">{match.league}</p>
                    <p className="font-semibold text-white">{match.homeTeam} vs {match.awayTeam}</p>
                  </div>
                  <div className="text-left text-sm text-slate-300">
                    <p>{new Date(match.kickoffAt).toLocaleDateString('ar-SA')}</p>
                    <p>{new Date(match.kickoffAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
