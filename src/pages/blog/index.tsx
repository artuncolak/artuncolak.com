import classNames from 'classnames';
import Head from 'next/head';

const height = `h-[calc(100vh-8rem)]`;

export default function Blog() {
  return (
    <>
      <Head>
        <title>Under Construction</title>
      </Head>

      <div
        className={classNames(
          'flex flex-col items-center justify-center',
          height
        )}
      >
        <h1>Under Construction</h1>
      </div>
    </>
  );
}
