import Card from '@components/ui/Card';
import { Post } from '@lib/models';
import Link from 'next/link';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const { title, description, slug, date } = post;
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="flex w-full">
        <div className="flex flex-grow flex-col gap-3 p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:text-center">
            <span className="text-xl font-bold text-black dark:text-white">
              {title}
            </span>
            <span className="text-base">
              {new Date(date).toLocaleDateString(undefined, {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </span>
          </div>

          {description ? <span>{description}</span> : null}
        </div>
      </Card>
    </Link>
  );
}
