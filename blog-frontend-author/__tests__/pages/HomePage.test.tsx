import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { routes } from '../../src/App';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import AuthProvider from '../../src/provider/Provider';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext, TPostList } from '../../src/types/types';
import userEvent from '@testing-library/user-event';
import HomePage from '../../src/pages/HomePage';
import Posts from '../../src/pages/Posts';

describe('HomePage tests', () => {
  const user = userEvent.setup();
  describe('no auth rendering/navigating', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
    beforeEach(() => {
      render(
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      );
    });
    test('display welcome message', () => {
      expect(screen.getByText(/Welcome to the homepage/i)).toBeInTheDocument();
    });
    test('signup link', async () => {
      const signupLink = screen.getByRole('link', { name: /signup/i });
      expect(signupLink).toBeInTheDocument();
      await user.click(signupLink);
      expect(
        await screen.findByRole('heading', { name: /signup/i })
      ).toBeInTheDocument();
    });
    test('login link', async () => {
      const loginLink = screen.getByRole('link', { name: /login/i });
      expect(loginLink).toBeInTheDocument();
      await user.click(loginLink);
      expect(
        await screen.findByRole('heading', { name: /login/i })
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
    function getNoPosts() {
      return { posts: noPosts };
    }
    const testRoutes = createRoutesFromElements(
      <>
        <Route path='/home' element={<HomePage />} />
        <Route path='/posts' element={<Posts />} loader={() => getNoPosts()} />
      </>
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/home'],
    });
    beforeEach(() => {
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
    });
    test('display authenticated user message', () => {
      expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    });
    test('posts link', async () => {
      const postsLink = screen.getByRole('link', { name: /post/i });
      expect(postsLink).toBeInTheDocument();
      await user.click(postsLink);
      expect(
        await screen.findByRole('heading', { name: 'Posts' })
      ).toBeInTheDocument();
    });
  });
});
