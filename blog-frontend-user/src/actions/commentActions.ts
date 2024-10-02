import { Params } from 'react-router-dom';
import { TCommentInsert } from '../types/types';

async function postRequest(
  url: string,
  method: string,
  data: TCommentInsert | null
) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Response('Error', { status: response.status });
  }
  return response.json();
}

export async function commentAction(request: Request, params: Params) {
  const method = request.method;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const endpoint = `/api/posts/${params.postId}/comments`;
  const commentData: TCommentInsert = {
    username: payload.username.toString(),
    content: payload.content.toString(),
  };
  try {
    const response = await postRequest(endpoint, method, commentData);
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
