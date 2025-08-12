import Header from "@/components/Header";
import PersonalInfo from "@/components/PersonalInfo";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Interests from "@/components/Interests";
import ExportButton from "@/components/ExportButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-sunset">
      <div className="fixed inset-0 bg-gradient-mesh opacity-30 pointer-events-none"></div>
      <div className="fixed inset-0 bg-neutral-50/95 dark:bg-neutral-950/95 pointer-events-none"></div>
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
