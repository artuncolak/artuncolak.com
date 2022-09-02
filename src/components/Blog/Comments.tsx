import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const { theme } = useTheme();

  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <div className="mt-16">
      <h1 className="mb-5 sm:text-4xl">Leave a comment</h1>
      <Giscus
        repo="artuncolak/artuncolak.com-comments"
        repoId="R_kgDOH7A82w"
        category="Announcements"
        categoryId="DIC_kwDOH7A8284CRLXk"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'light' ? 'light' : 'transparent_dark'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
