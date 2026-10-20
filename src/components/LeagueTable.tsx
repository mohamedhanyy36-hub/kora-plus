import Link from 'next/link';

export function MatchCard({ match, compact = false }: { match: any; compact?: boolean }) {
  const accent = match.status === 'live' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-700 bg-slate-950/60';

  return (
    <Link href={`/matches/${match.slug}`} className={`block rounded-3xl border p-4 transition hover:border-emerald-400/60 ${accent}`}>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{match.league}</span>
        <span>{match.statusLabel}</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">{match.homeBadge}</span>
          <span className="font-bold text-white">{match.homeTeam}</span>
        </div>

        <div className="text-center text-lg font-black text-white">
          {compact ? `${match.homeScore ?? '?'} : ${match.awayScore ?? '?'}` : `${match.homeScore ?? 0} : ${match.awayScore ?? 0}`}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-bold text-white">{match.awayTeam}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">{match.awayBadge}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{new Date(match.kickoffAt).toLocaleDateString('ar-SA')}</span>
        <span>{new Date(match.kickoffAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </Link>
  );
}
