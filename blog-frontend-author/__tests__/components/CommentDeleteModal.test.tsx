import { render, screen } from '@testing-library/react';
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
  TPostDetail,
} from '../../src/types/types';
import userEvent from '@testing-library/user-event';

import Comments from '../../src/pages/Comments';
import Comment from '../../src/pages/Comment';

describe('commentDeleteModal tests', () => {
  const user = userEvent.setup();
  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: 'user1', username: 'testUser', email: 'test@gmail.com' },
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
    comments: [comment1],
  };
  function getPostWithComments() {
    return { post: postDetail };
  }
  function getComment() {
    return { comment: comment1 };
  }
  function deletePost() {
    postDetail.comments = [];
  }
  function mockActionSuccess() {
    deletePost();
    const response = 'comment deleted';
    return response;
  }
  beforeEach(async () => {
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
      initialEntries: ['/posts/1/comments/1'],
    });
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    const deleteButton = await screen.findByRole('button', { name: /delete/i });
    await user.click(deleteButton);
  });
  test('modalPrompt rendering', async () => {
    expect(
      screen.getByRole('button', {
        name: /confirm/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });
  test('cancel button closes the prompt', async () => {
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(
      screen.getByRole('heading', { name: 'testpost1 - Comment' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /confirm/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull();
  });
  test('confirm button deletes the comment and redirect to updated comments page', async () => {
    await user.click(screen.getByRole('button', { name: /confirm/i }));
    expect(
      await screen.findByRole('heading', { name: 'testpost1 - Comments' })
    ).toBeInTheDocument();
    expect(screen.queryByText('TestUser')).toBeNull();
    expect(screen.queryByText('test comment 1')).toBeNull();
    expect(
      screen.getByRole('heading', { name: 'There are no comments.' })
    ).toBeInTheDocument();
  });
});
