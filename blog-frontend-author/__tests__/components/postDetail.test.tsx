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
import { TAuthContext, TPostDetail } from '../../src/types/types';
import Post from '../../src/pages/Post';

describe('postDetail tests', () => {
  const user = userEvent.setup();
  const testContext: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: '123', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
  };
  const testContext2: TAuthContext = {
    authData: {
      token: 'test',
      user: { id: '456', username: 'testUser', email: 'test@gmail.com' },
    },
    setAuthData: () => {},
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
    comments: [],
  };

  function getPost() {
    return { post: postDetail };
  }
  describe('logged user matches post author', () => {
    beforeEach(() => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route
            path='/posts/:postId'
            element={<Post />}
            loader={() => getPost()}
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
    });
    test('post detail renders correctly', async () => {
      expect(
        await screen.findByRole('heading', { name: 'testpost1' })
      ).toBeInTheDocument();
      expect(screen.getByText('testUser')).toBeInTheDocument();
      expect(screen.getByText('test content 1')).toBeInTheDocument();
      expect(screen.getByText('No')).toBeInTheDocument();
      expect(screen.getByText('9/18/2024, 11:56:31 AM')).toBeInTheDocument();
      expect(screen.getByText('9/18/2024, 11:59:31 AM')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /delete/i })).toBeEnabled();
      expect(screen.getByRole('button', { name: /top/i })).toBeEnabled();
    });
    test('edit button is enabled and renders edit post form', async () => {
      await user.click(await screen.findByRole('button', { name: /edit/i }));
      expect(
        screen.getByRole('heading', { name: /edit post/i })
      ).toBeInTheDocument();
    });
    test('delete button is enabled and renders delete prompt', async () => {
      await user.click(await screen.findByRole('button', { name: /delete/i }));
      expect(
        screen.getByRole('button', { name: /confirm/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /cancel/i })
      ).toBeInTheDocument();
    });
  });
  describe('logged user does not match post author', () => {
    test('edit and delete buttons are disabled', async () => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route
            path='/posts/:postId'
            element={<Post />}
            loader={() => getPost()}
          />
        </>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/posts/1'],
      });
      render(
        <AuthContext.Provider value={testContext2}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      expect(
        await screen.findByRole('button', { name: /edit/i })
      ).toBeDisabled();
      expect(
        await screen.findByRole('button', { name: /delete/i })
      ).toBeDisabled();
    });
  });
});
