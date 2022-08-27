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
    icon: <IconBrandGithub className="sm:h-8 sm:w-8" />
  },
  {
    url: 'https://www.linkedin.com/in/artuncolak/',
    icon: <IconBrandLinkedin className="sm:h-8 sm:w-8" />
  },
  {
    url: 'https://twitter.com/artuncolak',
    icon: <IconBrandTwitter className="sm:h-8 sm:w-8" />
  },
  {
    url: 'https://www.instagram.com/artuncolak/',
    icon: <IconBrandInstagram className="sm:h-8 sm:w-8" />
  },
  {
    url: 'mailto:artuncolak97@gmail.com',
    icon: <IconMail className="sm:h-8 sm:w-8" />
  }
];

export default function ProfileSection() {
  return (
    <div
      className={classNames(
        'flex flex-grow items-center justify-center',
        height
      )}
    >
      <div className="flex w-full flex-col gap-4 sm:gap-5 lg:w-3/5">
        <div className="h-32 w-32 sm:h-52 sm:w-52">
          <Image
            src="/media/image/upload/v1661358232/profile"
            height={1}
            width={1}
            layout="responsive"
            alt="Artun Çolak"
            className="rounded-full"
          />
        </div>
        <h1 className="text-4xl sm:text-7xl">Hi, I am Artun.</h1>
        <h2 className="text-2xl sm:text-5xl">I build software.</h2>
        <span className="sm:text-xl">
          I&apos;m a software engineer with experience in delivering clean,
          elegant and efficent code.
        </span>
        <div className="flex gap-5">
          <a
            href="https://drive.google.com/file/d/1G6A6b9RQmAI355vjWJWQNit-kNxbVXxd/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border px-2 py-1 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 sm:px-3 sm:py-2 sm:text-base"
          >
            Resume
          </a>
          <Link href="/blog">
            <a className="rounded border px-2 py-1 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 sm:px-3 sm:py-2 sm:text-base">
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
