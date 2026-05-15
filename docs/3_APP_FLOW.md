# App Flow - KOSHAI v0.2

## 1. Onboarding & Auth
1. **Splash Screen:** Premium "কষাই" logo (SVG) + Slogan + Quick description.
2. **Auth Screen:** Clerk Email Login/Signup.
3. **Role Selection:** New users choose between Buyer, Seller, or Butcher (can be changed later in Settings).
4. **Home Screen:** The central hub of the application.

## 2. Navigation Structure (5-Tab Bottom Nav)
- **Home:** Overview, Countdown, Quick Actions, Stats, and Featured Listings.
- **Haat:** Animal marketplace with filtering and search.
- **Koshai:** Butcher and Cleaner services list.
- **Share:** Group Qurbani management.
- **Profile:** User settings, role management, and history.

## 3. Key Feature Flows

### 3.1 Creating an Animal Listing
1. **Step 1-6:** Details (Type, Weight, Photos, Location).
2. **Step 7 (Price):** Input price → Real-time fee calculation appears.
3. **Free Check:** If total listings < 1000, skip payment. Else, redirect to bKash.
4. **Completion:** Confetti effect + Redirect to listing detail.

### 3.2 Butcher Booking
1. **Search:** Filter butchers by location/rating.
2. **Detail:** View slots and "Number Reveal" button.
3. **Booking:** Select slot → Instant confirmation.

### 3.3 Admin Verification (Hidden)
1. **Access:** Admins log in with specific emails.
2. **Toggle:** "Pending" packages appear in a special dashboard view.
3. **Action:** Admin calls firm → Clicks "Approve" → Listing goes live.

### 3.4 Chat
1. **Entry:** Icon at top-right or button on listing.
2. **Interface:** Text input + Microphone icon for voice notes.
3. **Storage:** Audio files uploaded to Supabase Storage.
