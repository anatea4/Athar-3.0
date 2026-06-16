'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Loader2, Check, X, Move } from 'lucide-react';

interface Box { x: number; y: number; size: number } // px, relative to the displayed <img>

/**
 * Square interactive image cropper (Google-Photos style, but square).
 * Drag the frame to move it, use the slider to resize it, then "تطبيق" crops
 * the image for real (canvas) and uploads the square result via /api/upload.
 */
export default function ImageCropper({
  src,
  onCropped,
  onCancel,
  onToast,
}: {
  src: string;
  onCropped: (url: string) => void;
  onCancel: () => void;
  onToast?: (type: 'success' | 'error', msg: string) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [box, setBox] = useState<Box>({ x: 0, y: 0, size: 0 });
  const [dims, setDims] = useState({ w: 0, h: 0 }); // displayed image size in px
  const [saving, setSaving] = useState(false);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  // Initialise the crop box to the largest centered square once the image lays out.
  const init = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    const size = Math.min(w, h) * 0.85;
    setDims({ w, h });
    setBox({ x: (w - size) / 2, y: (h - size) / 2, size });
    setReady(true);
  }, []);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete) init();
  }, [init]);

  useEffect(() => {
    const onResize = () => init();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [init]);

  const clamp = (b: Box): Box => {
    const size = Math.max(40, Math.min(b.size, dims.w, dims.h));
    const x = Math.max(0, Math.min(b.x, dims.w - size));
    const y = Math.max(0, Math.min(b.y, dims.h - size));
    return { x, y, size };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { dx: e.clientX - box.x, dy: e.clientY - box.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setBox((b) => clamp({ ...b, x: e.clientX - drag.current!.dx, y: e.clientY - drag.current!.dy }));
  };
  const onPointerUp = () => { drag.current = null; };

  const onSize = (val: number) => {
    setBox((b) => {
      const cx = b.x + b.size / 2;
      const cy = b.y + b.size / 2;
      const size = val;
      return clamp({ x: cx - size / 2, y: cy - size / 2, size });
    });
  };

  const apply = async () => {
    const el = imgRef.current;
    if (!el) return;
    setSaving(true);
    try {
      const factor = el.naturalWidth / el.clientWidth; // displayed → natural
      const sx = box.x * factor;
      const sy = box.y * factor;
      const sSize = box.size * factor;
      const out = Math.min(Math.round(sSize), 1400); // cap output resolution
      const canvas = document.createElement('canvas');
      canvas.width = out;
      canvas.height = out;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no ctx');
      ctx.drawImage(el, sx, sy, sSize, sSize, 0, 0, out, out);
      const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.92));
      if (!blob) throw new Error('crop failed');
      const fd = new FormData();
      fd.append('file', new File([blob], 'cropped.jpg', { type: 'image/jpeg' }));
      const r = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'upload failed');
      onCropped(data.url);
      onToast?.('success', 'تم قصّ الصورة ✓');
    } catch (err: any) {
      onToast?.('error', err?.message === 'crop failed' ? 'تعذّر القصّ' : 'تعذّر قصّ الصورة (قد يكون رابط خارجي محمي)');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-[#111] text-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <button onClick={onCancel} className="p-1.5 hover:bg-white/10 rounded-lg"><X className="h-5 w-5" /></button>
          <h3 className="text-base font-bold">قصّ الصورة (مربّع)</h3>
          <span className="w-8" />
        </div>

        {/* stage */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/40">
          <div ref={wrapRef} className="relative inline-block select-none" style={{ touchAction: 'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt="crop"
              crossOrigin="anonymous"
              onLoad={init}
              className="block max-w-full max-h-[58vh] w-auto h-auto"
              draggable={false}
            />
            {ready && (
              <>
                {/* dark overlay outside the square via 4 panels */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-black/55" style={{ left: 0, top: 0, width: '100%', height: box.y }} />
                  <div className="absolute bg-black/55" style={{ left: 0, top: box.y + box.size, width: '100%', bottom: 0 }} />
                  <div className="absolute bg-black/55" style={{ left: 0, top: box.y, width: box.x, height: box.size }} />
                  <div className="absolute bg-black/55" style={{ left: box.x + box.size, top: box.y, right: 0, height: box.size }} />
                </div>
                {/* square frame (draggable) */}
                <div
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  className="absolute border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.4)] cursor-move flex items-center justify-center"
                  style={{ left: box.x, top: box.y, width: box.size, height: box.size }}
                >
                  <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-white" />
                  <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-white" />
                  <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-white" />
                  <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-white" />
                  <Move className="h-5 w-5 text-white/70" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* controls */}
        <div className="px-5 py-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/60 shrink-0">حجم الإطار</span>
            <input
              type="range"
              min={40}
              max={Math.max(40, Math.min(dims.w, dims.h))}
              value={box.size}
              onChange={(e) => onSize(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button onClick={onCancel} className="px-4 py-2 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20">إلغاء</button>
            <button
              onClick={apply}
              disabled={saving || !ready}
              className="px-5 py-2 rounded-xl text-sm font-bold bg-amber-400 text-black hover:bg-amber-300 disabled:opacity-60 flex items-center gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              تطبيق القصّ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
