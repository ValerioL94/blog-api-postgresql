const server = 'https://blog-api-backend-eoez.onrender.com';

async function postRequest(
  url: string,
  data: {
    [k: string]: FormDataEntryValue;
  }
) {
  const response = await fetch(`${server}${url}`, {
    method: 'post',
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

// Send post request to login/signup endpoint depending on path string
export async function userAction(request: Request, path: string) {
  const endpoint = `/api/users/${path}`;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  const response = await postRequest(endpoint, payload);
  return response;
}
