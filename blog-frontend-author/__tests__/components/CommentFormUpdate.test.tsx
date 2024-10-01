import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  TAuthContext,
  TCommentDetail,
  TPostDetail,
} from '../../src/types/types';
import Comments from '../../src/pages/Comments';
import Comment from '../../src/pages/Comment';
import { AuthContext } from '../../src/provider/context';
import userEvent from '@testing-library/user-event';

describe('CommentFormUpdate tests', () => {
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
    updatedAt: new Date('2024-09-18T09:56:31.751Z'),
    postId: '1',
    post: {
      title: 'testpost1',
    },
  };
  const postDetail: TPostDetail = {
    id: '1',
    title: 'testpost1',
    content: 'test content 1',
    published: false,
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:59:31.751Z'),
    authorId: '123',
    author: {
      username: 'testUser',
      email: 'testemail@gmail.com',
    },
    comments: [comment1],
  };
  function getPostWithComments() {
    return { post: postDetail };
  }
  function getComment() {
    return { comment: comment1 };
  }
  function mockActionError() {
    const response = { errors: [{ message: 'error' }, { message: 'error2' }] };
    return response;
  }
  function mockActionSuccess() {
    comment1.username = 'TestUserEdited';
    comment1.content = 'test comment 1 edited';
    const response = 'Comment updated!';
    return response;
  }
  test('form rendering', async () => {
    const testRoutes = createRoutesFromElements(
      <>
        <Route
          path='/posts/:postId/comments'
          loader={() => getPostWithComments()}
          element={<Comments />}
        />
        <Route
          path='/posts/:postId/comments/:commentId'
          loader={() => getComment()}
          action={() => mockActionError()}
          element={<Comment />}
        />
      </>
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: [`/posts/1/comments/1`],
    });
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    await user.click(await screen.findByRole('button', { name: /edit/i }));
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
  });
  describe('form interactions', () => {
    test('inputs are registered correctly', async () => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route
            path='/posts/:postId/comments'
            loader={() => getPostWithComments()}
            element={<Comments />}
          />
          <Route
            path='/posts/:postId/comments/:commentId'
            loader={() => getComment()}
            action={() => mockActionError()}
            element={<Comment />}
          />
        </>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/posts/1/comments/1`],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      const editButton = await screen.findByRole('button', { name: /edit/i });
      await user.click(editButton);
      const usernameInput = screen.getByLabelText(/username/i);
      const commentInput = screen.getByLabelText(/comment/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const cancelButton = screen.getByRole('button', { name: /cancel/i });

      await user.type(usernameInput, 'Edited');
      expect(usernameInput).toHaveValue('TestUserEdited');
      await user.type(commentInput, ' edited');
      expect(commentInput).toHaveValue('test comment 1 edited');

      // Show error list on submit button press
      await user.click(submitButton);
      expect(
        await screen.findByRole('list', { name: /errorlist/i })
      ).toBeInTheDocument();

      // Back to comment detail page on cancel button press
      await user.click(cancelButton);
      expect(
        await screen.findByRole('heading', { name: 'testpost1 - Comment' })
      ).toBeInTheDocument();

      // errorlist is empty again
      await user.click(editButton);
      expect(screen.queryByRole('list', { name: /errorlist/i })).toBeNull();
    });
    test('update comment and show the updated preview', async () => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route
            path='/posts/:postId/comments'
            loader={() => getPostWithComments()}
            element={<Comments />}
          />
          <Route
            path='/posts/:postId/comments/:commentId'
            loader={() => getComment()}
            action={() => mockActionSuccess()}
            element={<Comment />}
          />
        </>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/posts/1/comments/1`],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      await user.click(await screen.findByRole('button', { name: /edit/i }));
      const usernameInput = screen.getByLabelText(/username/i);
      const commentInput = screen.getByLabelText(/comment/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await user.type(usernameInput, 'Edited');
      expect(usernameInput).toHaveValue('TestUserEdited');
      await user.type(commentInput, ' edited');
      expect(commentInput).toHaveValue('test comment 1 edited');
      await user.click(submitButton);

      expect(screen.getByRole('heading', { name: 'testpost1 - Comments' }));
      expect(screen.getByText('TestUserEdited')).toBeInTheDocument();
      expect(screen.getByText('test comment 1 edited')).toBeInTheDocument();
    });
  });
});
