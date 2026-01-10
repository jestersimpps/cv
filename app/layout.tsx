import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://cv-nine-bay.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jo Vinkenroye - Web Application Developer",
    template: "%s | Jo Vinkenroye",
  },
  description: "13+ years building ERP systems, SaaS platforms, and modern web applications. Specializing in AI integration, blockchain development, and scalable architectures.",
  keywords: [
    "Web Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Angular Developer",
    "TypeScript",
    "AI Integration",
    "Blockchain Developer",
    "Web3",
    "Belgium",
    "Remote",
    "Freelance",
  ],
  authors: [{ name: "Jo Vinkenroye", url: siteUrl }],
  creator: "Jo Vinkenroye",
  publisher: "Jo Vinkenroye",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Jo Vinkenroye",
    title: "Jo Vinkenroye - Web Application Developer",
    description: "13+ years building ERP systems, SaaS platforms, and modern web applications. Specializing in AI integration, blockchain development, and scalable architectures.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jo Vinkenroye - Web Application Developer",
    description: "13+ years building ERP systems, SaaS platforms, and modern web applications. Specializing in AI integration, blockchain development, and scalable architectures.",
    creator: "@jovinkenroye",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
