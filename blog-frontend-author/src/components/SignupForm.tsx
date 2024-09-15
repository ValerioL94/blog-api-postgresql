import { useEffect, useReducer, useState } from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { initialFormState, signupReducer } from '../reducers/signupFormReducer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ErrorList from './ErrorList';

const SignupForm = () => {
  const [formState, dispatch] = useReducer(signupReducer, initialFormState);
  const [errors, setErrors] = useState(null);
  const response = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (response && response.errors) {
      setErrors(response.errors);
    }
    if (response && !response.errors) {
      dispatch({
        type: 'RESET FORM',
        field: '',
        payload: '',
      });
      setErrors(null);
      toast.success('Signup successful!', { autoClose: 2000 });
      navigate('/login', { replace: true });
    }
  }, [response, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'HANDLE INPUT TEXT',
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handleInputShow = (type: string) => {
    dispatch({
      type,
      field: '',
      payload: '',
    });
  };
  return (
    <>
      <Form className='p-1' method='POST'>
        <label
          className='cursor-help'
          title='Username must contain at least 3 characters'
          htmlFor='username'
        >
          Username
        </label>
        <input
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none  '
          type='text'
          name='username'
          id='username'
          value={formState.username}
          onChange={(e) => handleInputChange(e)}
          placeholder='JakeTheAuthor'
          autoComplete='username'
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none  '
          type='email'
          name='email'
          id='email'
          value={formState.email}
          onChange={(e) => handleInputChange(e)}
          placeholder='jake@gmail.com'
          autoComplete='email'
          required
        />
        <div className='flex items-center gap-4'>
          <label
            className='cursor-help'
            title='Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
            htmlFor='password'
          >
            Password
          </label>{' '}
          {formState.showPassword ? (
            <FaEye
              className='cursor-pointer'
              onClick={() => handleInputShow('HANDLE SHOW PASSWORD')}
            />
          ) : (
            <FaEyeSlash
              className='cursor-pointer'
              onClick={() => handleInputShow('HANDLE SHOW PASSWORD')}
            />
          )}
        </div>
        <input
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none  '
          type={formState.showPassword ? 'text' : 'password'}
          name='password'
          id='password'
          value={formState.password}
          onChange={(e) => handleInputChange(e)}
          autoComplete='new-password'
          required
        />
        <div className='flex items-center gap-4'>
          <label htmlFor='confirm'>Confirm password</label>
          {formState.showConfirm ? (
            <FaEye
              className='cursor-pointer'
              onClick={() => handleInputShow('HANDLE SHOW CONFIRM')}
            />
          ) : (
            <FaEyeSlash
              className='cursor-pointer'
              onClick={() => handleInputShow('HANDLE SHOW CONFIRM')}
            />
          )}
        </div>
        <input
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none  '
          type={formState.showConfirm ? 'text' : 'password'}
          name='confirm'
          id='confirm'
          value={formState.confirm}
          onChange={(e) => handleInputChange(e)}
          autoComplete='new-password'
          required
        />
        <div className='flex items-center gap-4'>
          <label
            className='cursor-help'
            title='Unique key given to authorized users'
            htmlFor='authorKey'
          >
            Author key
          </label>
          {formState.showAuthorKey ? (
            <FaEye
              className='cursor-pointer'
              onClick={() => handleInputShow('HANDLE SHOW AUTHOR_KEY')}
            />
          ) : (
            <FaEyeSlash
              className='cursor-pointer'
              onClick={() => handleInputShow('HANDLE SHOW AUTHOR_KEY')}
            />
          )}
        </div>
        <input
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          type={formState.showAuthorKey ? 'text' : 'password'}
          name='authorKey'
          id='authorKey'
          value={formState.authorKey}
          onChange={(e) => handleInputChange(e)}
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

export default SignupForm;
