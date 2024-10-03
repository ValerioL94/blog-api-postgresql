import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-blue-700 font-bold text-xl'>Homepage</h1>
      <p>
        Welcome to the homepage! This is a simple blog project where users can
        read posts and comment them.
      </p>
      <p>
        There is no registration needed, so go to <Link to='/posts'>posts</Link>{' '}
        and leave a comment if you like!
      </p>
      <div className='max-w-full flex justify-center'>
        <img
          className='max-w-96 rounded-br rounded-bl'
          src='/assets/images/andrew-s-ouo1hbizWwo-unsplash.jpg'
          alt='a dog and a cat enjoying a sunny day'
        />
      </div>
    </div>
  );
};

export default HomePage;
