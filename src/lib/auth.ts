import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

export async function verifyAdmin(username: string, password: string) {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) return null;
  const valid = await bcrypt.compare(password, data.password_hash);
  if (!valid) return null;
  return { id: data.id, username: data.username, is_super: data.is_super };
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
