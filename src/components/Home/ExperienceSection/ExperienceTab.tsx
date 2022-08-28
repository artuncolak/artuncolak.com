import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

export default function ExperienceTab({
  label,
  active = false,
  ...rest
}: Props) {
  return (
    <button
      className={classNames(
        'w-full border-l border-l-zinc-200 px-5 py-3 text-left transition-colors',
        'hover:bg-primary-100 hover:text-primary-500',
        'dark:border-l-zinc-600 dark:hover:bg-opacity-20',
        'dark:hover:bg-primary-900 dark:hover:text-primary-500',
        {
          '!border-primary-500 bg-primary-100 text-primary-500 dark:bg-primary-900 dark:!bg-opacity-20 dark:text-primary-500':
            active
        }
      )}
      {...rest}
    >
      {label}
    </button>
  );
}
