import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { AuthContext } from '../../src/provider/context';
import { TAuthContext, TPostList } from '../../src/types/types';
import Posts from '../../src/pages/Posts';
import HomePage from '../../src/pages/HomePage';
import ProtectedRoute from '../../src/pages/ProtectedRoute';

describe('post page test', () => {
  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: 'test', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
  };
  const nullContext: TAuthContext = {
    authData: null,
    setAuthData: () => null,
  };
  const testPosts: TPostList = [
    {
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
    },
    {
      id: '2',
      title: 'testpost2',
      content: 'test content 2',
      published: 'false',
      createdAt: new Date('2024-09-18T09:56:31.751Z'),
      updatedAt: new Date('2024-09-18T09:56:31.751Z'),
      authorId: '123',
      author: {
        username: 'testusername',
        email: 'testemail@gmail.com',
      },
    },
  ];
  const noPosts: TPostList = [];

  describe('posts page conditional rendering', () => {
    test('render posts page if user is authenticated', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='/posts'
          loader={() => {
            return { posts: noPosts };
          }}
          element={<Posts />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );

      expect(
        await screen.findByRole('heading', { name: 'Posts' })
      ).toBeInTheDocument();
    });
    test('render homepage if user is not authenticated', async () => {
      const testRoutes = createRoutesFromElements(
        <Route path='/'>
          <Route index path='home' element={<HomePage />} />
          <Route path='posts' element={<ProtectedRoute />}>
            <Route
              path='/posts'
              loader={() => {
                return { posts: noPosts };
              }}
              element={<Posts />}
            />
          </Route>
        </Route>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts'],
      });
      render(
        <AuthContext.Provider value={nullContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      expect(
        await screen.findByRole('heading', { name: /homepage/i })
      ).toBeInTheDocument();
    });
  });
  describe('posts page content rendering', () => {
    test('show no post message if there are no posts available', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='/posts'
          loader={() => {
            return { posts: noPosts };
          }}
          element={<Posts />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      expect(
        await screen.findByRole('heading', { name: /there are no posts/i })
      ).toBeInTheDocument();
    });
    test('show post preview for each post available', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='/posts'
          loader={() => {
            return { posts: testPosts };
          }}
          element={<Posts />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      expect(await screen.findByText('testpost1')).toBeInTheDocument();
      expect(await screen.findByText('testpost2')).toBeInTheDocument();
    });
  });
});
