import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { TPostList } from '../../src/types/types';
import Posts from '../../src/pages/Posts';

describe('posts page test', () => {
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
  describe('posts page content rendering', () => {
    test('show no post message if there are no posts available', async () => {
      const testRoutes = createRoutesFromElements(
        <Route path='/posts' loader={() => getNoPosts()} element={<Posts />} />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts'],
      });
      render(<RouterProvider router={router} />);
      expect(
        await screen.findByRole('heading', { name: /there are no posts/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /top/i })).toBeInTheDocument();
    });
    test('show post preview for each post available', async () => {
      const testRoutes = createRoutesFromElements(
        <Route path='/posts' loader={() => getPosts()} element={<Posts />} />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts'],
      });
      render(<RouterProvider router={router} />);
      expect(await screen.findByText('testpost1')).toBeInTheDocument();
      expect(await screen.findByText('testpost2')).toBeInTheDocument();
    });
  });
});
