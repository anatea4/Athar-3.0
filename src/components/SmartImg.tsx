import React from 'react';
import { parseImg, imgStyle, alignClass } from '@/lib/img';

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src?: string | null;
};

/**
 * Drop-in replacement for <img> that honors the per-image display settings
 * (fit / position / alignment / zoom) stored in the image URL hash. Falls back
 * to plain behavior when no settings are present, so it is always safe to use.
 *
 * Pass layout classes via className as usual; an object-fit class in className
 * (e.g. "object-cover") still works as the default until the editor overrides it.
 */
export default function SmartImg({ src, className = '', style, alt = '', ...rest }: Props) {
  const { src: clean, settings } = parseImg(src || '');
  const combined = { ...imgStyle(settings), ...(style || {}) };
  const cls = `${className} ${alignClass(settings)}`.trim();
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={clean} alt={alt} className={cls} style={combined} {...rest} />;
}
