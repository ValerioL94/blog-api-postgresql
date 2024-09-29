import { Form, useActionData, useNavigate, useSubmit } from 'react-router-dom';
import ErrorList from './ErrorList';
import { useAuth } from '../provider/context';
import { TCommentDetail, TValidationErrors } from '../types/types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CustomButton from './CustomButton';

const CommentFormUpdate = ({
  commentData,
  setEdit,
}: {
  commentData: TCommentDetail;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { authData } = useAuth();
  const initialFormState = {
    username: commentData.username,
    content: commentData.content,
  };
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
        toast.success('Comment updated!', { autoClose: 2000 });
        navigate(`/posts/${commentData.postId}/comments`, { replace: true });
      }
    }
  }, [response, commentData.postId, navigate]);
  const handleFormCancel = () => {
    // without a page reload the form keeps
    // showing eventual errors from previous submits
    if (formErrors) navigate(0);
    else setEdit(false);
  };
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submit(
            { ...formData, id: commentData.id, token: authData!.token },
            { method: 'PUT' }
          );
        }}
        className='p-1'
        method='PUT'
      >
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
          id='username'
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          onChange={handleInputChange}
          value={formData.username}
          placeholder='John Doe'
          autoComplete='username'
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
        <CustomButton
          type='button'
          content='Cancel'
          onClick={handleFormCancel}
        />
      </Form>
      {formErrors && <ErrorList errors={formErrors} />}
    </>
  );
};

export default CommentFormUpdate;
