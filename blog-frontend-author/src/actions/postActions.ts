import { Params } from 'react-router-dom';

// authenticated post request
async function authRequest(
  url: string,
  method: string,
  data: {
    [k: string]: FormDataEntryValue;
  },
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

// returns api endpoint depending on request method
function getEndpoint(method: string, id: string | undefined) {
  if (method === 'POST') return '/api/posts';
  if (id) {
    if (method === 'PUT' || method === 'DELETE') return `/api/posts/${id}`;
    else throw new Error(`${method} not allowed`);
  } else {
    throw new Error('Post id missing');
  }
}

// send a POST / PUT / DELETE request to the backend
export async function postAction(
  request: Request,
  params: Params,
  token: string
) {
  const method = request.method;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const endpoint = getEndpoint(request.method, params.postId);
  try {
    const response = await authRequest(endpoint, method, payload, token);
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
