# Kora Plus

Kora Plus is a football media website and admin dashboard built with Next.js and Supabase. The public site is Arabic RTL and the admin portal is protected behind secure server-side checks.

## Features

- Public homepage with live/finished/upcoming fixtures
- Match details, standings, leagues, club profiles, and match filters
- Admin dashboard at `/admin` with protected access
- Shared Supabase database for both frontend and admin
- Row Level Security policies and secure server actions
- Deployment-ready configuration with environment variables

## Tech stack

- Next.js 14 App Router
- Tailwind CSS
- Supabase Postgres + Auth + RLS

## Getting started

1. Copy `.env.example` to `.env.local`
2. Add your Supabase project values
3. Run `npm install`
4. Run `npm run dev`
5. Visit `http://localhost:3000`

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Database setup

1. Open Supabase SQL editor
2. Run the SQL from `supabase/schema.sql`
3. Confirm the admin user is created or create it in Supabase Auth
4. Add a row in the `settings` table if needed

## Admin access

- Public site: `/`
- Admin login: `/admin/login`
- Protected dashboard: `/admin`

## Deployment

- Deploy the Next.js app to Vercel
- Add the same environment variables in project settings
- Set the Supabase URL and keys from the project dashboard

## Notes

- Without Supabase environment variables, the app uses local demo fixture data so it can still render during local development.
- Real live score updates require the configured Supabase database and an API connector that polls a provider or a scheduled sync worker.
