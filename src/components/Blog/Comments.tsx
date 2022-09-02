import Giscus from '@giscus/react';
import classNames from 'classnames';
import { useTheme } from 'next-themes';

export default function Comments() {
  const { theme } = useTheme();
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <div className="mt-16">
      <h1
        className={classNames(
          'mb-5 flex items-center gap-5 sm:text-4xl',
          'after:block after:h-px after:flex-1 after:bg-zinc-200 dark:after:bg-zinc-700',
          'before:hidden before:h-px before:bg-zinc-200 dark:before:bg-zinc-700 sm:before:block sm:before:w-10'
        )}
      >
        Leave a comment
      </h1>
      {isProduction && (
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
      )}
    </div>
  );
}
