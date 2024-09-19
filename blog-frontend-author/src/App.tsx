import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NewPost from './pages/NewPost';
import PostDetail from './pages/Post';
import Posts from './pages/Posts';
import ProtectedRoute from './pages/ProtectedRoute';
import Signup from './pages/Signup';
import GlobalLayout from './components/GlobalLayout';
import { useAuth } from './provider/context';
import { postLoader, postsLoader } from './loaders/postLoader';
import { userAction } from './actions/userActions';
import { postAction } from './actions/postActions';

const App = () => {
  const { authData } = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' errorElement={<ErrorPage />} element={<GlobalLayout />}>
        <Route index loader={async () => redirect('home')} />
        <Route path='home' element={<HomePage />} />
        <Route path='about' element={<About />} />
        <Route
          path='signup'
          action={async ({ request }) => await userAction(request, 'signup')}
          element={authData ? <Navigate replace to={'/home'} /> : <Signup />}
        />
        <Route
          path='login'
          action={async ({ request }) => await userAction(request, 'login')}
          element={authData ? <Navigate replace to={'/home'} /> : <Login />}
        />
        <Route
          path='logout'
          element={!authData ? <Navigate replace to={'/home'} /> : <Logout />}
        />
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
              await postAction(request, params, authData!.token)
            }
          />
          <Route
            path=':postId'
            element={<PostDetail />}
            loader={async ({ params }) => await postLoader(params)}
          />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
