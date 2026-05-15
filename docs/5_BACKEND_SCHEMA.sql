-- KOSHAI v0.2 Supabase Schema

-- 1. Profiles Table (Synced with Clerk)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'butcher')),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Animal Listings
CREATE TABLE animal_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES profiles(id),
    type TEXT NOT NULL, -- Cow, Goat, etc.
    price NUMERIC NOT NULL,
    weight NUMERIC,
    location TEXT,
    images TEXT[], -- Array of URLs
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'pending')),
    is_free BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Butcher Listings
CREATE TABLE butcher_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    butcher_id UUID REFERENCES profiles(id),
    experience_years INTEGER,
    specialties TEXT[],
    availability_slots JSONB,
    status TEXT DEFAULT 'active',
    is_free BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Share Qurbani Groups
CREATE TABLE share_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    leader_id UUID REFERENCES profiles(id),
    title TEXT NOT NULL,
    price_per_share NUMERIC NOT NULL,
    max_shares INTEGER DEFAULT 5,
    current_shares INTEGER DEFAULT 1,
    status TEXT DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Chats & Voice Notes
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES profiles(id),
    receiver_id UUID REFERENCES profiles(id),
    content TEXT, -- Text content
    voice_url TEXT, -- Supabase Storage URL
    type TEXT CHECK (type IN ('text', 'voice')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE animal_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE butcher_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Listings are viewable by everyone" ON animal_listings FOR SELECT USING (status = 'active');
CREATE POLICY "Sellers can manage own listings" ON animal_listings FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "Admins can manage all" ON animal_listings FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);
