import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail
} from '@tabler/icons';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import SocialIcon from './SocialIcon';
import SpotifyNowPlaying from './SpotifyNowPlaying';

const height = `h-[calc(100vh-8rem)]`;

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

export default function Profile() {
  return (
    <div
      className={classNames(
        'flex flex-grow items-center justify-center',
        height
      )}
    >
      <div className="flex w-full flex-col gap-4 sm:gap-5">
        <div className="h-32 w-32">
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
        <h1 className="text-4xl sm:text-5xl">Hi, I am Artun.</h1>
        <h2 className="text-2xl sm:text-4xl">I build software.</h2>
        <span className="sm:text-lg">
          I&apos;m a software engineer with experience in delivering clean,
          elegant and efficent code.
        </span>
        <div className="flex gap-5">
          <a
            href="/media/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border px-2 py-1 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 sm:text-base"
          >
            Resume
          </a>
          <Link href="/blog">
            <a className="rounded border px-2 py-1 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 sm:text-base">
              Blog
            </a>
          </Link>
        </div>
        <div className="flex flex-col gap-4 sm:gap-5 xl:flex-row xl:items-center">
          <div className="flex gap-5">
            {socialLinks.map(({ icon, url }) => (
              <SocialIcon key={url} url={url} icon={icon} />
            ))}
          </div>

          <SpotifyNowPlaying />
        </div>
      </div>
    </div>
  );
}
