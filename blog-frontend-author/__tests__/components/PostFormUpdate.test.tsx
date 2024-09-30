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

describe('postFormUpdate tests', () => {
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
  const mockPostsList: TPostList = [postDetail];
  function getPosts() {
    return { posts: mockPostsList };
  }

  function getPost() {
    return { post: postDetail };
  }
  function updatePost() {
    postDetail.title = 'testpost1edited';
    postDetail.content = 'edited content 1';
    postDetail.published = true;
  }
  function mockActionSuccess() {
    updatePost();
    const response = 'post updated';
    return response;
  }
  function mockActionError() {
    const response = { errors: [{ message: 'error' }, { message: 'error2' }] };
    return response;
  }

  test('form rendering', async () => {
    const testRoutes = createRoutesFromElements(
      <Route
        path='posts/:postId'
        element={<Post />}
        loader={() => getPost()}
        action={() => mockActionError()}
      />
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/posts/1'],
    });
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );

    await user.click(await screen.findByRole('button', { name: /edit/i }));

    expect(screen.getByRole('textbox', { name: /title/i })).toHaveValue(
      'testpost1'
    );
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /published/i })).toHaveValue(
      'false'
    );
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });
  describe('form interactions', () => {
    test('inputs are registered correctly', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='posts/:postId'
          element={<Post />}
          loader={() => getPost()}
          action={() => mockActionError()}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts/1'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );

      await user.click(await screen.findByRole('button', { name: /edit/i }));

      const titleInput = screen.getByRole('textbox', { name: /title/i });
      const contentInput = screen.getByLabelText(/content/i);
      const publishedInput = screen.getByRole('combobox', {
        name: /published/i,
      });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const cancelButton = screen.getByRole('button', { name: /cancel/i });

      // Every field is filled correctly
      await user.type(titleInput, 'edited');
      expect(titleInput).toHaveValue('testpost1edited');

      await user.type(contentInput, 'edited');
      expect(contentInput).toHaveValue('edited');

      await user.selectOptions(publishedInput, 'Yes');
      expect(publishedInput).toHaveValue('true');

      // Show error list on submit button press
      await user.click(submitButton);
      expect(
        await screen.findByRole('list', { name: /errorlist/i })
      ).toBeInTheDocument();

      // Back to post detail screen on cancel button press
      await user.click(cancelButton);
      expect(
        await screen.findByRole('heading', { name: 'testpost1' })
      ).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /edit/i }));
      expect(screen.queryByRole('list', { name: /errorlist/i })).toBeNull();
    });

    test('update post and show the updated preview', async () => {
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

      await user.click(await screen.findByRole('button', { name: /edit/i }));

      const titleInput = screen.getByRole('textbox', { name: /title/i });
      const contentInput = screen.getByLabelText(/content/i);
      const publishedInput = screen.getByRole('combobox', {
        name: /published/i,
      });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await user.type(titleInput, 'edited');
      await user.type(contentInput, 'edited content 1');
      await user.selectOptions(publishedInput, 'Yes');
      await user.click(submitButton);

      expect(
        await screen.findByRole('heading', { name: 'testpost1edited' })
      ).toBeInTheDocument();
      expect(screen.getByText('Yes')).toBeInTheDocument();
    });
  });
});
