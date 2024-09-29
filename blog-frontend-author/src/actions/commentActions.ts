import { Params } from 'react-router-dom';
import { TCommentUpsert } from '../types/types';

// authenticated post request
async function authRequest(
  url: string,
  method: string,
  data: TCommentUpsert | null,
  token: string
) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
  });
  if (!response.ok) {
    throw new Response('Error', { status: response.status });
  }
  return response.json();
}

// send a POST / PUT / DELETE request to the backend
export async function commentAction(request: Request, params: Params) {
  const method = request.method;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const token: string = payload.token.toString();
  try {
    if (method === 'POST') {
      const endpoint = `/api/posts/${params.postId}/comments`;
      const commentData: TCommentUpsert = {
        username: payload.username.toString(),
        content: payload.content.toString(),
      };
      const response = await authRequest(endpoint, method, commentData, token);
      return response;
    }
    if (method === 'PUT') {
      const endpoint = `/api/posts/${params.postId}/comments/${params.commentId}`;
      const commentData: TCommentUpsert = {
        username: payload.username.toString(),
        content: payload.content.toString(),
      };
      const response = await authRequest(endpoint, method, commentData, token);
      return response;
    }
    if (method === 'DELETE') {
      const endpoint = `/api/posts/${params.postId}/comments/${params.commentId}`;
      const response = await authRequest(endpoint, method, null, token);
      return response;
    }
    throw new Error(`${method} not allowed`);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
