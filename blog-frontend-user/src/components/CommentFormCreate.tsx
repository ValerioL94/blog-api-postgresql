import { Form, useActionData, useNavigate, useSubmit } from 'react-router-dom';
import ErrorList from './ErrorList';
import { TCommentInsert, TValidationErrors } from '../types/types';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const CommentFormCreate = () => {
  const initialFormState: TCommentInsert = useMemo(
    () => ({ username: '', content: '' }),
    []
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
          submit({ ...formData }, { method: 'POST' });
        }}
        className='p-1'
        method='POST'
      >
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
          id='username'
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-blue-600 focus:border-blue-700 outline-none'
          value={formData.username}
          onChange={handleInputChange}
          placeholder='John Doe'
          required
        />
        <label htmlFor='content'>Comment: </label>
        <textarea
          name='content'
          id='content'
          className='block w-full py-1 px-2 mb-3 resize-none  border-2 border-solid border-gray-500 rounded-md text-sm hover:border-blue-600 focus:border-blue-700 outline-none'
          rows={5}
          value={formData.content}
          onChange={handleInputChange}
          placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit efficitur lacus nec fermentum. Sed nisl mauris, dapibus aliquam leo at, efficitur blandit diam.'
          required
        ></textarea>
        <button
          type='submit'
          className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-pointer text-blue-700 bg-white hover:bg-blue-600 hover:text-white  focus:bg-blue-700 focus:text-white'
        >
          Submit
        </button>
      </Form>
      {formErrors && <ErrorList errors={formErrors} />}
    </>
  );
};

export default CommentFormCreate;
