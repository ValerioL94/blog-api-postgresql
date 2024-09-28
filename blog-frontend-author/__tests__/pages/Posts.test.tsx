import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { AuthContext } from '../../src/provider/context';
import { TAuthContext, TPostDetail, TPostList } from '../../src/types/types';
import Posts from '../../src/pages/Posts';
import HomePage from '../../src/pages/HomePage';
import ProtectedRoute from '../../src/pages/ProtectedRoute';
import Post from '../../src/pages/Post';
import NewPost from '../../src/pages/NewPost';

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
      published: false,
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
      published: false,
      createdAt: new Date('2024-09-18T09:56:31.751Z'),
      updatedAt: new Date('2024-09-18T09:56:31.751Z'),
      authorId: '123',
      author: {
        username: 'testusername',
        email: 'testemail@gmail.com',
      },
    },
  ];
  function getPosts() {
    return { posts: testPosts };
  }
  const noPosts: TPostList = [];
  function getNoPosts() {
    return { posts: noPosts };
  }
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
  describe('posts page conditional rendering', () => {
    test('render posts page if user is authenticated', async () => {
      const testRoutes = createRoutesFromElements(
        <Route path='/posts' loader={() => getNoPosts()} element={<Posts />} />
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
              loader={() => getNoPosts()}
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
        <Route path='/posts' loader={() => getNoPosts()} element={<Posts />} />
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
        <Route path='/posts' loader={() => getPosts()} element={<Posts />} />
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
  describe('posts page links', async () => {
    const user = userEvent.setup();
    const testRoutes = createRoutesFromElements(
      <>
        <Route path='/posts' loader={() => getPosts()} element={<Posts />} />
        <Route path='/posts/new-post' element={<NewPost />} />
        <Route
          path='/posts/:postId'
          element={<Post />}
          loader={() => getPost()}
        />
      </>
    );
    test('navigate to specified post page', async () => {
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      const testLink = await screen.findByRole('link', { name: 'testpost1' });

      await user.click(testLink);
      expect(
        await screen.findByRole('heading', { name: 'testpost1' })
      ).toBeInTheDocument();
    });
    test('navigate to new post page', async () => {
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      const testLink = await screen.findByRole('link', { name: /new post/i });
      await user.click(testLink);
      expect(
        await screen.findByRole('heading', { name: /new post/i })
      ).toBeInTheDocument();
    });
  });
});
