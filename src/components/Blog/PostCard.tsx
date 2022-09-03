import Card from '@components/ui/Card';
import { Post } from '@lib/models';
import { IconChevronRight } from '@tabler/icons';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const { title, description, slug, date, preview } = post;
  return (
    <Card className="flex w-full flex-col md:min-h-[380px] md:w-80">
      {preview ? (
        <Image
          src={preview}
          alt={title}
          layout="responsive"
          objectFit="cover"
          width={1}
          height={0.6}
          sizes="50vw"
          className="rounded-t"
        />
      ) : null}

      <div className="flex flex-grow flex-col gap-3 p-6">
        <Link href={`/blog/${slug}`}>
          <a className="text-xl font-bold text-black dark:text-white">
            {title}
          </a>
        </Link>

        {description ? <span>{description}</span> : null}

        <div className="mt-auto">
          <hr className="mx-[-24px] border-zinc-200 dark:border-zinc-700" />
          <div className="mt-6 flex justify-between text-sm">
            <Link href={`/blog/${slug}`}>
              <a className="mr-autoflex flex rounded text-primary-500">
                Read More <IconChevronRight />
              </a>
            </Link>

            <span>
              {new Date(date).toLocaleDateString(undefined, {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
