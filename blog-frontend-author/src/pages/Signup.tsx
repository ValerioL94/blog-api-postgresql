import SignupForm from '../components/SignupForm';
import { useAuth } from '../provider/context';

const Signup = () => {
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
            Sign-up
          </h1>
          <div className='p-2'>
            <SignupForm />
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
