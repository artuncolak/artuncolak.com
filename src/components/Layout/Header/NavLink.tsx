import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  url: string;
  label: string;
}

export default function NavLink({ label, url }: Props) {
  const { pathname } = useRouter();
  const active = pathname === url;

  return (
    <Link href={url}>
      <a
        className={cx(
          'font-blo bg-opacity-80 px-5 py-5 dark:bg-opacity-20 sm:rounded sm:px-3 sm:py-2',
          {
            'bg-primary-100 text-primary-500 dark:bg-primary-900 dark:text-primary-200':
              active,
            'hover:bg-zinc-50 dark:hover:bg-zinc-800': !active
          }
        )}
      >
        {label}
      </a>
    </Link>
  );
}
