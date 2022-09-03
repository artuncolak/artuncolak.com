import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function Card({ children, className, ...rest }: Props) {
  return (
    <div
      className={classNames(
        'rounded border shadow',
        'border-zinc-200 bg-white',
        'dark:border-zinc-700 dark:bg-zinc-800',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
