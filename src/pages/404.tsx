import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';

const height = `h-[calc(100vh-8rem)]`;

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>

      <div
        className={classNames(
          'mx-auto flex flex-col items-center justify-center gap-5 text-center md:w-3/4 lg:w-1/2',
          height
        )}
      >
        <span className="text-[200px] font-bold leading-none text-zinc-300 dark:text-zinc-700 sm:text-[300px]">
          404
        </span>
        <h1 className="text-3xl  font-semibold sm:text-5xl">
          You have found a secret place.
        </h1>
        <span className="mt-3">
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </span>
        <Link href="/">
          <a className="mt-10 text-lg text-primary-500 dark:text-primary-700">
            Take me back to home page
          </a>
        </Link>
      </div>
    </>
  );
}
