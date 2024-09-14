async function postRequest(url, data) {
  const response = await fetch(url, {
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

export async function userAction(request, path) {
  const endpoint = `/api/users/${path}`;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  const response = await postRequest(endpoint, payload);
  return response;
}
