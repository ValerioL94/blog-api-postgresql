import { Params } from 'react-router-dom';
import { TPostList } from '../types/types';

async function getRequest(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Response('Error', { status: response.status });
  }
  return response.json();
}
export async function postsLoader() {
  const posts: TPostList = await getRequest('/api/posts');
  return posts;
}

export async function postLoader(params: Params) {
  const post = await getRequest(`api/posts/${params.postId}`);
  return post;
}
