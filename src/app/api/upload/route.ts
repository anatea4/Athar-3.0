import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session) return null;
  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

const ALLOWED = [
  // images
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
  // documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain', 'application/rtf',
  'application/zip', 'application/x-zip-compressed',
  // audio
  'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg',
];
const MAX_SIZE = 25 * 1024 * 1024; // 25 MB (documents can be larger than images)

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'لم يتم اختيار ملف' }, { status: 400 });

  // Validate type — images + common document/audio types
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: 'نوع الملف غير مدعوم (صور، PDF، Word، Excel، PowerPoint، نص، صوت)' },
      { status: 400 }
    );
  }

  // Validate size
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'حجم الملف يجب أن يكون أقل من 25 ميجابايت' }, { status: 400 });
  }

  const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
  // Deterministic-ish unique name without Date.now (use crypto.randomUUID)
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const path = `uploads/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { error } = await supabaseAdmin.storage
    .from('site-images')
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: pub } = supabaseAdmin.storage.from('site-images').getPublicUrl(path);
  return NextResponse.json({ url: pub.publicUrl, path });
}

// List uploaded images (for media library view)
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin.storage
    .from('site-images')
    .list('uploads', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const images = (data || [])
    .filter((f) => f.name && !f.name.startsWith('.'))
    .map((f) => {
      const { data: pub } = supabaseAdmin.storage
        .from('site-images')
        .getPublicUrl(`uploads/${f.name}`);
      return { name: f.name, url: pub.publicUrl };
    });

  return NextResponse.json({ images });
}

// Delete an image
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { path } = await req.json();
  if (!path) return NextResponse.json({ error: 'Path required' }, { status: 400 });

  const { error } = await supabaseAdmin.storage.from('site-images').remove([path]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
