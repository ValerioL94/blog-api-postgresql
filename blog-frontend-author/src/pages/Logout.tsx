import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/context';
import Spinner from '../components/Spinner';

const Logout = () => {
  const { authData, setAuthData } = useAuth();
  const navigate = useNavigate();

  if (authData) {
    setTimeout(() => {
      setAuthData(null);
      navigate('/home', { replace: true });
    }, 2000);
    return (
      <>
        <h1 className='text-center text-green-700 font-bold text-xl'>
          Logging out...
        </h1>
        <Spinner loading={true} />
      </>
    );
  } else {
    return <Navigate to={'/home'} replace={true} />;
  }
};

export default Logout;
