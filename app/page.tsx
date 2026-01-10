import Header from "@/components/Header";
import PersonalInfo from "@/components/PersonalInfo";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Interests from "@/components/Interests";
import ExportButton from "@/components/ExportButton";
import TerminalBackground from "@/components/TerminalBackground";
import AIChatBubble from "@/components/AIChatBubble";
import SectionNav from "@/components/SectionNav";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <TerminalBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-white/10 via-transparent to-gray-100/20"></div>
      <SectionNav />
      <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Header />
        <PersonalInfo />
        <Experience />
        <Education />
        <Skills />
        <Interests />
        <ContactFooter />
      </div>
      <ExportButton />
      <AIChatBubble />
    </div>
  );
}
