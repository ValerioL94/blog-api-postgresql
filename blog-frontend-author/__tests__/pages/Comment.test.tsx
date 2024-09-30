import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Comment from '../../src/pages/Comment';
import { TAuthContext, TCommentDetail } from '../../src/types/types';
import { AuthContext } from '../../src/provider/context';
import userEvent from '@testing-library/user-event';

describe('comment page tests', () => {
  const user = userEvent.setup();
  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: '123', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
  };
  const testComment: TCommentDetail = {
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
  function getComment() {
    return { comment: testComment };
  }
  describe('content conditional rendering', () => {
    beforeEach(() => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='/posts/:postId/comments/:commentId'
          element={<Comment />}
          loader={() => getComment()}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts/1/comments/1'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
    });
    test('display comment detail component', async () => {
      expect(
        await screen.findByRole('heading', { name: /testpost1 - comment/i })
      ).toBeInTheDocument();
    });
    test('display comment form update', async () => {
      await user.click(await screen.findByRole('button', { name: /edit/i }));
      expect(
        await screen.findByRole('heading', { name: /edit comment/i })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    });
  });
});
