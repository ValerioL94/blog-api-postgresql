import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../provider/context';

const Login = () => {
  const { authData } = useAuth();
  return (
    <>
      {authData ? (
        <Navigate to={'/home'} replace={true} />
      ) : (
        <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
          <h1 className='text-center text-green-700 font-bold text-xl'>
            Login
          </h1>
          <div className='p-2'>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
