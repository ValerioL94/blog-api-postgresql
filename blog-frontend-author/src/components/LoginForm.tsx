import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorList from './ErrorList';
import { useAuth } from '../provider/context';

const initialState = {
  email: '',
  password: '',
};
const LoginForm = () => {
  const [formState, setFormState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);
  const { setAuthData } = useAuth();
  const response = useActionData();
  const navigate = useNavigate();
  function handleChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
    if (response && response.errors) {
      setErrors(response.errors);
    }
    if (response && !response.errors) {
      toast.success('Login successful!', { autoClose: 2000 });
      setFormState(initialState);
      setErrors(null);
      setAuthData(response);
    }
  }, [response, navigate, setAuthData]);

  return (
    <>
      <Form className='p-1' method='POST'>
        <label htmlFor='email'>Email</label>
        <input
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none  '
          type='email'
          name='email'
          id='email'
          value={formState.email}
          onChange={handleChange}
          placeholder='jake@gmail.com'
          autoComplete='email'
          required
        />
        <div className='flex items-center gap-4'>
          <label htmlFor='password'>Password</label>
          {showPassword ? (
            <FaEye
              className='cursor-pointer'
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaEyeSlash
              className='cursor-pointer'
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        <input
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none  '
          type={showPassword ? 'text' : 'password'}
          name='password'
          id='password'
          value={formState.password}
          onChange={handleChange}
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
      {errors ? <ErrorList errors={errors} /> : ''}
    </>
  );
};

export default LoginForm;
