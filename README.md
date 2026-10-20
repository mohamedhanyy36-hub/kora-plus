# Kora Plus

Kora Plus is a football-only website and admin dashboard built with Next.js 14 and Supabase. The public site is Arabic RTL and the admin system is protected with server-side checks and database policies.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase Postgres + Auth + RLS

## Project structure

- Public site: `/`
- Match detail page: `/matches/[slug]`
- Admin login: `/admin/login`
- Admin dashboard: `/admin`
- SQL schema: `supabase/schema.sql`
- Example env template: `.env.example`

## Local setup

1. Copy the environment template:

```bash
cp .env.example .env.local
```

2. Fill in the real values from your Supabase project:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Important:
- Keep `SUPABASE_SERVICE_ROLE_KEY` on the server only.
- Never commit secrets to GitHub.
- Do not expose the service role key in the browser or logs.

3. Install dependencies:

```bash
npm install
```

4. Start the app in development mode:

```bash
npm run dev
```

Open:
- http://localhost:3000
- http://localhost:3000/admin/login

## Supabase setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run the SQL from `supabase/schema.sql`.
4. Create a real admin user under Authentication → Users.
5. Add the user to `public.admin_users` table with `is_active = true`.
6. Confirm RLS policies are active.

Example SQL for an admin user:

```sql
insert into public.admin_users (user_id, is_active, role)
values ('<auth-user-id>', true, 'admin');
```

## Security requirements

- Admin pages are protected on the server.
- Every admin action verifies the user session and an active admin record.
- Public pages only read shared data.
- Database writes are restricted by RLS and only allowed to valid admins.

## Deployment

- Deploy the app to Vercel or any compatible Node hosting platform.
- Set the same environment variables in the deployment environment.
- Keep all secret keys outside the client bundle and source control.

## Notes

- The project intentionally avoids fake match data being displayed as if it were live results.
- If Supabase is not configured, the UI renders empty states instead of fabricated data.
- Real fixtures and standings come from the configured Supabase tables.
