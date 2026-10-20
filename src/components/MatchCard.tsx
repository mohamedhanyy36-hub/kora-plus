import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { getMatchBySlug } from '@/lib/data';

export default async function MatchDetailPage({ params }: { params: { slug: string } }) {
  const match = await getMatchBySlug(params.slug);

  if (!match) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-card">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-5">
            <div>
              <p className="text-sm text-emerald-300">{match.league_id || 'الدوري'}</p>
              <h1 className="mt-2 text-3xl font-black text-white">{match.slug}</h1>
            </div>
            <div className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">
              {match.status}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">الملعب</p>
              <p className="mt-2 text-lg font-bold text-white">{match.stadium || 'غير محدد'}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">الموسم</p>
              <p className="mt-2 text-lg font-bold text-white">{match.season || 'غير محدد'}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">النتيجة</p>
              <p className="mt-2 text-lg font-bold text-white">{match.home_score} - {match.away_score}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
            <h2 className="mb-3 text-xl font-bold text-white">ملخص المباراة</h2>
            <p className="text-slate-300">{match.summary || 'لا يوجد ملخص متاح حتى الآن.'}</p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Link href="/" className="rounded-full bg-emerald-500 px-5 py-2 font-semibold text-slate-950 transition hover:bg-emerald-400">العودة للرئيسية</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
