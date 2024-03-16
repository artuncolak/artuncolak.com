import classNames from 'classnames';
import { SelectHTMLAttributes } from 'react';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ children, className, ...rest }: Props) {
  return (
    <select
      className={classNames(
        'rounded border-zinc-300 bg-zinc-50',
        'dark:border-zinc-600 dark:bg-zinc-800',
        'focus:border-primary-500 focus:ring-primary-500',
        'dark:focus:border-primary-700 dark:focus:ring-primary-700',
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
}
