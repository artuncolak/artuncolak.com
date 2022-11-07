import Page from '@components/Page';
import classNames from 'classnames';
import Link from 'next/link';

const height = `h-[calc(100vh-8rem)]`;

export default function NotFound() {
  return (
    <Page title="404 - Artun Çolak">
      <div
        className={classNames(
          'flex flex-col justify-center gap-5 text-center',
          height
        )}
      >
        <span className="text-[200px] font-bold leading-none text-zinc-300 dark:text-zinc-700 sm:text-[300px]">
          404
        </span>
        <h1 className="text-3xl font-semibold sm:text-5xl">
          You have found a secret place.
        </h1>
        <span className="mt-3">
          Unfortunately, this is only a 404 page. <br /> You may have mistyped
          the address, or the page has been moved to another URL.
        </span>
        <Link
          href="/"
          className="mt-10 text-lg text-primary-500 dark:text-primary-700"
        >
          Take me back to home page
        </Link>
      </div>
    </Page>
  );
}
