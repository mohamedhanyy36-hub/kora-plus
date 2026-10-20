export function LeagueTable({ standings }: { standings: any[] }) {
  return (
    <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">ترتيب الفرق</h2>
      </div>

      {standings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center text-slate-400">لا توجد بيانات ترتيب بعد.</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-right text-slate-400">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">الفريق</th>
                <th className="px-4 py-3">لعب</th>
                <th className="px-4 py-3">فوز</th>
                <th className="px-4 py-3">نقاط</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => (
                <tr key={team.id} className="border-t border-slate-800 bg-slate-900/60">
                  <td className="px-4 py-3 font-bold text-white">{team.position}</td>
                  <td className="px-4 py-3 font-semibold text-white">{team.team_id || '—'}</td>
                  <td className="px-4 py-3">{team.played}</td>
                  <td className="px-4 py-3">{team.won}</td>
                  <td className="px-4 py-3 font-bold text-emerald-300">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
