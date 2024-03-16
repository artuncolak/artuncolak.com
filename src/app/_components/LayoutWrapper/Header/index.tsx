'use client';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui';

import { ThemeButton } from './ThemeButton';

const NavigationItem = (props: { label: string; href: string }) => (
  <NavigationMenuItem>
    <Link href={props.href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {props.label}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

export function Header() {
  return (
    <header className="flex gap-3 justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationItem label="Home" href="/" />
          <NavigationItem label="Work" href="/work" />
          <NavigationItem label="Blog" href="/blog" />
          <NavigationItem label="Contact" href="/blog" />
        </NavigationMenuList>
      </NavigationMenu>

      <ThemeButton />
    </header>
  );
}
