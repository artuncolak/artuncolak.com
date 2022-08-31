import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="mx-auto my-16 w-full max-w-5xl flex-grow px-3">
        {children}
      </main>
      <Footer />
    </>
  );
}
