import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { routes } from '../../src/App';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('error page test', () => {
  test('redirect home link', async () => {
    const badRoute = '/bad/lost';
    const router = createMemoryRouter(routes, { initialEntries: [badRoute] });
    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    await user.click(screen.getByRole('link', { name: /home-link/i }));

    const homeHeading = screen.getByRole('heading', { name: /homepage/i });
    expect(homeHeading).toBeInTheDocument();
  });
});
