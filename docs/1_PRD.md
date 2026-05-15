# Product Requirements Document (PRD) - KOSHAI v0.2

## 1. Project Overview
**KOSHAI** is a production-ready marketplace application designed for the Bangladeshi market to facilitate Qurbani-related services. It connects cattle sellers, butchers, and share-based Qurbani groups.

## 2. Target Audience
- **Cattle Sellers:** Individual farmers or firms looking to sell animals.
- **Butchers:** Professional butchers offering slaughtering and processing services.
- **Buyers:** Individuals looking to buy animals or join a "Share Qurbani" group.
- **Admins:** Platform owners (munimm247@gmail.com, munimhasibul10@gmail.com).

## 3. Core Features & Requirements

### 3.1 Authentication
- **Method:** Email-only authentication via Clerk.
- **Roles:** User roles (Seller, Butcher, Buyer) can be changed within the app settings.

### 3.2 Animal Marketplace (Haat)
- **Listings:** Sellers can list animals with photos, price, weight, and health certification.
- **Pricing:** 
  - First 1000 animal listings are **FREE**.
  - Subsequent listings require bKash payment (API integration).
- **Interactions:** Bidding system and "Ask Price" (Chat) functionality.

### 3.3 Butcher Services (Koshai)
- **Listings:** Butchers can list their services and availability slots.
- **Pricing:**
  - First 100 butcher listings are **FREE**.
  - Subsequent listings require bKash payment.
- **Interactions:** Direct booking and "Number Reveal" (150 BDT fee).

### 3.4 Share Qurbani Groups
- **Toggle:** Choice between "Single" (একক) and "Share" (ভাগে) Qurbani.
- **Share Logic:** Hardcoded 5-person limit for shared packages with "Price per Share" input.

### 3.5 Chat Architecture
- **Medium:** Text and Voice messages only (No images).
- **Storage:** Voice notes stored in Supabase Storage (optimized for size).

### 3.6 Admin Controls
- **Hidden Toggle:** Accessible only to `munimm247@gmail.com` and `munimhasibul10@gmail.com`.
- **Verification Gate:** All firm packages default to "pending". Admin must manually verify and switch to "active".

## 4. Discrepancies & Fixes
- **Chat:** Moved from bottom nav to top-right icon on Home and detail screens.
- **Inventory:** Sellers can delete their own listings (conditional rendering).
- **Legal:** Static Terms & Conditions and Contact Us pages included.

## 5. Success Metrics
- Production-ready PWA with "Add to Home Screen" prompt.
- Every button and feature functional.
- Premium UI/UX matching Bangladeshi consumer psychology.
