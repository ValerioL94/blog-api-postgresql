import { createRoutesFromElements, redirect, Route } from 'react-router-dom';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import Posts from './pages/Posts';
import ProtectedRoute from './pages/ProtectedRoute';
import Signup from './pages/Signup';
import GlobalLayout from './components/GlobalLayout';
import { postLoader, postsLoader } from './loaders/postLoader';
import { userAction } from './actions/userActions';
import { postAction } from './actions/postActions';

export const routes = createRoutesFromElements(
  <Route path='/' errorElement={<ErrorPage />} element={<GlobalLayout />}>
    <Route index loader={() => redirect('home')} />
    <Route path='home' element={<HomePage />} />
    <Route path='about' element={<About />} />
    <Route
      path='signup'
      action={async ({ request }) => await userAction(request, 'signup')}
      element={<Signup />}
    />
    <Route
      path='login'
      action={async ({ request }) => await userAction(request, 'login')}
      element={<Login />}
    />
    <Route path='logout' element={<Logout />} />
    <Route path='posts' element={<ProtectedRoute />}>
      <Route
        index
        loader={async () => await postsLoader()}
        element={<Posts />}
      />
      <Route
        path='new-post'
        element={<NewPost />}
        action={async ({ request, params }) =>
          await postAction(request, params)
        }
      />
      <Route
        path=':postId'
        element={<Post />}
        loader={async ({ params }) => await postLoader(params)}
      />
    </Route>
  </Route>
);
