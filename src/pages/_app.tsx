import '@styles/global.css';

import Layout from '@components/Layout';
import { ENVIRONMENT, SPLITBEE_TOKEN } from '@lib/config';
import splitbee from '@splitbee/web';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (ENVIRONMENT === 'production') {
      splitbee.init({ token: SPLITBEE_TOKEN });
    }
  }, []);

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
