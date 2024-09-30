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
  TCommentList,
} from '../../src/types/types';
import Comments from '../../src/pages/Comments';
import { AuthContext } from '../../src/provider/context';
import userEvent from '@testing-library/user-event';

describe('CommentFormCreate tests', () => {
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
  const commentList: TCommentList = [comment1];
  function getComments() {
    return { comments: commentList };
  }
  function mockActionError() {
    const response = { errors: [{ message: 'error' }, { message: 'error2' }] };
    return response;
  }
  function mockActionSuccess() {
    const comment2: TCommentDetail = {
      id: '2',
      username: 'TestUser',
      content: 'test comment 2',
      createdAt: new Date('2024-09-18T09:58:31.751Z'),
      updatedAt: new Date('2024-09-18T09:58:31.751Z'),
      postId: '1',
      post: {
        title: 'testpost1',
      },
    };
    commentList.push(comment2);
    const response = 'Comment created!';
    return response;
  }
  test('form rendering', async () => {
    const testRoutes = createRoutesFromElements(
      <Route
        path={`/posts/1/comments`}
        loader={() => getComments()}
        action={() => mockActionError()}
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
    expect(await screen.findByLabelText(/username/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/comment/i)).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /submit/i })
    ).toBeInTheDocument();
  });
  describe('form interactions', () => {
    test('inputs are registered correctly', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path={`/posts/1/comments`}
          loader={() => getComments()}
          action={() => mockActionError()}
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
      const usernameInput = await screen.findByLabelText(/username/i);
      const contentInput = await screen.findByLabelText(/comment/i);
      const submitButton = await screen.findByRole('button', {
        name: /submit/i,
      });

      expect(usernameInput).toHaveValue('testUser');

      await user.type(contentInput, 'a');
      expect(contentInput).toHaveValue('a');

      await user.click(submitButton);
      expect(
        await screen.findByRole('list', { name: /errorlist/i })
      ).toBeInTheDocument();
    });
    test('create comment and display the updated comment list', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path={`/posts/1/comments`}
          loader={() => getComments()}
          action={() => mockActionSuccess()}
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
      await user.type(
        await screen.findByLabelText(/comment/i),
        'test comment 2'
      );

      await user.click(await screen.findByRole('button', { name: /submit/i }));

      expect(await screen.findAllByText('TestUser')).toHaveLength(2);
      expect(await screen.findByText('test comment 2')).toBeInTheDocument();
    });
  });
});
