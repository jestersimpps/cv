import HeroParallax from '@/components/HeroParallax';
import { projects } from '@/lib/projects';
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-950 to-neutral-900">
      <GradientOrbs variant="purple" />
      <GridLines />
      <HeroParallax
        products={projects}
        topTitle="Jo Vinkenroye"
        bottomTitle="Full Stack Developer, Web3 & AI Enthusiast"
        subTitle="13+ years building ERP systems, SaaS platforms, and modern web applications. Specializing in AI integration, blockchain development, and scalable architectures."
      />
    </section>
  );
}
