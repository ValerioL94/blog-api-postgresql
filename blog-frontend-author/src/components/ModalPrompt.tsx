import { useEffect } from 'react';
import { useActionData, useNavigate, useSubmit } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TValidationErrors } from '../types/types';

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
  function handleConfirm() {
    submit({ id: postId, token: token }, { method: 'DELETE' });
  }
  useEffect(() => {
    if (response) {
      const { errors } = response as { errors: TValidationErrors };
      if (errors) {
        throw new Error('Something went wrong');
      } else {
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
      <dialog
        className='absolute flex flex-col gap-2 items-center justify-center w-11/12 max-w-72 h-28 p-4 bg-white rounded-xl shadow-xl shadow-gray-500 transition-all duration-500 z-10'
        onClick={(e) => e.stopPropagation()}
      >
        <p>Delete this post and all its comments?</p>
        <div className='flex w-full justify-evenly'>
          <button
            className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-pointer text-green-700 bg-white hover:bg-green-600 hover:text-white  focus:bg-green-700 focus:text-white'
            type='button'
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-pointer text-green-700 bg-white hover:bg-green-600 hover:text-white  focus:bg-green-700 focus:text-white'
            type='button'
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ModalPrompt;
