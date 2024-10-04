import { Params } from 'react-router-dom';
import { TPostDetail, TPostList } from '../types/types';

const server = 'https://blog-api-backend-eoez.onrender.com';

async function getRequest(url: string) {
  const response = await fetch(`${server}${url}`);
  if (!response.ok) {
    throw new Response('Error', { status: response.status });
  }
  return response.json();
}
export async function postListLoader() {
  const posts: { posts: TPostList } = await getRequest('/api/posts');
  return posts;
}

export async function postLoader(params: Params) {
  const post: { post: TPostDetail } = await getRequest(
    `/api/posts/${params.postId}`
  );
  return post;
}
