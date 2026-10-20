import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-center">
      <div>
        <p className="text-sm text-emerald-300">Kora Plus</p>
        <h1 className="mt-3 text-5xl font-black text-white">404</h1>
        <p className="mt-4 text-slate-400">الصفحة التي تبحث عنها غير موجودة.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-emerald-500 px-5 py-3 font-bold text-slate-950">العودة للرئيسية</Link>
      </div>
    </main>
  );
}
