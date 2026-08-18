import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/sora";
import "./globals.css";
import { site, isPending } from "@/lib/content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const siteUrl = `https://${site.domain}`;
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
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
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
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: siteUrl,
  description,
  email: site.email,
  areaServed: site.serviceRegions,
  foundingDate: site.founded,
  ...(isPending(site.social.instagram) ? {} : { sameAs: [site.social.instagram] }),
  makesOffer: ["Web & App Development", "Digital Marketing", "AI Solutions"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
