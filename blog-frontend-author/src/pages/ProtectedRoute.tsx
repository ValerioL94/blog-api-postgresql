import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/context';

const ProtectedRoute = () => {
  const { authData } = useAuth();
  if (!authData) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
