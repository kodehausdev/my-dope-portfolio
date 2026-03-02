import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  // 🔥 Pointing to your live agency domain
  metadataBase: new URL("https://studio.optipropose.com"), 
  
  title: "OptiPropose Studio | Your White-Label Engineering Partner",
  description:
    "The technical backend for growth-focused digital agencies. We architect and build high-ticket custom software, client portals, and multi-agent AI automations.",
  keywords: [
    "OptiPropose Studio",
    "White-label development",
    "Agency technical partner",
    "Custom SaaS development",
    "AI Automation for Agencies",
    "White-label Client Portals",
    "High-Volume Architecture",
    "B2B Software Engineering",
  ],
  authors: [{ name: "OptiPropose Studio" }],
  creator: "OptiPropose Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studio.optipropose.com",
    title: "OptiPropose Studio | White-Label Engineering",
    description:
      "The technical backend for growth-focused digital agencies. We build the complex AI systems and custom software you sell to your clients.",
    siteName: "OptiPropose Studio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "OptiPropose Studio - White-Label Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", 
    title: "OptiPropose Studio | White-Label Engineering",
    description:
      "The technical backend for growth-focused digital agencies. We build the complex AI systems and custom software you sell to your clients.",
    images: ["/og-image.png"], 
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${dmSans.variable} ${dmSerifDisplay.variable} antialiased`}>
        <PageLoader />
        <Navbar />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}