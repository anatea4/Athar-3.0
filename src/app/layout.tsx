import type { Metadata } from "next";
import "./globals.css";
import { ContentProvider } from "@/lib/content-provider";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://athar.my";

const SEO_DEFAULTS = {
  title: "أكاديمية أثر | Athar Academy",
  description:
    "أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية | Athar Academy for Quran, Arabic & Islamic Sciences",
  keywords: "Athar Academy, أكاديمية أثر, Quran, تحفيظ القرآن, Malaysia, Tajweed",
  image: "/athar-logo.png", // 1200x630 recommended
};

// SEO is editable from the dashboard (site_settings: seo_title / seo_description / seo_keywords / seo_image)
async function getSeo() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return SEO_DEFAULTS;
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("site_settings")
      .select("key,value")
      .in("key", ["seo_title", "seo_description", "seo_keywords", "seo_image"]);
    const m: Record<string, string> = {};
    for (const r of data || []) if (r.value) m[r.key] = r.value;
    return {
      title: m.seo_title || SEO_DEFAULTS.title,
      description: m.seo_description || SEO_DEFAULTS.description,
      keywords: m.seo_keywords || SEO_DEFAULTS.keywords,
      image: m.seo_image || SEO_DEFAULTS.image,
    };
  } catch {
    return SEO_DEFAULTS;
  }
}

const absUrl = (img: string) =>
  img.startsWith("http") ? img : `${SITE_URL}${img.startsWith("/") ? "" : "/"}${img}`;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  const image = absUrl(seo.image);
  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    icons: {
      icon: [{ url: "/Athar-white-br-logo.jpg" }],
      shortcut: ["/Athar-white-br-logo.jpg"],
      apple: ["/Athar-white-br-logo.jpg"],
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: SITE_URL,
      siteName: "أكاديمية أثر",
      locale: "ar_SA",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "أكاديمية أثر",
  alternateName: "Athar Academy",
  url: SITE_URL,
  logo: `${SITE_URL}/athar-logo.png`,
  description:
    "أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية والعلوم الشرعية في ماليزيا.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
