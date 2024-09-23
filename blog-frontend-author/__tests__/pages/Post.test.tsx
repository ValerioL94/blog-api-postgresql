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

describe('post page rendering', () => {
  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: 'test', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
  };
  const postDetail: TPostDetail = {
    id: '1',
    title: 'testpost1',
    content: 'test content 1',
    published: 'false',
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:56:31.751Z'),
    authorId: '123',
    author: {
      username: 'testusername',
      email: 'testemail@gmail.com',
    },
    comments: [],
  };

  test('post details', async () => {
    const testRoutes = createRoutesFromElements(
      <Route
        path='/posts/1'
        element={<Post />}
        loader={() => {
          return { post: postDetail };
        }}
      />
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/posts/1'],
    });
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    expect(
      await screen.findByRole('heading', { name: 'testpost1' })
    ).toBeInTheDocument();
    expect(screen.getByText('testusername')).toBeInTheDocument();
    expect(screen.getAllByText('9/18/2024, 11:56:31 AM')).toBeDefined();
    expect(screen.getByText('test content 1')).toBeInTheDocument();
  });
});
