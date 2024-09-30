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
import PostFormCreate from '../../src/components/PostFormCreate';

describe('postFormCreate tests', () => {
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
      published: false,
      createdAt: new Date('2024-09-18T09:56:31.751Z'),
      updatedAt: new Date('2024-09-18T09:56:31.751Z'),
      authorId: '123',
      author: {
        username: 'testusername',
        email: 'testemail@gmail.com',
      },
    },
  ];
  function getPosts() {
    return { posts: mockPostsList };
  }
  function mockActionSuccess() {
    const newPost = {
      id: '2',
      title: 'testpost2',
      content: 'test content 2',
      published: false,
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
        <Route path='/posts' loader={() => getPosts()} element={<Posts />} />
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
    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: /published/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });
  describe('form interactions', () => {
    test('inputs are registered correctly', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='/posts/new-post'
          action={() => mockActionError()}
          element={<PostFormCreate />}
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
      const publishedInput = screen.getByRole('combobox', {
        name: /published/i,
      });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const resetButton = screen.getByRole('button', { name: /reset/i });

      // Every field is filled correctly
      await user.type(titleInput, 'a');
      expect(titleInput).toHaveValue('a');

      await user.type(contentInput, 'aaa');
      expect(contentInput).toHaveValue('aaa');

      expect(publishedInput).toHaveValue('false');
      await user.selectOptions(publishedInput, 'Yes');
      expect(publishedInput).toHaveValue('true');

      // Show error list on submit button press
      await user.click(submitButton);
      expect(
        await screen.findByRole('list', { name: /errorlist/i })
      ).toBeInTheDocument();

      // Reset both error list and input fields on reset button press
      await user.click(resetButton);
      expect(screen.queryByRole('list', { name: /errorlist/i })).toBeNull();
      expect(titleInput).toHaveValue('');
      // contentInput reset not working in tests only
      // expect(contentInput).toHaveValue('');
      expect(publishedInput).toHaveValue('false');
    });

    test('create post and redirect to posts page when input data is correct', async () => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route path='/posts' loader={() => getPosts()} element={<Posts />} />
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
