import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../src/App';

describe('About page tests', () => {
  const router = createMemoryRouter(routes, { initialEntries: ['/about'] });
  test('content rendering', async () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });
});
