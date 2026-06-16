'use client';
import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window { turnstile?: any }
}

/**
 * Cloudflare Turnstile widget. Fetches the site key from the dashboard settings.
 * If no key is configured, it renders nothing and reports an empty token (protection OFF).
 */
export default function TurnstileWidget({ onVerify }: { onVerify: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [siteKey, setSiteKey] = useState('');

  useEffect(() => {
    fetch('/api/turnstile')
      .then((r) => r.json())
      .then((d) => setSiteKey(d.siteKey || ''))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!siteKey || !ref.current) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || !window.turnstile || !ref.current || ref.current.hasChildNodes()) return;
      window.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: (token: string) => onVerify(token),
        'expired-callback': () => onVerify(''),
        'error-callback': () => onVerify(''),
        theme: 'light',
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const id = 'cf-turnstile-script';
      if (!document.getElementById(id)) {
        const s = document.createElement('script');
        s.id = id;
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        s.async = true;
        s.defer = true;
        s.onload = render;
        document.head.appendChild(s);
      } else {
        const iv = setInterval(() => {
          if (window.turnstile) { render(); clearInterval(iv); }
        }, 200);
        setTimeout(() => clearInterval(iv), 8000);
      }
    }
    return () => { cancelled = true; };
  }, [siteKey, onVerify]);

  if (!siteKey) return null;
  return <div ref={ref} className="my-3 flex justify-center" />;
}
