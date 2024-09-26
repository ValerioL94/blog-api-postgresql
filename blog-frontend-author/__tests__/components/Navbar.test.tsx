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
    test('render Home, Signup, Login, About links', () => {
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /signup/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });
    test('navigate to Home, Signup, Login, About pages', async () => {
      await user.click(screen.getByRole('link', { name: /home/i }));
      expect(
        screen.getByRole('heading', { name: /homepage/i })
      ).toBeInTheDocument();
      await user.click(screen.getByRole('link', { name: /signup/i }));
      expect(
        screen.getByRole('heading', { name: /signup/i })
      ).toBeInTheDocument();
      await user.click(screen.getByRole('link', { name: /login/i }));
      expect(
        screen.getByRole('heading', { name: /login/i })
      ).toBeInTheDocument();
      await user.click(screen.getByRole('link', { name: /about/i }));
      expect(
        screen.getByRole('heading', { name: /about/i })
      ).toBeInTheDocument();
    });
  });
  describe('auth rendering/navigating', () => {
    const testContext: TAuthContext = {
      authData: {
        token: 'test',
        user: { id: 'test', username: 'test', email: 'test@gmail.com' },
      },
      setAuthData: () => {},
    };
    const noPosts: TPostList = [];
    const testRoutes = createRoutesFromElements(
      <Route path='/' errorElement={<ErrorPage />} element={<GlobalLayout />}>
        <Route path='home' element={<HomePage />} />
        <Route path='about' element={<About />} />
        <Route path='logout' element={<Logout />} />
        <Route
          path='/posts'
          loader={() => {
            return { posts: noPosts };
          }}
          element={<Posts />}
        />
      </Route>
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/'],
    });
    beforeEach(() => {
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
    });
    test('render Home, Posts, Logout, About links', () => {
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });
    test('navigate to Home, Posts, Logout, About pages', async () => {
      await user.click(screen.getByRole('link', { name: /home/i }));
      expect(
        screen.getByRole('heading', { name: /homepage/i })
      ).toBeInTheDocument();
      await user.click(screen.getByRole('link', { name: /posts/i }));
      expect(
        screen.getByRole('heading', { name: /Posts/ })
      ).toBeInTheDocument();
      await user.click(screen.getByRole('link', { name: /logout/i }));
      expect(
        screen.getByRole('heading', { name: /logging out/i })
      ).toBeInTheDocument();
      await user.click(screen.getByRole('link', { name: /about/i }));
      expect(
        screen.getByRole('heading', { name: /about/i })
      ).toBeInTheDocument();
    });
  });
});
