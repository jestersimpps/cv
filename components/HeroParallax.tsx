'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Project } from '@/lib/projects';

interface HeroParallaxProps {
  products: Project[];
  topTitle: string;
  bottomTitle: string;
  subTitle: string;
}

export const HeroParallax = ({
  products,
  topTitle,
  bottomTitle,
  subTitle,
}: HeroParallaxProps) => {
  const firstRow = products.slice(0, 8);
  const secondRow = products.slice(8, 16);
  const thirdRow = products.slice(16, 24);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header topTitle={topTitle} bottomTitle={bottomTitle} subTitle={subTitle} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.company} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.company} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.company} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = ({
  topTitle,
  bottomTitle,
  subTitle,
}: {
  topTitle: string;
  bottomTitle: string;
  subTitle: string;
}) => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 z-50">
      <h1 className="text-4xl md:text-7xl font-bold text-white">
        {topTitle}
        <br />
        <span className="text-neutral-400">{bottomTitle}</span>
      </h1>
      <p className="max-w-2xl mt-8 text-base md:text-xl text-neutral-300">{subTitle}</p>
      <div className="flex flex-wrap gap-4 mt-8 relative z-50">
        <Link
          href="/recruiters"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-purple-500/50"
        >
          Hiring?
        </Link>
        <Link
          href="/blog"
          className="flex items-center gap-2 px-8 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Blog
        </Link>
      </div>
    </div>
  );
};

const ProductCard = ({
  product,
  translate,
}: {
  product: Project;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.company}
      className="group/product h-80 w-[28rem] relative flex-shrink-0 pointer-events-none"
    >
      <div className="block group-hover/product:shadow-2xl h-full w-full rounded-xl overflow-hidden">
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover absolute h-full w-full inset-0 rounded-xl"
          alt={product.company}
        />
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none rounded-xl transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
          <h2 className="text-white font-bold text-lg">{product.company}</h2>
          <p className="text-neutral-300 text-sm">{product.title}</p>
          <p className="text-neutral-400 text-xs mt-1 line-clamp-2">{product.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroParallax;
