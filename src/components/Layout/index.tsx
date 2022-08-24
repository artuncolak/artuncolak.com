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
      <main className="container mx-auto mt-16 flex-grow">{children}</main>
      <Footer />
    </>
  );
}
