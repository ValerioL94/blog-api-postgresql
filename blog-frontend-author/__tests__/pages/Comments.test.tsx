import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthContext } from '../../src/provider/context';
import {
  TAuthContext,
  TCommentDetail,
  TCommentList,
} from '../../src/types/types';
import Comments from '../../src/pages/Comments';

describe('comments page tests', () => {
  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: '123', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
  };

  const comment1: TCommentDetail = {
    id: '1',
    username: 'TestUser',
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
    username: 'TestUser2',
    content: 'test comment 2',
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:58:31.751Z'),
    postId: '1',
    post: {
      title: 'testpost1',
    },
  };

  const EmptyCommentList: TCommentList = [];
  function getNoComments() {
    return { comments: EmptyCommentList };
  }
  const commentList: TCommentList = [comment1, comment2];
  function getComments() {
    return { comments: commentList };
  }

  describe('comments page general rendering', async () => {
    beforeEach(() => {
      const testRoutes = createRoutesFromElements(
        <Route
          path={`/posts/1/comments`}
          loader={() => getComments()}
          element={<Comments />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/posts/1/comments`],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
    });
    test('show go top button', async () => {
      expect(
        await screen.findByRole('button', { name: /top/i })
      ).toBeInTheDocument();
    });
    test('show new comment form', async () => {
      expect(
        await screen.findByRole('heading', { name: /add comment/i })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    });
  });
  describe('comments page conditional rendering', () => {
    test('show no comments message', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path={`/posts/1/comments`}
          loader={() => getNoComments()}
          element={<Comments />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/posts/1/comments`],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      expect(
        await screen.findByRole('heading', { name: /there are no comments/i })
      ).toBeInTheDocument();
    });
    test('show comment preview for each comment', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path={`/posts/1/comments`}
          loader={() => getComments()}
          element={<Comments />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/posts/1/comments`],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      expect(await screen.findByText('test comment 1')).toBeInTheDocument();
      expect(await screen.findByText('test comment 2')).toBeInTheDocument();
    });
  });
});
