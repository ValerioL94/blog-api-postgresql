import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Comment from '../../src/pages/Comment';
import userEvent from '@testing-library/user-event';
import { TAuthContext, TCommentDetail } from '../../src/types/types';
import { AuthContext } from '../../src/provider/context';

describe('commentDetail tests', () => {
  const user = userEvent.setup();
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
  function getComment() {
    return { comment: comment1 };
  }
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
  test('content rendering', async () => {
    expect(
      await screen.findByRole('heading', { name: 'testpost1 - Comment' })
    ).toBeInTheDocument();
    expect(screen.getByText('TestUser'));
    expect(screen.getByText('test comment 1'));
    expect(screen.getByText('9/18/2024, 11:56:31 AM'));
    expect(screen.getByText('9/18/2024, 11:58:31 AM'));
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
  test('edit button renders edit form', async () => {
    await user.click(await screen.findByRole('button', { name: /edit/i }));
    expect(
      screen.getByRole('heading', { name: /edit comment/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
  });
  test('delete button renders delete modal component', async () => {
    await user.click(await screen.findByRole('button', { name: /delete/i }));
    expect(
      screen.getByText(/Delete this post and all its comments?/i)
    ).toBeInTheDocument();
  });
});
