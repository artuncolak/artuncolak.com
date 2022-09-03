import Article from '@components/Blog/Article';
import Comments from '@components/Blog/Comments';
import Page from '@components/Page';
import { getAllPosts, getPostBySlug } from '@lib/blog';
import { Post } from '@lib/models';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import readingTime from 'reading-time';

interface Props {
  post: Post;
  readingTime: string;
}

export default function PostPage({ post, readingTime }: Props) {
  if (!post) return null;

  const { title, preview, description, date, body } = post;

  return (
    <Page
      title={`${title} - Artun Çolak`}
      image={preview}
      description={description}
      date={new Date(date).toISOString()}
      type="article"
    >
      <div className="my-16">
        <h1 className="mb-3 text-4xl font-semibold sm:text-5xl">{title}</h1>

        <div className="flex w-full flex-col text-lg sm:items-center md:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/media/profile.jpg"
              alt="Artun Çolak"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span>
              Artun Çolak /{' '}
              {new Date(date).toLocaleDateString(undefined, {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </span>
          </div>
          <span className="md:ml-auto">{readingTime}</span>
        </div>

        {preview ? (
          <div className="relative mt-16 w-full">
            <Image
              src={preview}
              alt={title}
              layout="responsive"
              sizes="50vw"
              height={9}
              width={16}
              objectFit="cover"
              className="rounded shadow-md "
            />
          </div>
        ) : null}
      </div>

      {body && <Article markdown={body} />}

      <Comments />
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(false);

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) return { notFound: true };

  const stats = readingTime(post.body || '');

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      readingTime: stats.text
    }
  };
};
