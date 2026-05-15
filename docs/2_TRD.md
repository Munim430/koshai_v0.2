# Technical Requirements Document (TRD) - KOSHAI v0.2

## 1. Tech Stack
- **Frontend:** React + Vite (PWA optimized).
- **Styling:** Tailwind CSS + Custom CSS for premium UI components.
- **Backend/Database:** Supabase (PostgreSQL).
- **Authentication:** Clerk (Email-only).
- **Hosting/Deployment:** Vercel.
- **Monitoring:** Sentry (Error Tracking) & PostHog (Analytics) - Boilerplate setup.

## 2. Infrastructure Setup

### 2.1 Supabase Configuration
- **Database:** PostgreSQL for relational data.
- **Storage:** Buckets for Voice Notes and Listing Images.
- **Real-time:** Enabled for Chat and Listing updates.

### 2.2 Clerk Configuration
- **Mode:** Production-ready Email Auth.
- **Sync:** Webhooks to sync Clerk users with Supabase `profiles` table.

## 3. Data Models (Relational)
- **Profiles:** `id`, `email`, `role`, `is_admin`, `created_at`.
- **Listings (Animals):** `id`, `seller_id`, `type`, `price`, `status`, `is_free`, `images`.
- **Butchers:** `id`, `user_id`, `experience`, `slots`, `status`.
- **Chat:** `id`, `sender_id`, `receiver_id`, `content_type` (text/voice), `content_url`.

## 4. Performance & PWA
- **Service Worker:** Custom implementation for offline support and caching.
- **Image Optimization:** Browser-side compression before upload (max 800KB).
- **Voice Notes:** Compressed audio format (e.g., .mp3 or .opus) to minimize storage usage.

## 5. Security Policies (Row Level Security)
- **Read:** Public for active listings; Authenticated for chats/profiles.
- **Write:** Owner-only for listings; Admin-only for status overrides.
- **Admin:** Email-based check for `munimm247@gmail.com` and `munimhasibul10@gmail.com`.

## 6. Integration Points
- **bKash API:** Implementation logic for payments after free limits (1000 animals / 100 butchers).
- **Sentry/PostHog:** Integration hooks in `main.jsx` and `App.jsx`.
