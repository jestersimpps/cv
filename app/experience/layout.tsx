import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Experience",
  description: "Full career timeline of Jo V - 13+ years of professional experience in web development, from SAP to AI integration.",
  openGraph: {
    title: "Work Experience | Jo V",
    description: "Full career timeline of Jo V - 13+ years of professional experience in web development, from SAP to AI integration.",
  },
  twitter: {
    title: "Work Experience | Jo V",
    description: "Full career timeline of Jo V - 13+ years of professional experience in web development, from SAP to AI integration.",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
