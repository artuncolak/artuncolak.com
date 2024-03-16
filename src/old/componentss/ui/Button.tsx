import { IconLoader2 } from '@tabler/icons-react';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  children,
  className,
  loading = false,
  ...props
}: Props) {
  return (
    <button
      className={classNames(
        'relative flex rounded border px-3 py-2',
        'disabled:text-zinc-400 dark:disabled:text-zinc-600',
        'hover:bg-zinc-100',
        'dark:hover:bg-zinc-700',
        'border-zinc-300 bg-zinc-50',
        'dark:border-zinc-600 dark:bg-zinc-800',
        className
      )}
      {...props}
    >
      <span className="mx-auto flex gap-3 font-semibold">
        {loading ? <IconLoader2 className="animate-spin" /> : null} {children}
      </span>
    </button>
  );
}
