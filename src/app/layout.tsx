import type { Metadata } from "next";
import "./globals.css";
import { ContentProvider } from "@/lib/content-provider";

export const metadata: Metadata = {
  title: "أكاديمية أثر | Athar Academy",
  description:
    "أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية | Athar Academy for Quran, Arabic & Islamic Sciences",
  keywords: "Athar Academy, أكاديمية أثر, Quran, تحفيظ القرآن, Malaysia, Tajweed",
  icons: {
    icon: [{ url: "/Athar,white-br-logo.jpg" }],
    shortcut: ["/Athar,white-br-logo.jpg"],
    apple: ["/Athar,white-br-logo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
