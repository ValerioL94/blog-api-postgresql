import { PostList } from '../types/types';

async function getRequest(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Response('Error', { status: response.status });
  }
  return response.json();
}
export async function postsLoader() {
  const posts: PostList = await getRequest('/api/posts');
  return posts;
}
