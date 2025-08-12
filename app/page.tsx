import Header from "@/components/Header";
import PersonalInfo from "@/components/PersonalInfo";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Interests from "@/components/Interests";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Header />
        <PersonalInfo />
        <Experience />
        <Education />
        <Skills />
        <Interests />
      </div>
    </div>
  );
}
