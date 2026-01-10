import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import SkillsSection from "@/components/landing/SkillsSection";
import ExperienceSection from "@/components/landing/ExperienceSection";
import EducationSection from "@/components/landing/EducationSection";
import ContactSection from "@/components/landing/ContactSection";
import AIChatBubble from "@/components/AIChatBubble";
import ExportButton from "@/components/ExportButton";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <EducationSection />
      <SectionDivider />
      <ContactSection />
      <AIChatBubble />
      <ExportButton />
    </div>
  );
}
