import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLPreElement>;

export default function CodeBlock({ children, className, ...rest }: Props) {
  return (
    <pre
      className={classNames(
        'overflow-x-auto rounded border bg-zinc-100 p-3 font-mono text-sm text-zinc-800 md:text-lg',
        'dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200',
        className
      )}
      {...rest}
    >
      {children}
    </pre>
  );
}
