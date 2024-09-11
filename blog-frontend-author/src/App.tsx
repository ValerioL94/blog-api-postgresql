import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route index loader={async () => redirect('home')} />
          <Route path='home' element={<HomePage />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
