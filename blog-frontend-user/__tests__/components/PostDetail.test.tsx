import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Post from '../../src/pages/Post';
import { TCommentDetail, TPostDetail } from '../../src/types/types';

describe('PostDetail tests', () => {
  const postWithNoComments: TPostDetail = {
    id: '1',
    title: 'testpost1',
    content: 'test content 1',
    published: false,
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:59:31.751Z'),
    authorId: '123',
    author: {
      username: 'TestUser',
      email: 'testemail@gmail.com',
    },
    comments: [],
  };
  function getPostWithNoComments() {
    return { post: postWithNoComments };
  }
  const comment1: TCommentDetail = {
    id: '1',
    username: 'Tommy',
    content: 'test comment 1',
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:58:31.751Z'),
    postId: '1',
    post: {
      title: 'testpost1',
    },
  };
  const comment2: TCommentDetail = {
    id: '2',
    username: 'Bob',
    content: 'test comment 2',
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:58:31.751Z'),
    postId: '1',
    post: {
      title: 'testpost1',
    },
  };

  const postWithComments: TPostDetail = {
    id: '1',
    title: 'testpost1',
    content: 'test content 1',
    published: false,
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:59:31.751Z'),
    authorId: '123',
    author: {
      username: 'TestUser',
      email: 'testemail@gmail.com',
    },
    comments: [comment1, comment2],
  };
  function getPostWithComments() {
    return { post: postWithComments };
  }

  describe('post section rendering', () => {
    const testRoutes = createRoutesFromElements(
      <Route
        path='/posts/:postId'
        element={<Post />}
        loader={() => getPostWithNoComments()}
      />
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/posts/1'],
    });
    beforeEach(() => {
      render(<RouterProvider router={router} />);
    });
    test('post title', () => {
      expect(
        screen.getByRole('heading', { name: 'testpost1' })
      ).toBeInTheDocument();
    });
    test('post author', () => {
      expect(screen.getByText('TestUser')).toBeInTheDocument();
    });
    test('post created', () => {
      expect(screen.getByText('9/18/2024, 11:56:31 AM')).toBeInTheDocument();
    });
    test('post updated', () => {
      expect(screen.getByText('9/18/2024, 11:59:31 AM')).toBeInTheDocument();
    });
    test('post content', () => {
      expect(screen.getByText('test content 1')).toBeInTheDocument();
    });
    test('top button', () => {
      expect(screen.getByRole('button', { name: /top/i })).toBeInTheDocument();
    });
  });
  describe('comment section rendering', () => {
    test('display no comments message', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='/posts/:postId'
          element={<Post />}
          loader={() => getPostWithNoComments()}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts/1'],
      });
      render(<RouterProvider router={router} />);
      expect(
        await screen.findByText(/there are no comments/i)
      ).toBeInTheDocument();
    });
    test('display each comment', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='/posts/:postId'
          element={<Post />}
          loader={() => getPostWithComments()}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts/1'],
      });
      render(<RouterProvider router={router} />);
      expect(await screen.findByText('Tommy')).toBeInTheDocument();
      expect(await screen.findByText('test comment 1')).toBeInTheDocument();
      expect(await screen.findByText('Bob')).toBeInTheDocument();
      expect(await screen.findByText('test comment 2')).toBeInTheDocument();
    });
  });
});
