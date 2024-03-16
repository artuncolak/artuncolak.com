'use client';

import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui';

const socialLinks = [
  {
    url: 'https://github.com/artuncolak',
    icon: <IconBrandGithub />
  },
  {
    url: 'https://www.linkedin.com/in/artuncolak/',
    icon: <IconBrandLinkedin />
  },
  {
    url: 'https://twitter.com/artuncolak',
    icon: <IconBrandTwitter />
  },
  {
    url: 'https://www.instagram.com/artuncolak/',
    icon: <IconBrandInstagram />
  },
  {
    url: 'mailto:artuncolak97@gmail.com',
    icon: <IconMail />
  }
];

export default function HomePage() {
  return (
    <section className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-4">
        <div className="h-40 w-40">
          <Image
            src="/media/profile.jpg"
            height={1}
            width={1}
            layout="responsive"
            alt="Artun Çolak"
            sizes="50vw"
            className="rounded-full"
          />
        </div>

        <h1 className="scroll-m-20 text-5xl tracking-wide font-light">
          Hi, I am Artun.
        </h1>
        <h2 className="text-4xl tracking-wide font-light">I build software.</h2>
        <span className="text-lg text-muted-foreground">
          I&apos;m a passionate software engineer with a rich background in
          delivering clean, elegant and high-performance code.
        </span>
        <div className="flex flex-col gap-4 sm:gap-5 xl:flex-row xl:items-center">
          <div className="flex gap-5">
            {socialLinks.map(({ icon, url }) => (
              <Button
                key={url}
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-primary"
              >
                <Link href={url}>{icon}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
