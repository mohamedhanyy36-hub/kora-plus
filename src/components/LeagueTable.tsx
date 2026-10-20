import Link from 'next/link';

export function MatchCard({ match, compact = false }: { match: any; compact?: boolean }) {
  const statusLabel = {
    upcoming: 'قادم',
    live: 'مباشر',
    finished: 'انتهت'
  }[match.status] ?? 'غير محدد';

  const accent = match.status === 'live' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-700 bg-slate-950/60';

  return (
    <Link href={`/matches/${match.slug}`} className={`block rounded-3xl border p-4 transition hover:border-emerald-400/60 ${accent}`}>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{match.league_id || 'الدوري'}</span>
        <span>{statusLabel}</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">{match.home_score ?? '—'}</span>
          <span className="font-bold text-white">{match.slug}</span>
        </div>

        <div className="text-center text-lg font-black text-white">
          {compact ? `${match.home_score ?? 0} : ${match.away_score ?? 0}` : `${match.home_score ?? 0} : ${match.away_score ?? 0}`}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-bold text-white">{match.slug}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">{match.away_score ?? '—'}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{new Date(match.kickoff_at).toLocaleDateString('ar-SA')}</span>
        <span>{new Date(match.kickoff_at).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </Link>
  );
}
