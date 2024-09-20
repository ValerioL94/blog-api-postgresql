import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { routes } from './App.tsx';
import AuthProvider from './provider/Provider.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
