import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Posts from '../../src/pages/Posts';
import About from '../../src/pages/About';
import { TPostList } from '../../src/types/types';
import GlobalLayout from '../../src/components/GlobalLayout';

describe('navbar component tests', () => {
  const user = userEvent.setup();
  const noPosts: TPostList = [];
  function getNoPosts() {
    return { posts: noPosts };
  }
  const TestHomepage = () => {
    return <h1>Homepage</h1>;
  };
  describe('rendering/navigating', () => {
    beforeEach(() => {
      const testRoutes = createRoutesFromElements(
        <Route path='/' element={<GlobalLayout />}>
          <Route index path='home' element={<TestHomepage />} />
          <Route path='posts' element={<Posts />} loader={() => getNoPosts()} />
          <Route path='about' element={<About />} />
        </Route>
      );
      const router = createMemoryRouter(testRoutes, {
        initialEntries: ['/home'],
      });
      render(<RouterProvider router={router} />);
    });
    test('navbar links count', () => {
      const navLink = screen.getByRole('list');
      expect(navLink).toBeInTheDocument();
      expect(navLink.childElementCount).toEqual(3);
    });
    test('home link', async () => {
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      await user.click(homeLink);
      expect(
        await screen.findByRole('heading', { name: /homepage/i })
      ).toBeInTheDocument();
    });
    test('posts link', async () => {
      const postsLink = screen.getByRole('link', { name: /posts/i });
      expect(postsLink).toBeInTheDocument();
      await user.click(postsLink);
      expect(
        await screen.findByRole('heading', { name: 'Posts' })
      ).toBeInTheDocument();
    });
    test('about link', async () => {
      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
      await user.click(aboutLink);
      expect(
        await screen.findByRole('heading', { name: /about/i })
      ).toBeInTheDocument();
    });
  });
});
