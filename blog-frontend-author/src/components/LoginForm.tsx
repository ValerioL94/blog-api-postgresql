import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorList from './ErrorList';
import { useAuth } from '../provider/context';
import { TAuthData, TValidationErrors } from '../types/types';
import CustomButton from './CustomButton';

const LoginForm = () => {
  const initialFormState = {
    email: '',
    password: '',
  };
  const [formState, setFormState] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<TValidationErrors | null>(null);
  const { setAuthData } = useAuth();
  const response = useActionData();
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormReset = () => {
    setFormState(initialFormState);
    setFormErrors(null);
  };
  useEffect(() => {
    if (response) {
      const { errors } = response as { errors: TValidationErrors };
      if (errors) {
        return setFormErrors(errors);
      } else {
        toast.success('Login successful!', { autoClose: 2000 });
        setAuthData(response as TAuthData);
        navigate('/home', { replace: true });
      }
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          autoComplete='current-password'
          required
        />
        <div className='flex justify-between'>
          <CustomButton type='submit' content='Submit' />
          <CustomButton content='Reset' onClick={handleFormReset} />
        </div>
      </Form>
      {formErrors && <ErrorList errors={formErrors} />}
    </>
  );
};

export default LoginForm;
