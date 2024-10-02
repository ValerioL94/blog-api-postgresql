import { createRoutesFromElements, redirect, Route } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Posts from './pages/Posts';
import Post from './pages/Post';
import { postLoader, postListLoader } from './loaders/postLoader';
import { commentAction } from './actions/commentActions';

export const routes = createRoutesFromElements(
  <Route path='/' errorElement={<ErrorPage />} element={<GlobalLayout />}>
    <Route index loader={() => redirect('home')} />
    <Route path='home' element={<HomePage />} />
    <Route path='about' element={<About />} />
    <Route path='posts'>
      <Route
        index
        loader={async () => await postListLoader()}
        element={<Posts />}
      />
      <Route
        path=':postId'
        element={<Post />}
        loader={async ({ params }) => await postLoader(params)}
        action={async ({ request, params }) =>
          await commentAction(request, params)
        }
      />
    </Route>
  </Route>
);
