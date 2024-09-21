import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/context';

const ProtectedRoute = () => {
  const { authData } = useAuth();
  return <>{authData ? <Outlet /> : <Navigate to='/home' replace={true} />}</>;
};

export default ProtectedRoute;
