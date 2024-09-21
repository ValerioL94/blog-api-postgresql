import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { routes } from '../../src/App';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import AuthProvider from '../../src/provider/Provider';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext } from '../../src/types/types';

describe('navbar rendering/navigating', () => {
  describe('no authentication tests', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
    const user = userEvent.setup();
    beforeEach(() => {
      render(
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      );
    });
    test('render Home, Signup, Login, About links if user is not authenticated', () => {
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /signup/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });
    test('no auth pages navigation', async () => {
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
  describe('auth only testing', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
    const user = userEvent.setup();
    const testContext: TAuthContext = {
      authData: {
        token: 'test',
        user: { id: 'test', username: 'test', email: 'test@gmail.com' },
      },
      setAuthData: () => {},
    };
    beforeEach(() => {
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
    });
    test('render Home, Posts, Logout, About links if user is authenticated', () => {
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });
    // test('auth pages navigation', async () => {
    //   await user.click(screen.getByRole('link', { name: /posts/i }));
    //   expect(
    //     screen.getByRole('heading', { name: /posts/i })
    //   ).toBeInTheDocument();

    //   await user.click(screen.getByRole('link', { name: /logout/i }));
    //   expect(
    //     await screen.findByRole('heading', { name: /homepage/i })
    //   ).toBeInTheDocument();
    // });
  });
});
