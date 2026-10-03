import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";
import { site, siteUrl } from "@/lib/content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getSiteNavData } from "@/lib/site-links";
import { Analytics } from "@/components/analytics/analytics";

const description =
  "Collabrate designs, builds, and markets digital products for businesses that need one accountable team instead of multiple vendors. Web and app development, marketing, and AI solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Digital Development & Marketing`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "digital development agency",
    "web and app development",
    "digital marketing agency",
    "AI automation for business",
    "business website development",
    "AI chatbot development",
    "Collabrate",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/brand/icons/apple-touch-icon.png",
  },
  // Defaults only: no url here. Pages build their full openGraph/twitter/canonical with
  // buildMetadata() in src/lib/seo.ts, because Next.js replaces these objects per page.
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: `${site.name} | Digital Development & Marketing`,
    description,
    siteName: site.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} | Digital Development & Marketing`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Digital Development & Marketing`,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar navData={getSiteNavData()} />
        <div id="main-content">{children}</div>
        <Footer navData={getSiteNavData()} />
        <Analytics />
      </body>
    </html>
  );
}
