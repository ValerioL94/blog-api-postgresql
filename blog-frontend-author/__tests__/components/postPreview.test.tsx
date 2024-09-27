import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { AuthContext } from '../../src/provider/context';
import { TAuthContext, TPostDetail, TPostList } from '../../src/types/types';
import Posts from '../../src/pages/Posts';
import Post from '../../src/pages/Post';

describe('postPreview tests', () => {
  const user = userEvent.setup();
  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: 'test', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
  };
  const testPosts: TPostList = [
    {
      id: '1',
      title: 'testpost1',
      content: 'test content 1',
      published: false,
      createdAt: new Date('2024-09-18T09:56:31.751Z'),
      updatedAt: new Date('2024-09-18T09:59:31.751Z'),
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
    comments: [],
  };
  function getPost() {
    return { post: postDetail };
  }
  beforeEach(() => {
    const testRoutes = createRoutesFromElements(
      <>
        <Route path='/posts' loader={() => getPosts()} element={<Posts />} />
        <Route
          path='/posts/:postId'
          element={<Post />}
          loader={() => getPost()}
        />
      </>
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/posts'],
    });
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
  });
  test('post preview renders correctly', async () => {
    expect(
      await screen.findByRole('heading', { name: 'testpost1' })
    ).toBeInTheDocument();
    expect(screen.getByText('testusername')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('9/18/2024, 11:56:31 AM')).toBeInTheDocument();
    expect(screen.getByText('9/18/2024, 11:59:31 AM')).toBeInTheDocument();
  });
  test('navigate to specified post page', async () => {
    const postLink = await screen.findByRole('link', { name: 'testpost1' });
    await user.click(postLink);
    expect(
      screen.getByRole('heading', { name: 'testpost1' })
    ).toBeInTheDocument();
  });
});
