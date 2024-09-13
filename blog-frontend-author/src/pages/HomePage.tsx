import { Link } from 'react-router-dom';
import { useAuth } from '../provider/context';
const HomePage = () => {
  const { authData } = useAuth();

  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-green-700 font-bold text-xl'>Homepage</h1>
      {authData ? (
        <>
          <p>
            Welcome back <strong>{authData.user.username}</strong> !
          </p>
          <p>
            Here to make a new <Link to={'/posts'}>post</Link> ? Or just
            checking something? Well no matter, have fun!
          </p>
        </>
      ) : (
        <>
          <p>
            Welcome to the homepage! On this site registered authors can manage
            both posts and comments.
          </p>
          <p>
            Don&apos;t have an account? If you know the secret password you can{' '}
            <Link to={'/signup'}>sign up</Link> in the blink of an eye!
          </p>
          <p>
            Already have an account? Go ahead and{' '}
            <Link to={'/login'}>log in</Link> then!
          </p>
        </>
      )}
    </div>
  );
};

export default HomePage;
