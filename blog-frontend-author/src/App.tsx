import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import { userAction } from './actions/userActions';
import Logout from './pages/Logout';
import { useAuth } from './provider/context';
import Posts from './pages/Posts';
import { postsLoader } from './loaders/postLoader';
import NewPost from './pages/NewPost';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const { authData } = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' errorElement={<ErrorPage />} element={<MainLayout />}>
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
            <Route path='new-post' element={<NewPost />} />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
