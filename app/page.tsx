import Header from "@/components/Header";
import PersonalInfo from "@/components/PersonalInfo";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Interests from "@/components/Interests";
import ExportButton from "@/components/ExportButton";
import TerminalBackground from "@/components/TerminalBackground";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-950">
      {/* Terminal background */}
      <TerminalBackground />
      
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/30"></div>
      <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Header />
        <PersonalInfo />
        <Experience />
        <Education />
        <Skills />
        <Interests />
      </div>
      <ExportButton />
    </div>
  );
}
