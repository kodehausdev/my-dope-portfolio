import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seyi Fatoki - Full Stack Developer | Android & Web Development",
  description: "Self-taught full-stack developer specializing in Android (Kotlin, Jetpack Compose), React, Node.js, and Firebase. Building intelligent, user-centric applications from concept to production.",
  keywords: ["Seyi Fatoki", "Full Stack Developer", "Android Developer", "React Developer", "Node.js", "Kotlin", "Jetpack Compose", "Firebase", "Portfolio", "Web Developer", "Software Engineer"],
  authors: [{ name: "Seyi Fatoki" }],
  creator: "Seyi Fatoki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seyifatoki.dev",
    title: "Seyi Fatoki - Full Stack Developer",
    description: "Self-taught developer building intelligent applications with Android, React, and Node.js",
    siteName: "Seyi Fatoki Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seyi Fatoki - Full Stack Developer",
    description: "Self-taught developer building intelligent applications with Android, React, and Node.js",
    creator: "@seyifatoki",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
