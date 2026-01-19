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

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white">
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
