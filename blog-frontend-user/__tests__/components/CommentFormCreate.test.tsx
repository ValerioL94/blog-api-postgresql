import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { TCommentDetail, TPostDetail } from '../../src/types/types';
import userEvent from '@testing-library/user-event';
import Post from '../../src/pages/Post';

describe('CommentFormCreate tests', () => {
  const user = userEvent.setup();
  const comment1: TCommentDetail = {
    id: '1',
    username: 'test user 1',
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
      username: 'TestUser',
      email: 'testemail@gmail.com',
    },
    comments: [comment1],
  };
  function getPostWithComments() {
    return { post: postDetail };
  }
  function mockActionError() {
    const response = { errors: [{ message: 'error' }, { message: 'error2' }] };
    return response;
  }
  function mockActionSuccess() {
    const comment2: TCommentDetail = {
      id: '2',
      username: 'test user 2',
      content: 'test comment 2',
      createdAt: new Date('2024-09-18T09:58:31.751Z'),
      updatedAt: new Date('2024-09-18T09:58:31.751Z'),
      postId: '1',
      post: {
        title: 'testpost1',
      },
    };
    postDetail.comments = [comment1, comment2];
    const response = 'Comment created!';
    return response;
  }
  test('form rendering', async () => {
    const testRoutes = createRoutesFromElements(
      <Route
        path={`/posts/:postId`}
        loader={() => getPostWithComments()}
        action={() => mockActionError()}
        element={<Post />}
      />
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: [`/posts/1`],
    });
    render(<RouterProvider router={router} />);
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
          path={`/posts/:postId`}
          loader={() => getPostWithComments()}
          action={() => mockActionError()}
          element={<Post />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/posts/1`],
      });
      render(<RouterProvider router={router} />);
      const usernameInput = await screen.findByLabelText(/username/i);
      const contentInput = await screen.findByLabelText(/comment/i);
      const submitButton = await screen.findByRole('button', {
        name: /submit/i,
      });
      await user.type(usernameInput, 'a');
      expect(usernameInput).toHaveValue('a');

      await user.type(contentInput, 'aa');
      expect(contentInput).toHaveValue('aa');

      await user.click(submitButton);
      expect(
        await screen.findByRole('list', { name: /errorlist/i })
      ).toBeInTheDocument();
    });
    test('create comment and display the updated comment list', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path={`/posts/1`}
          loader={() => getPostWithComments()}
          action={() => mockActionSuccess()}
          element={<Post />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/posts/1`],
      });
      render(<RouterProvider router={router} />);
      await user.type(await screen.findByLabelText(/username/i), 'test user 2');
      await user.type(
        await screen.findByLabelText(/comment/i),
        'test comment 2'
      );

      await user.click(await screen.findByRole('button', { name: /submit/i }));

      expect(await screen.findByText('test user 2')).toBeInTheDocument();
      expect(await screen.findByText('test comment 2')).toBeInTheDocument();
    });
  });
});
