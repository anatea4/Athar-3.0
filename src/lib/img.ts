// Per-image display settings carried INSIDE the image URL as a hash fragment
// (e.g. "https://.../pic.jpg#athar=%7B...%7D"). This keeps everything in the
// existing string fields — no database/schema changes — and the settings travel
// with the image wherever it is rendered. Servers ignore the URL hash, so a
// component that doesn't read it still shows the image normally.
import type React from 'react';

export type ImgFit = 'cover' | 'contain';
export type ImgAlign = 'left' | 'center' | 'right';

export interface ImgSettings {
  fit?: ImgFit;       // cover = fill & crop, contain = show whole image
  pos?: string;       // object-position, e.g. "center top", "50% 20%"
  align?: ImgAlign;   // horizontal placement of the image box itself
  zoom?: number;      // percentage, 100 = normal
}

const MARK = '#athar=';

/** Split a stored value into the clean URL and its display settings. */
export function parseImg(value?: string | null): { src: string; settings: ImgSettings } {
  if (!value) return { src: '', settings: {} };
  const i = value.indexOf(MARK);
  if (i === -1) return { src: value, settings: {} };
  const src = value.slice(0, i);
  try {
    return { src, settings: JSON.parse(decodeURIComponent(value.slice(i + MARK.length))) || {} };
  } catch {
    return { src, settings: {} };
  }
}

/** Re-attach settings to a clean URL (drops the marker when there's nothing to store). */
export function buildImg(src: string, settings: ImgSettings): string {
  const clean = (src || '').split(MARK)[0];
  const s: ImgSettings = {};
  if (settings.fit) s.fit = settings.fit;
  if (settings.pos) s.pos = settings.pos;
  if (settings.align) s.align = settings.align;
  if (settings.zoom && settings.zoom !== 100) s.zoom = settings.zoom;
  if (Object.keys(s).length === 0) return clean;
  return `${clean}${MARK}${encodeURIComponent(JSON.stringify(s))}`;
}

/** CSS style object to apply to the <img> element. */
export function imgStyle(settings: ImgSettings): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (settings.fit) style.objectFit = settings.fit;
  if (settings.pos) style.objectPosition = settings.pos;
  if (settings.zoom && settings.zoom !== 100) {
    style.transform = `scale(${settings.zoom / 100})`;
    style.transformOrigin = settings.pos || 'center';
  }
  return style;
}

/** Tailwind class for the chosen horizontal alignment (when the image isn't full-width). */
export function alignClass(settings: ImgSettings): string {
  if (settings.align === 'left') return 'mr-auto';
  if (settings.align === 'right') return 'ml-auto';
  if (settings.align === 'center') return 'mx-auto';
  return '';
}
