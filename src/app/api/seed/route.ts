import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hashPassword } from '@/lib/auth';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// One-time setup endpoint — call GET /api/seed to initialize DB tables and default admin
export async function GET() {
  const results: string[] = [];

  try {
    // Create tables via RPC (raw SQL)
    const tableSQL = `
      CREATE TABLE IF NOT EXISTS admins (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        is_super BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS site_content (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
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
      CREATE TABLE IF NOT EXISTS payments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        student_id UUID,
        amount NUMERIC NOT NULL,
        currency TEXT DEFAULT 'MYR',
        status TEXT DEFAULT 'pending',
        description TEXT,
        stripe_payment_id TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    const { error: tableError } = await supabaseAdmin.rpc('exec_sql', { sql: tableSQL });
    if (tableError) {
      results.push(`Tables: ${tableError.message} (tables may already exist — OK)`);
    } else {
      results.push('Tables: created successfully');
    }
  } catch (e) {
    results.push(`Tables: ${e} (manual SQL creation may be needed)`);
  }

  // Seed initial admin
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'Athar@123';
    const passwordHash = await hashPassword(adminPassword);

    const { error } = await supabaseAdmin
      .from('admins')
      .upsert({ username: 'admin', password_hash: passwordHash, is_super: true }, { onConflict: 'username', ignoreDuplicates: true });

    if (error) {
      results.push(`Admin seed: ${error.message}`);
    } else {
      results.push(`Admin seed: "admin" created with password from ADMIN_PASSWORD env`);
    }
  } catch (e) {
    results.push(`Admin seed error: ${e}`);
  }

  return NextResponse.json({
    message: 'Seed completed',
    results,
    note: 'If tables failed to create, run supabase-setup.sql in the Supabase SQL Editor manually.',
  });
}
