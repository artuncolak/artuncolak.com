import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={classNames(
        'rounded border px-3 py-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
