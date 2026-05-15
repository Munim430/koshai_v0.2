# Implementation Plan - KOSHAI v0.2

## Phase 1: Environment & Boilerplate
1.  **Repository Setup:** Initialize Vite + React + Tailwind project.
2.  **SDK Integration:** Install `@clerk/clerk-react` and `@supabase/supabase-js`.
3.  **Environment Variables:** Configure `.env` with Clerk and Supabase keys.

## Phase 2: Core Infrastructure
1.  **Database:** Execute the SQL schema in Supabase Dashboard.
2.  **Auth Sync:** Set up a Clerk Webhook (or frontend sync logic) to populate the `profiles` table on user signup.
3.  **Storage:** Create Supabase Storage buckets for `listing-images` and `voice-notes`.

## Phase 3: UI & Feature Development
1.  **Layout:** Implement the 5-tab navigation and global App Shell.
2.  **Home Screen:** Build the countdown, stats bar, and quick actions.
3.  **Marketplace:** Develop the listing creation flow with real-time fee calculation and the 1000-free-limit check.
4.  **Butcher/Share:** Build the respective lists and detail views.
5.  **Chat:** Implement the text/voice chat interface using Supabase Realtime.

## Phase 4: Admin & Logic
1.  **Admin View:** Create the hidden verification dashboard for `is_admin` users.
2.  **Logic Fixes:** Conditional rendering for "Remove Listing" and role-switching in settings.
3.  **PWA:** Configure `vite-plugin-pwa` for the "Add to Home Screen" experience.

## Phase 5: Testing & Deployment
1.  **Audit:** Run through the checklist in the Deployment MD.
2.  **Build:** Execute `npm run build`.
3.  **Ship:** Deploy to Vercel and verify the live URL.
