import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15),transparent_20%),linear-gradient(180deg,#020817,#081a17)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-card backdrop-blur">
        <p className="text-sm text-emerald-300">Kora Plus</p>
        <h1 className="mt-2 text-3xl font-black text-white">تسجيل دخول الإدارة</h1>

        <form action={async (formData: FormData) => {
          'use server';

          const email = String(formData.get('email') ?? '');
          const password = String(formData.get('password') ?? '');
          const cookieStore = cookies();
          const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
              cookies: {
                get(name: string) {
                  return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: Record<string, unknown>) {
                  cookieStore.set({ name, value, ...options });
                },
                remove(name: string, options: Record<string, unknown>) {
                  cookieStore.set({ name, value: '', ...options });
                }
              }
            }
          );

          const { error } = await supabase.auth.signInWithPassword({ email, password });

          if (error) {
            redirect('/admin/login?error=invalid-credentials');
          }

          redirect('/admin');
        }} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">البريد الإلكتروني</label>
            <input name="email" type="email" required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400" placeholder="admin@koraplus.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">كلمة المرور</label>
            <input name="password" type="password" required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-2xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-400">تسجيل الدخول</button>
        </form>
        <div className="mt-4 text-center text-sm text-slate-400">
          <a href="/" className="text-emerald-300">عودة إلى الموقع</a>
        </div>
      </div>
    </main>
  );
}
