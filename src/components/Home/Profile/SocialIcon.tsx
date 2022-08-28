import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
  url: string;
  icon: ReactNode;
}

export default function SocialIcon({ icon, url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        'transition-colors',
        'hover:text-primary-500 dark:hover:text-primary-700'
      )}
    >
      {icon}
    </a>
  );
}
