import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../src/App';

describe('About page tests', () => {
  test('content rendering', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/about'] });
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });
});
