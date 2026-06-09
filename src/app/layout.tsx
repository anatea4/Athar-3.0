import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "أكاديمية أثر | Athar Academy",
  description: "أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية | Athar Academy for Quran, Arabic & Islamic Sciences",
  keywords: "Athar Academy, أكاديمية أثر, Quran, تحفيظ القرآن, Malaysia, Tajweed",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
