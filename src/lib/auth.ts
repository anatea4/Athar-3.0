import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  is_super: boolean;
}

export async function verifyAdmin(email: string, password: string): Promise<AdminUser | null> {
  const normalized = email.trim().toLowerCase();
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .ilike('email', normalized)
    .single();

  if (error || !data) return null;
  const valid = await bcrypt.compare(password, data.password_hash);
  if (!valid) return null;
  return { id: data.id, email: data.email, is_super: data.is_super };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function changeAdminPassword(adminId: string, newPassword: string): Promise<boolean> {
  const hash = await hashPassword(newPassword);
  const { error } = await supabase
    .from('admins')
    .update({ password_hash: hash })
    .eq('id', adminId);
  return !error;
}

export async function createAdmin(email: string, password: string, isSuper: boolean): Promise<AdminUser | null> {
  const hash = await hashPassword(password);
  const normalized = email.trim().toLowerCase();
  const { data, error } = await supabase
    .from('admins')
    .insert({
      email: normalized,
      username: normalized.split('@')[0],
      password_hash: hash,
      is_super: isSuper,
    })
    .select()
    .single();

  if (error || !data) return null;
  return { id: data.id, email: data.email, is_super: data.is_super };
}
