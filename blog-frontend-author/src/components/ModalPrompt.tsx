import { useEffect } from 'react';
import { useActionData, useNavigate, useSubmit } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TValidationErrors } from '../types/types';
import CustomButton from './CustomButton';

const ModalPrompt = ({
  setShowModal,
  postId,
  token,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
  token: string;
}) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const response = useActionData();
  const handleConfirm = () => {
    submit({ id: postId, token: token }, { method: 'DELETE' });
  };
  useEffect(() => {
    if (response) {
      const { errors } = response as { errors: TValidationErrors };
      if (!errors) {
        toast.success('Post deleted!', { autoClose: 2000 });
        navigate('/posts', { replace: true });
      }
    }
  }, [response, navigate]);
  return (
    <div
      className='box-border fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-green-900 bg-opacity-30 backdrop-blur-sm animate-fade-in'
      onClick={() => setShowModal(false)}
    >
      <div
        className='absolute flex flex-col gap-2 items-center justify-center w-full max-w-72 h-28 p-4 bg-white rounded-xl shadow-xl shadow-gray-500 transition-all duration-500 z-10'
        onClick={(e) => e.stopPropagation()}
      >
        <p>Delete this post and all its comments?</p>
        <div className='flex w-full justify-between px-2'>
          <CustomButton onClick={handleConfirm} content='Confirm' />
          <CustomButton onClick={() => setShowModal(false)} content='Cancel' />
        </div>
      </div>
    </div>
  );
};

export default ModalPrompt;
