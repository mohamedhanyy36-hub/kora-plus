import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function signOutAction() {
  'use server';

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

  await supabase.auth.signOut();
  redirect('/admin/login');
}

export default async function AdminPage() {
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

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login');
  }

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
            <form action={signOutAction}>
              <button className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950" type="submit">تسجيل الخروج</button>
            </form>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><p className="text-sm text-slate-400">المباريات</p><p className="mt-2 text-3xl font-black text-white">24</p></div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><p className="text-sm text-slate-400">النتائج</p><p className="mt-2 text-3xl font-black text-white">12</p></div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><p className="text-sm text-slate-400">الفرق</p><p className="mt-2 text-3xl font-black text-white">18</p></div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><p className="text-sm text-slate-400">الدوريات</p><p className="mt-2 text-3xl font-black text-white">6</p></div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <h2 className="mb-4 text-xl font-black text-white">إدارة المباريات</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• إضافة مباراة جديدة</li>
              <li>• تحديث النتيجة ومواعيد المباريات</li>
              <li>• تعديل حالة المباراة: مباشر / قادم / منتهي</li>
              <li>• ربط تفاصيل البطولة والملعب</li>
            </ul>
          </section>
          <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <h2 className="mb-4 text-xl font-black text-white">إدارة الفرق والدوريات</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• إضافة فرق جديدة</li>
              <li>• رفع الشعارات</li>
              <li>• تحديث ترتيب الفرق</li>
              <li>• إدارة إعدادات الموقع</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
