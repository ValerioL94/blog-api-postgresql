import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Signup from '../../src/pages/Signup';
import Login from '../../src/pages/Login';
import userEvent from '@testing-library/user-event';
import AuthProvider from '../../src/provider/Provider';

describe('signup form tests', () => {
  const user = userEvent.setup();
  function mockActionError() {
    const response = { errors: [{ message: 'error' }, { message: 'error2' }] };
    return response;
  }
  function mockActionSuccess() {
    const response = { message: 'Signup successful' };
    return response;
  }
  test('form correct rendering', async () => {
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
    expect(
      screen.getByRole('textbox', { name: /username/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('Author key')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });
  describe('form interactions', () => {
    test('inputs are registered correctly', async () => {
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
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      );
      const usernameInput = screen.getByRole('textbox', { name: /username/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText('Password');
      const confirmInput = screen.getByLabelText('Confirm password');
      const authorKeyInput = screen.getByLabelText(/author key/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const resetButton = screen.getByRole('button', { name: /reset/i });

      // Every field is filled correctly
      await user.type(usernameInput, 'a');
      expect(usernameInput).toHaveValue('a');

      await user.type(emailInput, 'aaa@aaa');
      expect(emailInput).toHaveValue('aaa@aaa');

      await user.type(passwordInput, 'aaaaa');
      expect(passwordInput).toHaveValue('aaaaa');

      await user.type(confirmInput, 'aaaaa');
      expect(confirmInput).toHaveValue('aaaaa');

      await user.type(authorKeyInput, 'aaaa');
      expect(authorKeyInput).toHaveValue('aaaa');

      // Show error list on submit button press
      await user.click(submitButton);
      expect(
        await screen.findByRole('list', { name: /errorlist/i })
      ).toBeInTheDocument();

      // Reset both error list and input fields on reset button press
      await user.click(resetButton);
      expect(screen.queryByRole('list', { name: /errorlist/i })).toBeNull();
      expect(usernameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
      expect(confirmInput).toHaveValue('');
      expect(authorKeyInput).toHaveValue('');
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
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      );
      const usernameInput = screen.getByRole('textbox', { name: /username/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText('Password');
      const confirmInput = screen.getByLabelText('Confirm password');
      const authorKeyInput = screen.getByLabelText(/author key/i);
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
