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
  // 🔥 ADD THIS: Required by Next.js for resolving absolute image URLs
  metadataBase: new URL("https://seyi.dev"), // Replace with your actual live domain!
  
  title: "Seyi Fatoki — AI Systems & Full-Stack Developer",
  description:
    "Self-taught developer building AI-powered systems and automation tools. Creator of OptiPropose — a multi-agent proposal platform — and HustleHawk, an intelligent job scraper. React, Node.js, Python, and LLM integration.",
  keywords: [
    "Seyi Fatoki",
    "AI Developer",
    "Multi-Agent Systems",
    "Full Stack Developer",
    "LLM Integration",
    "Automation Engineer",
    "OptiPropose",
    "HustleHawk",
    "React Developer",
    "Node.js",
    "Python Automation",
    "AI SaaS",
    "Prompt Engineering",
    "Web Developer",
    "Software Engineer",
    "Abuja Nigeria",
  ],
  authors: [{ name: "Seyi Fatoki" }],
  creator: "Seyi Fatoki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seyi.dev", // Replace with actual domain
    title: "Seyi Fatoki — AI Systems & Full-Stack Developer",
    description:
      "Building AI-powered systems that go beyond wrappers. Multi-agent automation, intelligent tooling, and production-grade full-stack apps.",
    siteName: "Seyi Fatoki",
    // 🔥 ADD THIS: The image that shows up on LinkedIn/Discord
    images: [
      {
        url: "/og-image.png", // Just drop a 1200x630 screenshot of your hero in the public folder
        width: 1200,
        height: 630,
        alt: "Seyi Fatoki Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // This tells Twitter to make the image massive
    title: "Seyi Fatoki — AI Systems & Full-Stack Developer",
    description:
      "Building AI-powered systems that go beyond wrappers. Multi-agent automation, intelligent tooling, and production-grade full-stack apps.",
    creator: "@seyifatoki",
    // 🔥 ADD THIS:
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