import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { routes } from '../../src/App';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import AuthProvider from '../../src/provider/Provider';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext } from '../../src/types/types';

describe('homepage conditional rendering', () => {
  const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
  test('user not authenticated welcome message', () => {
    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
    expect(
      screen.getByText(
        'Welcome to the homepage! On this site registered authors can manage both posts and comments.'
      )
    ).toBeInTheDocument();
  });
  test('user authenticated message', () => {
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
    expect(screen.getByText('testUser')).toBeInTheDocument();
  });
});
