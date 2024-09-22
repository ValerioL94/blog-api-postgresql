import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { routes } from '../../src/App';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import AuthProvider from '../../src/provider/Provider';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext } from '../../src/types/types';

describe('signup conditional rendering', () => {
  const router = createMemoryRouter(routes, { initialEntries: ['/logout'] });
  test('render logout page if user is logged in, log him out and redirect to homepage', async () => {
    const testContext: TAuthContext = {
      authData: {
        token: 'test',
        user: { id: 'test', username: 'testUser', email: 'test@gmail.com' },
      },
      setAuthData: () => null,
    };
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    expect(
      screen.getByRole('heading', { name: /logging out/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole(
        'heading',
        { name: /homepage/i },
        { timeout: 3000 }
      )
    ).toBeInTheDocument();
  });
  test('render homepage if user is not logged in', () => {
    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
    expect(
      screen.getByRole('heading', { name: /homepage/i })
    ).toBeInTheDocument();
  });
});
