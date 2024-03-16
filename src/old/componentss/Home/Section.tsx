import classNames from 'classnames';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
}

export default function Section({
  children,
  label,
  description,
  ...rest
}: Props) {
  return (
    <section {...rest}>
      {label ? (
        <h1
          className={classNames(
            'mb-3 flex items-center gap-5 sm:text-4xl',
            'after:block after:h-px after:flex-1 after:bg-zinc-200 dark:after:bg-zinc-700',
            'before:hidden before:h-px before:bg-zinc-200 dark:before:bg-zinc-700 sm:before:block sm:before:w-10'
          )}
        >
          {label}
        </h1>
      ) : null}
      {description ? <span>{description}</span> : null}

      <div className="mt-8 sm:mt-16">{children}</div>
    </section>
  );
}
