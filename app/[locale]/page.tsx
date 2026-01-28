import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
// import SkillsSection from "@/components/landing/SkillsSection";
import ExperienceSection from "@/components/landing/ExperienceSection";
// import EducationSection from "@/components/landing/EducationSection";
import BlogSection from "@/components/landing/BlogSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import SectionDivider from "@/components/ui/SectionDivider";
import { getAllPosts } from "@/lib/blog";
import { setRequestLocale } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      <LanguageSwitcher />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      {/* <SkillsSection />
      <SectionDivider /> */}
      <ExperienceSection />
      <SectionDivider />
      {/* <EducationSection />
      <SectionDivider /> */}
      <BlogSection posts={posts} />
      <SectionDivider />
      <ContactSection />
      <SectionDivider />
      <Footer />
    </div>
  );
}
