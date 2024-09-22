import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { routes } from '../../src/App';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from '../../src/provider/Provider';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext } from '../../src/types/types';

describe('navbar links conditional rendering', () => {
  test('render Home, Signup, Login, About links if user is not authenticated', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /signup/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });
  test('render Home, Posts, Logout, About links if user is authenticated', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
    const testContext: TAuthContext = {
      authData: {
        token: 'test',
        user: { id: 'test', username: 'test', email: 'test@gmail.com' },
      },
      setAuthData: () => {},
    };
    render(
      <AuthContext.Provider value={testContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });
});
