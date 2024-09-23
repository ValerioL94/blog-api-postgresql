import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext, TPostList } from '../../src/types/types';
import userEvent from '@testing-library/user-event';
import Posts from '../../src/pages/Posts';
import NewPost from '../../src/pages/NewPost';
import PostForm from '../../src/components/PostForm';

describe('postForm tests', () => {
  const user = userEvent.setup();

  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: 'test', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
  };
  const mockPostsList: TPostList = [
    {
      id: '1',
      title: 'testpost1',
      content: 'test content 1',
      published: 'false',
      createdAt: new Date('2024-09-18T09:56:31.751Z'),
      updatedAt: new Date('2024-09-18T09:56:31.751Z'),
      authorId: '123',
      author: {
        username: 'testusername',
        email: 'testemail@gmail.com',
      },
    },
  ];
  function getPosts(postsList: TPostList) {
    return { posts: postsList };
  }
  function mockActionSuccess() {
    const newPost = {
      id: '2',
      title: 'testpost2',
      content: 'test content 2',
      published: 'true',
      createdAt: new Date('2024-09-18T09:56:31.751Z'),
      updatedAt: new Date('2024-09-18T09:56:31.751Z'),
      authorId: '123',
      author: {
        username: 'testusername',
        email: 'testemail@gmail.com',
      },
    };
    mockPostsList.push(newPost);
    const response = 'post created';
    return response;
  }
  function mockActionError() {
    const response = { errors: [{ message: 'error' }, { message: 'error2' }] };
    return response;
  }

  test('form rendering', async () => {
    const testRoutes = createRoutesFromElements(
      <>
        <Route
          path='/posts'
          loader={() => getPosts(mockPostsList)}
          element={<Posts />}
        />
        <Route
          path='/posts/new-post'
          element={<NewPost />}
          action={() => mockActionError()}
        />
      </>
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/posts/new-post'],
    });
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const contentInput = screen.getByLabelText(/content/i);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(titleInput).toBeInTheDocument();
    expect(contentInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  describe('form interactions', () => {
    test('show error list when input data is wrong', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='/posts/new-post'
          action={() => mockActionError()}
          element={<PostForm />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts/new-post'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      const titleInput = screen.getByRole('textbox', { name: /title/i });
      const contentInput = screen.getByLabelText(/content/i);

      const submitButton = screen.getByRole('button', { name: /submit/i });

      await user.type(titleInput, 'a');
      await user.type(contentInput, 'a');
      await user.click(submitButton);

      expect(
        await screen.findByRole('list', { name: /errorlist/i })
      ).toBeInTheDocument();
    });
    test('create post and redirect to posts page when input data is correct', async () => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route
            path='/posts'
            loader={() => getPosts(mockPostsList)}
            element={<Posts />}
          />
          <Route
            path='/posts/new-post'
            element={<NewPost />}
            action={() => mockActionSuccess()}
          />
        </>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts/new-post'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      const titleInput = screen.getByRole('textbox', { name: /title/i });
      const contentInput = screen.getByLabelText(/content/i);

      const submitButton = screen.getByRole('button', { name: /submit/i });

      await user.type(titleInput, 'testpost2');
      await user.type(contentInput, 'test content 2');
      await user.click(submitButton);

      expect(
        await screen.findByRole('heading', { name: 'Posts' })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('heading', { name: 'testpost2' })
      ).toBeInTheDocument();
    });
  });
});
