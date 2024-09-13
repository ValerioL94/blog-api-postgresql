import { Form } from 'react-router-dom';

const LoginForm = () => {
  return (
    <Form className='p-1' method='POST'>
      <label htmlFor='email'>Email</label>
      <input
        className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none  '
        type='email'
        name='email'
        id='email'
        placeholder='jake@gmail.com'
        autoComplete='email'
        required
      />
      <label htmlFor='password'>Password</label>
      <input
        className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none  '
        type='password'
        name='password'
        id='password'
        autoComplete='current-password'
        required
      />
      <button
        className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-pointer text-green-700 bg-white hover:bg-green-600 hover:text-white  focus:bg-green-700 focus:text-white'
        type='submit'
      >
        Submit
      </button>
    </Form>
  );
};

export default LoginForm;
