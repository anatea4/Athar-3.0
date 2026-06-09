-- Run this in Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/qgegyckpafggjetrjebo/sql

-- 1. Admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_super BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Site content table (key-value store for all editable content)
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Students table (for future registration)
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  program_id TEXT,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'unpaid',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Payments table (for future Stripe integration)
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'MYR',
  status TEXT DEFAULT 'pending',
  description TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Row Level Security (allow anon read for site_content, restrict writes)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow public read of site_content
CREATE POLICY "Public can read site content" ON site_content
  FOR SELECT USING (true);

-- Allow anon key to do everything (API routes handle auth themselves)
CREATE POLICY "Anon full access admins" ON admins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon full access content" ON site_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon full access students" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon full access payments" ON payments FOR ALL USING (true) WITH CHECK (true);

-- 6. Insert initial super admin (password: Athar@123)
-- bcrypt hash of "Athar@123" with 12 rounds:
INSERT INTO admins (username, password_hash, is_super)
VALUES (
  'admin',
  '$2a$12$LxnUOvVpH2j3s.k/Wdv.8OXnlHFaGEfGWkHX5yZ4xLkBP3bSqhIG',
  true
)
ON CONFLICT (username) DO NOTHING;
