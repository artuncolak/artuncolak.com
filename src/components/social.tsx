import {
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX,
	IconMail,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const socialLinks = [
	{
		icon: <IconBrandGithub />,
		url: 'https://github.com/artuncolak',
	},
	{
		icon: <IconBrandLinkedin />,
		url: 'https://www.linkedin.com/in/artuncolak/',
	},
	{
		icon: <IconBrandX />,
		url: 'https://x.com/artuncolak',
	},
	{
		icon: <IconBrandInstagram />,
		url: 'https://www.instagram.com/artuncolak/',
	},
	{
		icon: <IconMail />,
		url: 'mailto:artuncolak97@gmail.com',
	},
];

export function Social() {
	return (
		<div className="flex gap-5">
			{socialLinks.map(({ icon, url }) => (
				<a
					className={cn('transition-colors', 'hover:text-primary')}
					href={url}
					key={url}
					rel="noopener noreferrer"
					target="_blank"
				>
					{icon}
				</a>
			))}
		</div>
	);
}
