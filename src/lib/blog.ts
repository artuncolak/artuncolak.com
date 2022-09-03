import * as fs from 'fs/promises';
import matter from 'gray-matter';

import { Post } from './models';

const POSTS_PATH = 'data/posts';

async function readPostFromMarkdown(
  fileName: string,
  withBody: boolean
): Promise<Post> {
  const markdown = await fs.readFile(`${POSTS_PATH}/${fileName}`);
  const metadata = matter(markdown.toString());

  const { date, title, slug, preview, description } = metadata.data;
  const body = withBody ? metadata.content : undefined;

  return { title, slug, description, date, preview, body };
}

async function readAllPostFileNames(): Promise<string[]> {
  const fileNames = await fs.readdir(POSTS_PATH);

  return fileNames;
}

export async function getAllPosts(withBody: boolean): Promise<Post[]> {
  const fileNames = await readAllPostFileNames();

  const promises = fileNames.map((fileName) =>
    readPostFromMarkdown(fileName, withBody)
  );

  const results = await Promise.all(promises);

  return results.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await getAllPosts(true);
    const post = posts.find((post) => post.slug === slug);

    return post || null;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);

    return null;
  }
}
