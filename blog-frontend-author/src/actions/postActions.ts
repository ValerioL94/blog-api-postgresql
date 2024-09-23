import { Params } from 'react-router-dom';
import { TPostCreate, TPostUpdate } from '../types/types';

// authenticated post request
async function authRequest(
  url: string,
  method: string,
  data: TPostCreate | TPostUpdate | { id: string },
  token: string
) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Response('Error', { status: response.status });
  }
  return response.json();
}

// send a POST / PUT / DELETE request to the backend
export async function postAction(request: Request, params: Params) {
  const method = request.method;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const token: string = payload.token.toString();
  try {
    if (method === 'POST') {
      const endpoint = '/api/posts';
      const postData: TPostCreate = {
        title: payload.title.toString(),
        content: payload.content.toString(),
        published: payload.published.toString(),
        authorId: payload.authorId.toString(),
      };
      const response = await authRequest(endpoint, method, postData, token);
      return response;
    }
    if (method === 'PUT') {
      const endpoint = `/api/posts/${params.postId}`;
      const postData: TPostUpdate = {
        title: payload.title.toString(),
        content: payload.content.toString(),
        published: payload.published.toString(),
      };
      const response = await authRequest(endpoint, method, postData, token);
      return response;
    }
    if (method === 'DELETE') {
      const endpoint = `/api/posts/${params.postId}`;
      const postData = {
        id: payload.id.toString(),
      };
      const response = await authRequest(endpoint, method, postData, token);
      return response;
    } else {
      throw new Error(`${method} not allowed`);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
