import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/context';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';

const Logout = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setAuthData(null);
      navigate('/home', { replace: true });
    }, 2000);
  }, [setAuthData, navigate]);
  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-green-700 font-bold text-xl'>
        Logging out...
      </h1>
      <Spinner loading={true} />
    </div>
  );
};

export default Logout;
