import { WEBSITE_DOMAIN } from '@lib/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
  date?: string;
  children: ReactNode;
}

export default function Page({ children, ...customMeta }: Props) {
  const router = useRouter();

  const meta = {
    title: 'Artun Çolak',
    description:
      'Software engineer with experience in delivering clean, elegant and efficent code.',
    image: `${WEBSITE_DOMAIN}/media/profile.jpg`,
    type: 'website',
    ...customMeta
  };

  const { title, description, image, type, date } = meta;

  const url = `${WEBSITE_DOMAIN}${router.asPath}`;

  const metaImage = image
    ? image.startsWith('http') || image.startsWith('https')
      ? image
      : `${WEBSITE_DOMAIN}${image}`
    : '';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={description} name="description" />
        <meta property="og:url" content={url} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content="Artun Çolak" />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@artuncolak" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImage} />
        {date && <meta property="article:published_time" content={date} />}
      </Head>
      {children}
    </>
  );
}
