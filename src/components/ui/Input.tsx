import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ children, className, ...rest }: Props) {
  return (
    <input
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
    </input>
  );
}
