'use client';

import Giscus from '@giscus/react';

export default function Comments() {
  return (
    <div className="mt-16 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-bold mb-8">Comments</h2>
      <Giscus
        repo="jestersimpps/cv"
        repoId="R_kgDOPcnshA"
        category="Ideas"
        categoryId="DIC_kwDOPcnshM4C07lV"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="transparent_dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
