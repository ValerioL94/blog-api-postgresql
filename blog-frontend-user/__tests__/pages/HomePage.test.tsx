import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { routes } from '../../src/App';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { TPostList } from '../../src/types/types';
import HomePage from '../../src/pages/HomePage';
import Posts from '../../src/pages/Posts';

describe('HomePage tests', () => {
  describe('rendering/navigating', () => {
    const user = userEvent.setup();
    test('display welcome message', () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
      render(<RouterProvider router={router} />);
      expect(screen.getByText(/Welcome to the homepage/i)).toBeInTheDocument();
    });
    test('post link', async () => {
      const noPosts: TPostList = [];
      function getNoPosts() {
        return { posts: noPosts };
      }
      const testRoutes = createRoutesFromElements(
        <>
          <Route path='/home' element={<HomePage />} />
          <Route
            path='/posts'
            element={<Posts />}
            loader={() => getNoPosts()}
          />
        </>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/home'],
      });
      render(<RouterProvider router={router} />);
      const postsLink = screen.getByRole('link', { name: /posts/i });
      expect(postsLink).toBeInTheDocument();
      await user.click(postsLink);
      expect(
        await screen.findByRole('heading', { name: 'Posts' })
      ).toBeInTheDocument();
    });
  });
});
