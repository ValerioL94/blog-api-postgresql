import { Params } from 'react-router-dom';
import { TCommentDetail, TCommentList } from '../types/types';

async function getRequest(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Response('Error', { status: response.status });
  }
  return response.json();
}

export async function commentListLoader(params: Params) {
  const comments: TCommentList = await getRequest(
    `/api/posts/${params.postId}/comments`
  );
  return comments;
}
export async function commentLoader(params: Params) {
  const comment: TCommentDetail = await getRequest(
    `/api/posts/${params.postId}/comments/${params.commentId}`
  );
  return comment;
}
