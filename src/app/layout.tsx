import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorReporterInit } from "@/components/ErrorReporterInit";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://discrapp.com/#organization",
      name: "Discr",
      url: "https://discrapp.com",
      description:
        "Discr helps disc golfers recover lost discs with QR code stickers.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://discrapp.com/#website",
      url: "https://discrapp.com",
      name: "Discr",
      publisher: {
        "@id": "https://discrapp.com/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://discrapp.com/#app",
      name: "Discr",
      operatingSystem: "iOS, Android",
      applicationCategory: "SportsApplication",
      description:
        "QR code stickers for disc golf disc recovery. Scan, contact, and reunite with your lost discs.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  colorScheme: "light dark",
  title: "Discr™ - Protect Your Discs | Disc Golf Disc Recovery",
  description:
    "Never lose your disc golf discs again. QR code stickers for easy disc recovery. Scan, contact, and reunite with your lost discs.",
  keywords: [
    "disc golf",
    "disc recovery",
    "QR code",
    "lost disc",
    "disc protection",
    "disc golf stickers",
  ],
  openGraph: {
    title: "Discr™ - Get Yours Back",
    description: "QR code stickers for disc golf disc recovery",
    url: "https://discrapp.com",
    siteName: "Discr™",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discr™ - Protect Your Discs",
    description: "QR code stickers for disc golf disc recovery",
  },
  metadataBase: new URL("https://discrapp.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorReporterInit />
        {children}
      </body>
    </html>
  );
}
