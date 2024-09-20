import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { routes } from '../src/App';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('routes rendering/navigating', () => {
  test('correct layout rendering', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);
    const banner = await screen.findByRole('banner');
    const main = await screen.findByRole('main');
    const contentinfo = await screen.findByRole('contentinfo');

    expect(banner).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(contentinfo).toBeInTheDocument();
  });
  test('error page on nonexisting page', async () => {
    const badRoute = '/bad/lost';
    const router = createMemoryRouter(routes, { initialEntries: [badRoute] });
    render(<RouterProvider router={router} />);

    const errorHeading = await screen.findByRole('heading');
    expect(errorHeading).toHaveTextContent(/error/i);
  });
});
