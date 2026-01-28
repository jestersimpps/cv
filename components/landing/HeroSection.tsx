'use client';

import HeroParallax from '@/components/HeroParallax';
import { projects } from '@/lib/projects';
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-950 to-neutral-900">
      <GradientOrbs variant="purple" />
      <GridLines />
      <HeroParallax
        products={projects}
        topTitle={t('name')}
        bottomTitle={t('title')}
        subTitle={t('subtitle')}
      />
    </section>
  );
}
