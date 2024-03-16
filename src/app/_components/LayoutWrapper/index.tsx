import { ReactNode } from 'react';

import { Header } from './Header';

export interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className={`max-w-2xl lg:mx-auto mx-4 pt-16 flex flex-col h-full`}>
      <Header />

      <main className="py-8 px-4 h-full">{children}</main>
    </div>
  );
}
