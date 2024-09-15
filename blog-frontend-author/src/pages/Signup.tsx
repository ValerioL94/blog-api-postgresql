import SignupForm from '../components/SignupForm';

const Signup = () => {
  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-green-700 font-bold text-xl'>Sign-up</h1>
      <div className='p-2'>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
