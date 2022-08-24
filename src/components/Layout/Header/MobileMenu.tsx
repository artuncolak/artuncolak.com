import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  show: boolean;
}

export default function MobileMenu({ children, show }: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isShown, setIsShown] = useState(show);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (show) {
      setIsOpening(true);
      setIsShown(true);

      timer = setTimeout(() => setIsOpening(false), 200);
    } else {
      setIsClosing(true);

      timer = setTimeout(() => {
        setIsShown(false);
        setIsClosing(false);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [show]);

  if (!isShown) {
    return null;
  }

  return (
    <div
      className={classNames(
        'fixed mt-16 flex w-full flex-col shadow backdrop-blur-md sm:hidden',
        'border-zinc-300 bg-white bg-opacity-70',
        'dark:border-zinc-700 dark:bg-zinc-900 dark:bg-opacity-90',
        {
          'animate-scale-in-right-reverse': isClosing,
          'animate-scale-in-right': isOpening
        }
      )}
    >
      {children}
    </div>
  );
}
