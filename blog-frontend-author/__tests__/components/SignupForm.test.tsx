import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Signup from '../../src/pages/Signup';
import Login from '../../src/pages/Login';
import { AuthContext } from '../../src/provider/context';
import { TAuthContext } from '../../src/types/types';
import userEvent from '@testing-library/user-event';

describe('signup form tests', () => {
  const user = userEvent.setup();
  const nullContext: TAuthContext = {
    authData: null,
    setAuthData: () => null,
  };
  function mockActionError() {
    const response = { errors: [{ message: 'error' }, { message: 'error2' }] };
    return response;
  }
  function mockActionSuccess() {
    const response = { message: 'Signup successful' };
    return response;
  }
  test('form rendering', async () => {
    const testRoutes = createRoutesFromElements(
      <>
        <Route
          path='signup'
          action={() => mockActionError()}
          element={<Signup />}
        />
        <Route path='login' element={<Login />} />
      </>
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/signup'],
    });
    render(
      <AuthContext.Provider value={nullContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText('Password');
    const confirmInput = screen.getByLabelText('Confirm password');
    const authorKeyInput = screen.getByLabelText('Author key');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmInput).toBeInTheDocument();
    expect(authorKeyInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  describe('form interactions', () => {
    test('show error list when input data is wrong', async () => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route
            path='signup'
            action={() => mockActionError()}
            element={<Signup />}
          />
          <Route path='login' element={<Login />} />
        </>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/signup'],
      });
      render(
        <AuthContext.Provider value={nullContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      const usernameInput = screen.getByRole('textbox', { name: /username/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText('Password');
      const confirmInput = screen.getByLabelText('Confirm password');
      const authorKeyInput = screen.getByLabelText('Author key');
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await user.type(usernameInput, 'a');
      await user.type(emailInput, 'aaa@aaa');
      await user.type(passwordInput, 'aaaaa');
      await user.type(confirmInput, 'aaaaa');
      await user.type(authorKeyInput, 'aaaa');

      await user.click(submitButton);

      expect(
        await screen.findByRole('list', { name: /errorlist/i })
      ).toBeInTheDocument();
    });
    test('redirect to login page when input data is correct', async () => {
      const testRoutes = createRoutesFromElements(
        <>
          <Route
            path='signup'
            action={() => mockActionSuccess()}
            element={<Signup />}
          />
          <Route path='login' element={<Login />} />
        </>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/signup'],
      });
      render(
        <AuthContext.Provider value={nullContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      );
      const usernameInput = screen.getByRole('textbox', { name: /username/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText('Password');
      const confirmInput = screen.getByLabelText('Confirm password');
      const authorKeyInput = screen.getByLabelText('Author key');
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await user.type(usernameInput, 'testname');
      await user.type(emailInput, 'testemail@gmail.com');
      await user.type(passwordInput, 'Testpassword123@');
      await user.type(confirmInput, 'Testpassword123@');
      await user.type(authorKeyInput, 'Correctauthorkey');

      await user.click(submitButton);
      expect(
        await screen.findByRole('heading', { name: /login/i })
      ).toBeInTheDocument();
    });
  });
});
