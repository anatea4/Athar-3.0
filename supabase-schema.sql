-- ==========================================================================
-- Athar Academy — Complete Supabase Schema
-- Run this in the Supabase SQL Editor on a fresh project.
-- Then visit /api/seed once to create the super admin (it@athar.my).
-- ==========================================================================

-- --------------------------------------------------------------------------
-- 1. ADMINS — email-based authentication (bcrypt password hashes)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT,
  password_hash TEXT NOT NULL,
  is_super BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE admins DROP CONSTRAINT IF EXISTS admins_email_unique;
ALTER TABLE admins ADD CONSTRAINT admins_email_unique UNIQUE (email);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admins_all" ON admins;
CREATE POLICY "admins_all" ON admins FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------------
-- 2. SITE CONTENT — one JSON blob per section (hero, about, faqs, ...)
--    Empty/missing section = component falls back to code defaults.
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_content (
  section TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES admins(id)
);
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_content" ON site_content;
CREATE POLICY "public_read_content" ON site_content FOR SELECT USING (true);
DROP POLICY IF EXISTS "admin_write_content" ON site_content;
CREATE POLICY "admin_write_content" ON site_content FOR ALL USING (true) WITH CHECK (true);

INSERT INTO site_content (section) VALUES
  ('hero'), ('about'), ('stats'), ('programs'), ('detailed_programs'),
  ('team'), ('partners'), ('faqs'), ('initiatives'), ('volunteers'),
  ('media_news'), ('media_articles'), ('digital_library'), ('gallery'),
  ('daily_ayahs'), ('contact'), ('footer'), ('header'), ('ai_companion')
ON CONFLICT (section) DO NOTHING;

-- --------------------------------------------------------------------------
-- 3. SITE SETTINGS — key/value (Stripe keys, feature flags, site name)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_settings_all" ON site_settings;
CREATE POLICY "admin_settings_all" ON site_settings FOR ALL USING (true) WITH CHECK (true);

INSERT INTO site_settings (key, value) VALUES
  ('stripe_publishable_key', ''),
  ('stripe_secret_key', ''),
  ('payment_enabled', 'false'),
  ('site_name', 'Athar Academy')
ON CONFLICT (key) DO NOTHING;

-- --------------------------------------------------------------------------
-- 4. STUDENTS — registration records (future use)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  program_id TEXT,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'unpaid',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "students_all" ON students;
CREATE POLICY "students_all" ON students FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------------
-- 5. PAYMENTS — Stripe payment records
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'MYR',
  status TEXT DEFAULT 'pending',
  description TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "payments_all" ON payments;
CREATE POLICY "payments_all" ON payments FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------------
-- 5b. CUSTOM PAGES — pages built from the admin (Page Builder)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS custom_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL,
  title_ar TEXT DEFAULT '',
  title_en TEXT DEFAULT '',
  title_ms TEXT DEFAULT '',
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT true,
  show_in_nav BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE custom_pages DROP CONSTRAINT IF EXISTS custom_pages_slug_unique;
ALTER TABLE custom_pages ADD CONSTRAINT custom_pages_slug_unique UNIQUE (slug);
ALTER TABLE custom_pages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_pages" ON custom_pages;
CREATE POLICY "public_read_pages" ON custom_pages FOR SELECT USING (true);
DROP POLICY IF EXISTS "admin_write_pages" ON custom_pages;
CREATE POLICY "admin_write_pages" ON custom_pages FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------------
-- 5c. SUBMISSIONS — all site form submissions (contact, volunteer, etc.)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL DEFAULT 'general',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS submissions_type_idx ON submissions(form_type);
CREATE INDEX IF NOT EXISTS submissions_created_idx ON submissions(created_at DESC);
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anyone_can_submit" ON submissions;
CREATE POLICY "anyone_can_submit" ON submissions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "admin_manage_submissions" ON submissions;
CREATE POLICY "admin_manage_submissions" ON submissions FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------------
-- 6. STORAGE — public bucket for uploaded images (5 MB, images only)
-- --------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-images', 'site-images', true, 5242880,
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true, file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'];

DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
CREATE POLICY "public_read_images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
DROP POLICY IF EXISTS "anon_upload_images" ON storage.objects;
CREATE POLICY "anon_upload_images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-images');
DROP POLICY IF EXISTS "anon_update_images" ON storage.objects;
CREATE POLICY "anon_update_images" ON storage.objects FOR UPDATE USING (bucket_id = 'site-images');
DROP POLICY IF EXISTS "anon_delete_images" ON storage.objects;
CREATE POLICY "anon_delete_images" ON storage.objects FOR DELETE USING (bucket_id = 'site-images');
