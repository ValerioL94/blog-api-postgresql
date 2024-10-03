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
import Posts from '../../src/pages/Posts';
import HomePage from '../../src/pages/HomePage';
import About from '../../src/pages/About';
import Logout from '../../src/pages/Logout';
import ErrorPage from '../../src/pages/ErrorPage';
import GlobalLayout from '../../src/components/GlobalLayout';

describe('navbar component tests', () => {
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
    test('navbar links count', () => {
      const navLink = screen.getByRole('list');
      expect(navLink).toBeInTheDocument();
      expect(navLink.childElementCount).toEqual(4);
    });
    test('home link rendering/navigating', async () => {
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      await user.click(homeLink);
      expect(
        screen.getByRole('heading', { name: /homepage/i })
      ).toBeInTheDocument();
    });
    test('signup link rendering/navigating', async () => {
      const signupLink = screen.getByRole('link', { name: /signup/i });
      expect(signupLink).toBeInTheDocument();
      await user.click(signupLink);
      expect(
        screen.getByRole('heading', { name: /signup/i })
      ).toBeInTheDocument();
    });
    test('login link rendering/navigating', async () => {
      const loginLink = screen.getByRole('link', { name: /login/i });
      expect(loginLink).toBeInTheDocument();
      await user.click(loginLink);
      expect(
        screen.getByRole('heading', { name: /login/i })
      ).toBeInTheDocument();
    });
    test('about link rendering/navigating', async () => {
      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
      await user.click(aboutLink);
      expect(
        screen.getByRole('heading', { name: /about/i })
      ).toBeInTheDocument();
    });
  });
  describe('auth rendering/navigating', () => {
    const testContext: TAuthContext = {
      authData: {
        token: 'test',
        user: { id: '123', username: 'testuser', email: 'testuser@gmail.com' },
      },
      setAuthData: () => {},
    };
    const noPosts: TPostList = [];
    const testRoutes = createRoutesFromElements(
      <Route path='/' errorElement={<ErrorPage />} element={<GlobalLayout />}>
        <Route path='home' element={<HomePage />} />
        <Route
          path='/posts'
          loader={() => {
            return { posts: noPosts };
          }}
          element={<Posts />}
        />
        <Route path='logout' element={<Logout />} />
        <Route path='about' element={<About />} />
      </Route>
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
    test('navbar links count', () => {
      const navLink = screen.getByRole('list');
      expect(navLink).toBeInTheDocument();
      expect(navLink.childElementCount).toEqual(4);
    });
    test('home link rendering/navigating', async () => {
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      await user.click(homeLink);
      expect(
        screen.getByRole('heading', { name: /homepage/i })
      ).toBeInTheDocument();
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });
    test('posts link rendering/navigating', async () => {
      const postsLink = screen.getByRole('link', { name: /posts/i });
      expect(postsLink).toBeInTheDocument();
      await user.click(postsLink);
      expect(
        screen.getByRole('heading', { name: /Posts/ })
      ).toBeInTheDocument();
    });
    test('logout link rendering/navigating', async () => {
      const logoutLink = screen.getByRole('link', { name: /logout/i });
      expect(logoutLink).toBeInTheDocument();
      await user.click(logoutLink);
      expect(
        screen.getByRole('heading', { name: /logging out/i })
      ).toBeInTheDocument();
    });
    test('about link rendering/navigating', async () => {
      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
      await user.click(aboutLink);
      expect(
        screen.getByRole('heading', { name: /about/i })
      ).toBeInTheDocument();
    });
  });
});
