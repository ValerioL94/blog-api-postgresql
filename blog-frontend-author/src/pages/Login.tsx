import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../provider/context';

const Login = () => {
  const [errors, setErrors] = useState<string[] | null>(null);
  const { authData } = useAuth();
  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      {authData ? (
        <h1 className='text-center text-green-700 font-bold text-xl'>
          Welcome back {authData.user.username}
        </h1>
      ) : (
        <>
          <h1 className='text-center text-green-700 font-bold text-xl'>
            Log-in
          </h1>
          <div className='p-2'>
            <LoginForm />
          </div>
          {errors ? (
            <ul>
              {errors.map((error, index) => (
                <li className='errors-list' key={index}>
                  {error}
                </li>
              ))}
            </ul>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};

export default Login;
