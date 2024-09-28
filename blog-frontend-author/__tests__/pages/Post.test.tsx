import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { AuthContext } from '../../src/provider/context';
import { TAuthContext, TPostDetail } from '../../src/types/types';
import Post from '../../src/pages/Post';
import userEvent from '@testing-library/user-event';

describe('post page tests', () => {
  const user = userEvent.setup();
  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: '123', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
  };
  const postDetail: TPostDetail = {
    id: '1',
    title: 'testpost1',
    content: 'test content 1',
    published: false,
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:56:31.751Z'),
    authorId: '123',
    author: {
      username: 'testusername',
      email: 'testemail@gmail.com',
    },
    comments: [],
  };
  function getPost() {
    return { post: postDetail };
  }
  beforeEach(() => {
    const testRoutes = createRoutesFromElements(
      <Route path='/posts/1' element={<Post />} loader={() => getPost()} />
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/posts/1'],
    });
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
  });
  test('post details display', async () => {
    expect(
      await screen.findByRole('heading', { name: 'testpost1' })
    ).toBeInTheDocument();
  });
  test('post form display', async () => {
    const editButton = await screen.findByRole('button', { name: /edit/i });
    await user.click(editButton);
    expect(
      screen.getByRole('heading', { name: /edit post/i })
    ).toBeInTheDocument();
  });
});
