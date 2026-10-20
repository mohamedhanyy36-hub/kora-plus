import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg font-black text-slate-950">K</div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Football</p>
            <p className="text-xl font-black text-white">Kora Plus</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          <Link href="/">الرئيسية</Link>
          <Link href="/">مباريات اليوم</Link>
          <Link href="/">النتائج</Link>
          <Link href="/">الترتيب</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">تاريخ</button>
          <Link href="/admin/login" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950">لوحة الإدارة</Link>
        </div>
      </div>
    </header>
  );
}
