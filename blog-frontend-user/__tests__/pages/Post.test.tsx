import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { TPostDetail } from '../../src/types/types';
import Post from '../../src/pages/Post';

describe('post page tests', () => {
  const postDetail: TPostDetail = {
    id: '1',
    title: 'testpost1',
    content: 'test content 1',
    published: false,
    createdAt: new Date('2024-09-18T09:56:31.751Z'),
    updatedAt: new Date('2024-09-18T09:56:31.751Z'),
    authorId: '123',
    author: {
      username: 'testusername',
      email: 'testemail@gmail.com',
    },
    comments: [],
  };
  function getPost() {
    return { post: postDetail };
  }
  beforeEach(() => {
    const testRoutes = createRoutesFromElements(
      <Route path='/posts/1' element={<Post />} loader={() => getPost()} />
    );
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/posts/1'],
    });
    render(<RouterProvider router={router} />);
  });
  test('display post details', async () => {
    expect(
      await screen.findByRole('heading', { name: 'testpost1' })
    ).toBeInTheDocument();
  });
  test('display post form', async () => {
    expect(
      await screen.findByRole('heading', { name: /add comment/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
  });
});
