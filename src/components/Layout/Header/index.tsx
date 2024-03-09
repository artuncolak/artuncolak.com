import { IconAlignLeft, IconX } from '@tabler/icons-react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import MobileMenu from './MobileMenu';
import NavLink from './NavLink';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { url: '/', label: 'Home' },
  { url: '/blog', label: 'Blog' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuShown, setMenuShown] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    setMenuShown(false);
    setIsScrolled(scrollY > 0);
  };

  const handleResize = () => {
    setMenuShown(false);
  };

  return (
    <>
      <header
        className={classNames(
          'z-50 bg-white bg-opacity-70 transition-shadow dark:bg-zinc-900 dark:bg-opacity-90',
          'fixed w-full backdrop-blur-md',
          'h-16',
          { shadow: isScrolled }
        )}
      >
        <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-3">
          <button
            className="sm:hidden"
            onClick={() => setMenuShown(!menuShown)}
          >
            {menuShown ? <IconX /> : <IconAlignLeft />}
          </button>

          <h1 className="sm:text-3xl">Artun Çolak</h1>

          <nav className="hidden gap-3 sm:flex">
            {navLinks.map(({ url, label }) => (
              <NavLink key={url} url={url} label={label} />
            ))}

            <ThemeToggle />
          </nav>

          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <MobileMenu show={menuShown}>
        {navLinks.map(({ url, label }) => (
          <NavLink
            key={url}
            url={url}
            label={label}
            onClick={() => setMenuShown(false)}
          />
        ))}
      </MobileMenu>
    </>
  );
}
