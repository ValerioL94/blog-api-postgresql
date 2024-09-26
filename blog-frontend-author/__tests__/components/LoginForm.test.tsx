import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Login from '../../src/pages/Login';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext, TAuthData } from '../../src/types/types';
import userEvent from '@testing-library/user-event';
import HomePage from '../../src/pages/HomePage';

describe('login form tests', () => {
  const user = userEvent.setup();

  const testAuthData: TAuthData = {
    token: 'ergf4trffd',
    user: {
      id: '123',
      username: 'testusername',
      email: 'testmail@gmail.com',
    },
  };
  function mockActionSuccess() {
    const response = testAuthData;
    return response;
  }
  function mockActionError() {
    const response = { errors: [{ message: 'error' }, { message: 'error2' }] };
    return response;
  }
  const setData = vi.fn((data) => {
    nullContext.authData = data;
  });
  const nullContext: TAuthContext = {
    authData: null,
    setAuthData: setData,
  };

  test('form rendering', async () => {
    const testRoutes = createRoutesFromElements(
      <Route path='login' element={<Login />} />
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/login'],
    });
    render(
      <AuthContext.Provider value={nullContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });
  describe('form interactions', () => {
    test('inputs are registered correctly', async () => {
      const testRoutes = createRoutesFromElements(
        <Route
          path='login'
          action={() => mockActionError()}
          element={<Login />}
        />
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/login'],
      });
      render(
        <AuthContext.Provider value={nullContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const resetButton = screen.getByRole('button', { name: /reset/i });

      // Every field is filled correctly
      await user.type(emailInput, 'aaa@aaa');
      expect(emailInput).toHaveValue('aaa@aaa');

      await user.type(passwordInput, 'aaaaa');
      expect(passwordInput).toHaveValue('aaaaa');

      // Show error list on submit button press
      await user.click(submitButton);
      expect(
        await screen.findByRole('list', { name: /errorlist/i })
      ).toBeInTheDocument();

      // Reset both error list and input fields on reset button press
      await user.click(resetButton);
      expect(screen.queryByRole('list', { name: /errorlist/i })).toBeNull();
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
    test('log user and redirect to homepage if input data is correct', async () => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route path='home' element={<HomePage />} />
          <Route
            path='login'
            action={() => mockActionSuccess()}
            element={<Login />}
          />
        </>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/login'],
      });
      render(
        <AuthContext.Provider value={nullContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await user.type(emailInput, 'testmail@gmail.com');
      await user.type(passwordInput, 'Testpassword123@');

      await user.click(submitButton);
      expect(
        await screen.findByRole('heading', { name: /homepage/i })
      ).toBeInTheDocument();

      expect(await screen.findByText('testusername')).toBeInTheDocument();
    });
  });
});
