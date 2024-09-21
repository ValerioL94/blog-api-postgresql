import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { routes } from '../../src/App';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import AuthProvider from '../../src/provider/Provider';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext } from '../../src/types/types';

describe('login conditional rendering', () => {
  const router = createMemoryRouter(routes, { initialEntries: ['/login'] });
  test('render login page if user is not logged in already', () => {
    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
  test('render homepage if user is logged in already', () => {
    const testContext: TAuthContext = {
      authData: {
        token: 'test',
        user: { id: 'test', username: 'testUser', email: 'test@gmail.com' },
      },
      setAuthData: () => {},
    };
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    expect(
      screen.getByRole('heading', { name: /homepage/i })
    ).toBeInTheDocument();
  });
});
