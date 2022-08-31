import * as fs from 'fs/promises';
import matter from 'gray-matter';

import { Post } from './models';

function getPostFromMarkdown(markdown: Buffer, withBody: boolean): Post {
  const metadata = matter(markdown.toString());

  const { date, title, slug, preview, description } = metadata.data;
  const body = withBody ? metadata.content : undefined;

  return { title, slug, description, date, preview, body };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await fs.readdir('data/posts');

  const promises = files.map((fileName) =>
    fs.readFile(`data/posts/${fileName}`)
  );

  const results = await Promise.all(promises);

  return results
    .map((result) => getPostFromMarkdown(result, false))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const file = await fs.readFile(`data/posts/${slug}.md`);

    return getPostFromMarkdown(file, true);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);

    return null;
  }
}
