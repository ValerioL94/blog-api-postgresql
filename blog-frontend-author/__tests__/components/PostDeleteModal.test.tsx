import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext, TPostDetail, TPostList } from '../../src/types/types';
import userEvent from '@testing-library/user-event';
import Post from '../../src/pages/Post';
import Posts from '../../src/pages/Posts';

describe('postDeleteModal tests', () => {
  const user = userEvent.setup();
  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: 'user1', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
  };
  const postDetail: TPostDetail = {
    id: '1',
    title: 'testpost1',
    content: 'test content 1',
    published: false,
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:56:31.751Z'),
    authorId: 'user1',
    author: {
      username: 'testusername',
      email: 'testemail@gmail.com',
    },
    comments: [],
  };
  const postsList: TPostList = [postDetail];
  function getPosts() {
    return { posts: postsList };
  }

  function getPost() {
    return { post: postDetail };
  }
  function deletePost() {
    postsList.shift();
  }
  function mockActionSuccess() {
    deletePost();
    const response = 'post deleted';
    return response;
  }
  beforeEach(async () => {
    const testRoutes = createRoutesFromElements(
      <>
        <Route path='/posts' loader={() => getPosts()} element={<Posts />} />
        <Route
          path='posts/:postId'
          element={<Post />}
          loader={() => getPost()}
          action={() => mockActionSuccess()}
        />
      </>
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/posts/1'],
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
      screen.getByRole('heading', { name: 'testpost1' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /confirm/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull();
  });
  test('confirm button deletes the post and redirect to updated posts page', async () => {
    await user.click(screen.getByRole('button', { name: /confirm/i }));

    expect(
      await screen.findByRole('heading', { name: 'Posts' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'testpost1' })).toBeNull();
    expect(screen.getByText('There are no posts.')).toBeDefined();
  });
});
