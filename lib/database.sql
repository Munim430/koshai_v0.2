-- KOSHAI Database Schema
-- This script initializes all tables and RLS policies for the KOSHAI platform

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ANIMAL_LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.animal_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  animal_type TEXT NOT NULL, -- 'cow', 'goat', 'sheep'
  breed TEXT,
  age_months INTEGER,
  weight_kg DECIMAL(10, 2),
  health_status TEXT,
  vaccination_status BOOLEAN DEFAULT FALSE,
  price_bdt INTEGER NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'sold', 'removed'
  fee_charged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT animal_listings_listing_number CHECK (TRUE)
);

-- 3. BUTCHER_LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.butcher_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  services JSONB DEFAULT '["cutting", "delivery"]'::jsonb,
  experience_years INTEGER,
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  price_per_animal_bdt INTEGER NOT NULL,
  number_reveal_available BOOLEAN DEFAULT TRUE,
  number_reveal_cost_bdt INTEGER DEFAULT 150,
  status TEXT DEFAULT 'active',
  fee_charged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. QURBANI_LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.qurbani_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  animal_id UUID REFERENCES public.animal_listings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  total_shares INTEGER DEFAULT 5,
  available_shares INTEGER DEFAULT 5,
  price_per_share_bdt INTEGER NOT NULL,
  share_type TEXT DEFAULT 'single', -- 'single', 'shared'
  delivery_date DATE,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'open', -- 'open', 'full', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. QURBANI_SHARES TABLE
CREATE TABLE IF NOT EXISTS public.qurbani_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qurbani_id UUID NOT NULL REFERENCES public.qurbani_listings(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  share_number INTEGER NOT NULL,
  price_paid_bdt INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_qurbani_share UNIQUE(qurbani_id, share_number)
);

-- 6. CHAT_ROOMS TABLE
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT chat_room_unique_pair UNIQUE(
    CASE WHEN user1_id < user2_id THEN user1_id ELSE user2_id END,
    CASE WHEN user1_id < user2_id THEN user2_id ELSE user1_id END
  )
);

-- 7. CHAT_MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message_type TEXT DEFAULT 'text', -- 'text', 'voice', 'image'
  content TEXT,
  voice_url TEXT,
  image_url TEXT,
  duration_seconds INTEGER, -- for voice messages
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TRANSACTIONS TABLE (for fees and payments)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL, -- 'listing_fee', 'service_fee', 'share_payment', 'refund'
  reference_type TEXT, -- 'animal_listing', 'butcher_listing', 'qurbani_share'
  reference_id UUID,
  amount_bdt INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  payment_method TEXT, -- 'bkash', 'nagad', 'rocket', 'bank'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. ADMIN_APPROVALS TABLE (for free listing tracking)
CREATE TABLE IF NOT EXISTS public.admin_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES public.profiles(id),
  item_type TEXT NOT NULL, -- 'animal_listing', 'butcher_listing'
  item_id UUID NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- 10. COUNTERS TABLE (for free listings limit)
CREATE TABLE IF NOT EXISTS public.listing_counters (
  id SERIAL PRIMARY KEY,
  listing_type TEXT UNIQUE NOT NULL, -- 'animal', 'butcher'
  total_free_listings INTEGER DEFAULT 0,
  free_limit INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial counter values
INSERT INTO public.listing_counters (listing_type, free_limit, total_free_listings)
VALUES 
  ('animal', 1000, 0),
  ('butcher', 100, 0)
ON CONFLICT (listing_type) DO NOTHING;

-- ==================== RLS POLICIES ====================

-- PROFILES RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ANIMAL_LISTINGS RLS
ALTER TABLE public.animal_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active listings" ON public.animal_listings FOR SELECT USING (status = 'active' OR auth.uid() = user_id);
CREATE POLICY "Users can create listings" ON public.animal_listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own listings" ON public.animal_listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own listings" ON public.animal_listings FOR DELETE USING (auth.uid() = user_id);

-- BUTCHER_LISTINGS RLS
ALTER TABLE public.butcher_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active butcher listings" ON public.butcher_listings FOR SELECT USING (status = 'active' OR auth.uid() = user_id);
CREATE POLICY "Users can create butcher listings" ON public.butcher_listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own butcher listings" ON public.butcher_listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own butcher listings" ON public.butcher_listings FOR DELETE USING (auth.uid() = user_id);

-- QURBANI_LISTINGS RLS
ALTER TABLE public.qurbani_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view open qurbani listings" ON public.qurbani_listings FOR SELECT USING (status != 'cancelled' OR auth.uid() = user_id);
CREATE POLICY "Users can create qurbani listings" ON public.qurbani_listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own qurbani listings" ON public.qurbani_listings FOR UPDATE USING (auth.uid() = user_id);

-- CHAT_ROOMS RLS
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their chat rooms" ON public.chat_rooms FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);
CREATE POLICY "Users can create chat rooms" ON public.chat_rooms FOR INSERT WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

-- CHAT_MESSAGES RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view messages in their rooms" ON public.chat_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.chat_rooms
    WHERE id = room_id AND (user1_id = auth.uid() OR user2_id = auth.uid())
  )
);
CREATE POLICY "Users can send messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- TRANSACTIONS RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==================== FUNCTIONS ====================

-- Function to increment animal listings counter
CREATE OR REPLACE FUNCTION increment_animal_listings_counter()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.fee_charged = FALSE THEN
    UPDATE public.listing_counters 
    SET total_free_listings = total_free_listings + 1
    WHERE listing_type = 'animal';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to increment butcher listings counter
CREATE OR REPLACE FUNCTION increment_butcher_listings_counter()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.fee_charged = FALSE THEN
    UPDATE public.listing_counters 
    SET total_free_listings = total_free_listings + 1
    WHERE listing_type = 'butcher';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for counters
DROP TRIGGER IF EXISTS animal_listings_counter_trigger ON public.animal_listings;
CREATE TRIGGER animal_listings_counter_trigger
AFTER INSERT ON public.animal_listings
FOR EACH ROW
EXECUTE FUNCTION increment_animal_listings_counter();

DROP TRIGGER IF EXISTS butcher_listings_counter_trigger ON public.butcher_listings;
CREATE TRIGGER butcher_listings_counter_trigger
AFTER INSERT ON public.butcher_listings
FOR EACH ROW
EXECUTE FUNCTION increment_butcher_listings_counter();

-- ==================== INDEXES ====================
CREATE INDEX IF NOT EXISTS idx_animal_listings_user_id ON public.animal_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_animal_listings_status ON public.animal_listings(status);
CREATE INDEX IF NOT EXISTS idx_butcher_listings_user_id ON public.butcher_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_qurbani_listings_user_id ON public.qurbani_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_qurbani_shares_qurbani_id ON public.qurbani_shares(qurbani_id);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_user_ids ON public.chat_rooms(user1_id, user2_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON public.chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
