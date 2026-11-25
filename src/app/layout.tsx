import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { content } from "@/data/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Only the italic is used (every serif accent is italic) — skipping the
// upright face saves a font download on first load.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

// Mono only appears below the hero, so don't preload it (keeps bandwidth
// free for what's needed for the first paint).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const { site } = content;
const fullTitle = `${site.name} — ${site.title.join(" ").replace(/\.$/, "")}`;

// The Open Graph / Twitter image comes from app/opengraph-image.tsx and the
// favicons from app/icon.tsx + app/apple-icon.tsx (Next adds the tags automatically).
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: fullTitle, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: "/",
    title: fullTitle,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-bg font-sans text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
