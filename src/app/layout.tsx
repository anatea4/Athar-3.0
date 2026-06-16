import type { Metadata } from "next";
import "./globals.css";
import { ContentProvider } from "@/lib/content-provider";

const SITE_URL = "https://athar.my";
const OG_IMAGE = "/athar-logo.png"; // 1200x630 recommended

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "أكاديمية أثر | Athar Academy",
  description:
    "أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية | Athar Academy for Quran, Arabic & Islamic Sciences",
  keywords: "Athar Academy, أكاديمية أثر, Quran, تحفيظ القرآن, Malaysia, Tajweed",
  icons: {
    icon: [{ url: "/Athar-white-br-logo.jpg" }],
    shortcut: ["/Athar-white-br-logo.jpg"],
    apple: ["/Athar-white-br-logo.jpg"],
  },
  openGraph: {
    title: "أكاديمية أثر | Athar Academy",
    description:
      "أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية والعلوم الشرعية.",
    url: SITE_URL,
    siteName: "أكاديمية أثر",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "أكاديمية أثر | Athar Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أكاديمية أثر | Athar Academy",
    description:
      "أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية والعلوم الشرعية.",
    images: [OG_IMAGE],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "أكاديمية أثر",
  alternateName: "Athar Academy",
  url: SITE_URL,
  logo: `${SITE_URL}/athar-logo.png`,
  image: `${SITE_URL}${OG_IMAGE}`,
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
