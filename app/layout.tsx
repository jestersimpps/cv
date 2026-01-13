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

const siteUrl = "https://www.jovweb.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jo Vinkenroye - Senior Web & Blockchain Developer | Available for Hire",
    template: "%s | Jo Vinkenroye",
  },
  description: "Senior Full Stack Developer with 13+ years experience. Specializing in React, Next.js, Web3, Solidity smart contracts, and AI integration. Available for remote positions and contract work.",
  keywords: [
    "Hire Web Developer",
    "Hire Full Stack Developer",
    "Senior Frontend Developer",
    "React Developer for Hire",
    "Next.js Developer",
    "Angular Developer",
    "TypeScript Expert",
    "Blockchain Developer for Hire",
    "Solidity Developer",
    "Smart Contract Developer",
    "Web3 Developer",
    "DeFi Developer",
    "AI Integration Specialist",
    "Remote Developer",
    "Freelance Web Developer",
    "Contract Developer Belgium",
    "Senior Software Engineer",
    "ERP Developer",
    "SaaS Developer",
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
    title: "Jo Vinkenroye - Senior Web & Blockchain Developer | Available for Hire",
    description: "Senior Full Stack Developer with 13+ years experience. Specializing in React, Next.js, Web3, Solidity smart contracts, and AI integration. Available for remote positions and contract work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jo Vinkenroye - Senior Web & Blockchain Developer | Available for Hire",
    description: "Senior Full Stack Developer with 13+ years experience. Specializing in React, Next.js, Web3, Solidity smart contracts, and AI integration. Available for remote positions and contract work.",
    creator: "@jestersimpps",
  },
  other: {
    "linkedin:author": "Jo Vinkenroye",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jo Vinkenroye",
  url: siteUrl,
  jobTitle: "Senior Full Stack Developer",
  description: "Senior Full Stack Developer with 13+ years experience specializing in React, Next.js, Web3, blockchain development, and AI integration.",
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Blockchain",
    "Solidity",
    "Web3",
    "Smart Contracts",
    "AI Integration",
    "Node.js",
    "Angular",
    "ERP Systems",
    "SaaS Development",
  ],
  sameAs: [
    "https://github.com/jestersimpps",
    "https://www.linkedin.com/in/jo-vinkenroye-459a7963/",
    "https://x.com/jestersimpps",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance / Available for Hire",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "Belgium",
  },
  workLocation: {
    "@type": "Place",
    name: "Remote",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
