# KOSHAI - Database Setup Instructions

The database schema has been generated in `lib/database.sql`. To apply it to your Supabase project:

## Option 1: Supabase Dashboard (Easiest)
1. Go to https://app.supabase.com/project/aberwfndpukmdbtmirk/sql/new
2. Copy the entire content from `lib/database.sql`
3. Click "Run" or press Ctrl+Enter
4. Wait for all statements to complete

## Option 2: Command Line (psql)
```bash
psql postgresql://postgres:[PASSWORD]@uttkxgxnshjnqvdalbqz.supabase.co:5432/postgres < lib/database.sql
```

## What's Included
- ✅ User profiles with admin flags
- ✅ Animal listings with free tier tracking
- ✅ Butcher services with number reveal feature
- ✅ Qurbani sharing system (5-person hardcoded)
- ✅ Real-time chat tables
- ✅ Transaction/fee tracking
- ✅ Row-level security (RLS) policies
- ✅ Automatic counter triggers
- ✅ Performance indexes

## Environment Variables
Make sure these are set in your Vercel project:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for migrations, optional)
