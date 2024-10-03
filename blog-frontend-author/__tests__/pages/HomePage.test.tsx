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
import { TAuthContext } from '../../src/types/types';
import HomePage from '../../src/pages/HomePage';

describe('HomePage tests', () => {
  const user = userEvent.setup();
  describe('no auth rendering/navigating', async () => {
    test('welcome message display', async () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
      render(
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      );
      const homeLink = await screen.findByRole('link', { name: /home/i });
      await user.click(homeLink);
      expect(screen.getByText(/Welcome to the homepage/i)).toBeInTheDocument();
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
    test('user authenticated message', () => {
      const testRoutes = createRoutesFromElements(
        <Route path='home' element={<HomePage />} />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/home'],
      });
      render(
        <AuthContext.Provider value={testContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    });
  });
});
