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
  TPostDetail,
} from '../../src/types/types';
import Comment from '../../src/pages/Comment';
import Comments from '../../src/pages/Comments';
import userEvent from '@testing-library/user-event';

describe('commentPreview tests', () => {
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
  beforeEach(() => {
    const testRoutes = createRoutesFromElements(
      <>
        <Route
          path={`/posts/:postId/comments`}
          loader={() => getPostWithComments()}
          element={<Comments />}
        />
        <Route
          path='/posts/:postId/comments/:commentId'
          loader={() => getComment()}
          element={<Comment />}
        />
      </>
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
  test('comment preview renders correctly', async () => {
    expect(await screen.findByText('TestUser')).toBeInTheDocument();
    expect(await screen.findByText('test comment 1')).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: /manage comment/i })
    ).toBeInTheDocument();
  });
  test('navigate to post detail page', async () => {
    const postLink = await screen.findByRole('link', {
      name: /manage comment/i,
    });
    await user.click(postLink);
    expect(
      await screen.findByRole('heading', { name: 'testpost1 - Comment' })
    ).toBeInTheDocument();
  });
});
