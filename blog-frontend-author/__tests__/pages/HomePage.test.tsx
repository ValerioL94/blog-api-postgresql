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
import { TAuthContext } from '../../src/types/types';
import HomePage from '../../src/pages/HomePage';

describe('HomePage tests', () => {
  describe('no auth content rendering', async () => {
    test('display welcome message', async () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
      render(
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      );
      expect(screen.getByText(/Welcome to the homepage/i)).toBeInTheDocument();
    });
  });
  describe('auth content rendering', () => {
    const testContext: TAuthContext = {
      authData: {
        token: 'test',
        user: { id: 'test', username: 'testUser', email: 'test@gmail.com' },
      },
      setAuthData: () => {},
    };
    test('display authenticated user message', () => {
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
