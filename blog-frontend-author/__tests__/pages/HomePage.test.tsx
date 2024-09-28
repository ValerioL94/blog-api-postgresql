import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { routes } from '../../src/App';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AuthProvider from '../../src/provider/Provider';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext, TPostList } from '../../src/types/types';
import HomePage from '../../src/pages/HomePage';
import Posts from '../../src/pages/Posts';

describe('HomePage tests', () => {
  const user = userEvent.setup();
  describe('no auth rendering/navigating', async () => {
    beforeEach(() => {
      const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
      render(
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      );
    });
    test('welcome message display', async () => {
      expect(screen.getByText(/Welcome to the homepage/i)).toBeInTheDocument();
    });
    test('signup link', async () => {
      const signupLink = screen.getByRole('link', { name: /sign up/ });
      expect(signupLink).toBeInTheDocument();
      await user.click(signupLink);
      expect(screen.getByRole('heading', { name: /signup/i }));
    });
    test('login link', async () => {
      const loginLink = screen.getByRole('link', { name: /log in/i });
      expect(loginLink).toBeInTheDocument();
      await user.click(loginLink);
      expect(
        screen.getByRole('heading', { name: /login/i })
      ).toBeInTheDocument();
    });
  });
  describe('auth rendering/navigating', () => {
    const testContext: TAuthContext = {
      authData: {
        token: 'test',
        user: { id: 'test', username: 'testUser', email: 'test@gmail.com' },
      },
      setAuthData: () => {},
    };
    const noPosts: TPostList = [];
    function getPosts() {
      return { posts: noPosts };
    }
    beforeEach(() => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route path='home' element={<HomePage />} />
          <Route path='/posts' loader={() => getPosts()} element={<Posts />} />
        </>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/home'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
    });
    test('user authenticated message', () => {
      expect(screen.getByText(/testuser/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /post/ })).toBeInTheDocument();
    });
    test('posts link', async () => {
      const postsLink = screen.getByRole('link', { name: /post/i });
      expect(postsLink).toBeInTheDocument();
      await user.click(postsLink);
      expect(
        screen.getByRole('heading', { name: 'Posts' })
      ).toBeInTheDocument();
    });
  });
});
