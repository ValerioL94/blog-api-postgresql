import { createRoutesFromElements, redirect, Route } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProtectedRoute from './pages/ProtectedRoute';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import Comments from './pages/Comments';
import { userAction } from './actions/userActions';
import { postLoader, postListLoader } from './loaders/postLoader';
import { postAction } from './actions/postActions';
import { commentListLoader, commentLoader } from './loaders/commentLoader';
import { commentAction } from './actions/commentActions';
import Comment from './pages/Comment';

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
        loader={async () => await postListLoader()}
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
        action={async ({ request, params }) =>
          await postAction(request, params)
        }
      />
      <Route
        path=':postId/comments'
        element={<Comments />}
        loader={async ({ params }) => await commentListLoader(params)}
        action={async ({ request, params }) =>
          await commentAction(request, params)
        }
      />
      <Route
        path=':postId/comments/:commentId'
        element={<Comment />}
        loader={async ({ params }) => await commentLoader(params)}
        action={async ({ request, params }) =>
          await commentAction(request, params)
        }
      />
    </Route>
  </Route>
);
