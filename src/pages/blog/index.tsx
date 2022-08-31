import PostCard from '@components/Blog/PostCard';
import Page from '@components/Page';
import Input from '@components/ui/Input';
import { getAllPosts } from '@lib/blog';
import { Post } from '@lib/models';
import { GetStaticProps } from 'next';
import { useState } from 'react';

interface Props {
  posts: Post[];
}

export default function Blog({ posts }: Props) {
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page title="Artun Çolak | Blog">
      <div className="mt-16">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl sm:text-5xl">Blog</h1>
          <span className="text-lg sm:text-xl">
            I write about software engineering and more!
          </span>
          <Input
            type="text"
            className="md:w-96"
            placeholder="Search posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <hr className="border-zinc-200 dark:border-zinc-700" />
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-5">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))
          ) : (
            <h1>No Posts Found.</h1>
          )}
        </div>
      </div>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { posts: JSON.parse(JSON.stringify(await getAllPosts())) } };
};
