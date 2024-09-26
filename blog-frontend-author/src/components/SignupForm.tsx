import { useEffect, useReducer, useState } from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { initialFormState, signupReducer } from '../reducers/signupFormReducer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ErrorList from './ErrorList';
import { TValidationErrors } from '../types/types';
import CustomButton from './CustomButton';

const SignupForm = () => {
  const [formState, dispatch] = useReducer(signupReducer, initialFormState);
  const [formErrors, setFormErrors] = useState<TValidationErrors | null>(null);
  const response = useActionData();
  const navigate = useNavigate();
  useEffect(() => {
    if (response) {
      const { errors } = response as { errors: TValidationErrors };
      if (errors) {
        return setFormErrors(errors);
      } else {
        toast.success('Signup successful!', { autoClose: 2000 });
        navigate('/login', { replace: true });
      }
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
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          type='text'
          name='username'
          id='username'
          value={formState.username}
          onChange={handleInputChange}
          placeholder='JakeTheAuthor'
          autoComplete='username'
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          type='email'
          name='email'
          id='email'
          value={formState.email}
          onChange={handleInputChange}
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
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          type={formState.showPassword ? 'text' : 'password'}
          name='password'
          id='password'
          value={formState.password}
          onChange={handleInputChange}
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
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          type={formState.showConfirm ? 'text' : 'password'}
          name='confirm'
          id='confirm'
          value={formState.confirm}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          required
        />
        <div className='flex justify-between'>
          <CustomButton type='submit' content='Submit' />
          <CustomButton
            content='Reset'
            onClick={() =>
              dispatch({
                type: 'RESET FORM',
              })
            }
          />
        </div>
      </Form>
      {formErrors && <ErrorList errors={formErrors} />}
    </>
  );
};

export default SignupForm;
