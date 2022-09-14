import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function Card({ children, className, ...rest }: Props) {
  return (
    <div
      className={classNames(
        'rounded border',
        'border-zinc-200 bg-white',
        'dark:border-zinc-800 dark:bg-zinc-900',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
