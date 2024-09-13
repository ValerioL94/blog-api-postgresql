import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route index loader={async () => redirect('home')} />
          <Route path='home' element={<HomePage />} />
          <Route path='about' element={<About />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
