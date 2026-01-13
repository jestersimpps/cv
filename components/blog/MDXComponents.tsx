import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import CodeBlock from './CodeBlock';

function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    const props = children.props as { children?: ReactNode };
    return extractTextFromChildren(props.children);
  }
  return '';
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 bg-white/10 border border-white/5 rounded-md text-[13px] font-mono text-pink-300 break-words">
      {children}
    </code>
  );
}

export const MDXComponents = {
  h2: ({ children, id, ...props }: { children: ReactNode; id?: string }) => (
    <h2
      id={id}
      className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: { children: ReactNode; id?: string }) => (
    <h3
      id={id}
      className="text-xl font-semibold text-white mt-8 mb-3 scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, id, ...props }: { children: ReactNode; id?: string }) => (
    <h4
      id={id}
      className="text-lg font-medium text-white mt-6 mb-2 scroll-mt-24"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children }: { children: ReactNode }) => {
    const childArray = Array.isArray(children) ? children : [children];
    const hasOnlyImage = childArray.length === 1 &&
      childArray[0] &&
      typeof childArray[0] === 'object' &&
      'type' in childArray[0] &&
      (childArray[0].type === 'img' || childArray[0].props?.src);

    if (hasOnlyImage) {
      return <>{children}</>;
    }

    return <p className="text-neutral-300 leading-relaxed mb-4 break-words">{children}</p>;
  },
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <Link
      href={href || '#'}
      className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
    >
      {children}
    </Link>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-outside ml-6 space-y-2 mb-4 text-neutral-300">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-outside ml-6 space-y-2 mb-4 text-neutral-300">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="text-neutral-300 pl-1">{children}</li>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500/50 bg-blue-500/5 pl-4 pr-4 py-3 my-6 text-neutral-300 italic rounded-r-lg">
      {children}
    </blockquote>
  ),
  pre: ({ children }: { children: ReactNode }) => {
    const codeElement = children as React.ReactElement<{ children: string; className?: string }>;
    const code = extractTextFromChildren(codeElement?.props?.children);
    const className = codeElement?.props?.className || '';
    const language = className.replace('language-', '') || 'typescript';
    return <CodeBlock code={code} language={language} />;
  },
  code: ({ children, className }: { children: ReactNode; className?: string }) => {
    if (className) {
      return <code className={className}>{children}</code>;
    }
    return <InlineCode>{children}</InlineCode>;
  },
  figure: ({ children, ...props }: { children: ReactNode }) => (
    <figure className="my-6" {...props}>
      {children}
    </figure>
  ),
  figcaption: ({ children }: { children: ReactNode }) => (
    <figcaption className="text-center text-xs text-neutral-500 mt-2">
      {children}
    </figcaption>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
        <Image src={src || ''} alt={alt || ''} fill className="object-cover" />
      </div>
      {alt && (
        <figcaption className="text-center text-sm text-neutral-500 mt-3">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  hr: () => (
    <hr className="border-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12" />
  ),
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-white/5 border-b border-white/10">{children}</thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => (
    <tbody className="divide-y divide-white/5">{children}</tbody>
  ),
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="px-5 py-3 text-left text-white font-semibold text-sm whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-5 py-3 text-neutral-300 text-sm">
      {children}
    </td>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="italic text-neutral-200">{children}</em>
  ),
};
