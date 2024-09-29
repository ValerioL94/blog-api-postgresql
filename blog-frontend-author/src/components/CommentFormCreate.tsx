import { Form, useActionData, useNavigate, useSubmit } from 'react-router-dom';
import ErrorList from './ErrorList';
import { useAuth } from '../provider/context';
import { TCommentUpsert, TValidationErrors } from '../types/types';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CustomButton from './CustomButton';

const CommentFormCreate = () => {
  const { authData } = useAuth();
  const initialFormState: TCommentUpsert = useMemo(
    () => ({ username: authData!.user.username, content: '' }),
    [authData]
  );
  const navigate = useNavigate();
  const response = useActionData();
  const submit = useSubmit();
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState<TValidationErrors | null>(null);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (response) {
      const { errors } = response as { errors: TValidationErrors };
      if (errors) {
        return setFormErrors(errors);
      } else {
        toast.success('Comment created!', { autoClose: 2000 });
        setFormData(initialFormState);
        setFormErrors(null);
        document.documentElement.scrollTop = 0;
      }
    }
  }, [response, initialFormState, navigate]);
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submit({ ...formData, token: authData!.token }, { method: 'POST' });
        }}
        className='p-1'
        method='POST'
      >
        <label htmlFor='username'>Username: </label>
        <input
          disabled
          type='text'
          name='username'
          id='username'
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          value={formData.username}
          required
        />
        <label htmlFor='content'>Comment: </label>
        <textarea
          name='content'
          id='content'
          className='block w-full py-1 px-2 mb-3 resize-none  border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          rows={5}
          value={formData.content}
          onChange={handleInputChange}
          placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit efficitur lacus nec fermentum. Sed nisl mauris, dapibus aliquam leo at, efficitur blandit diam.'
          required
        ></textarea>
        <CustomButton type='submit' content='Submit' />
      </Form>
      {formErrors && <ErrorList errors={formErrors} />}
    </>
  );
};

export default CommentFormCreate;
