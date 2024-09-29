import { useLoaderData } from 'react-router-dom';
import { TCommentDetail } from '../types/types';
import { useState } from 'react';
import CommentFormUpdate from '../components/CommentFormUpdate';
import CommentDetail from '../components/CommentDetail';

const Comment = () => {
  const { comment } = useLoaderData() as { comment: TCommentDetail };
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit ? (
        <div className='flex flex-col items-center py-4 sm:px-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
          <h1 className='text-center text-green-700 font-bold text-xl'>
            Edit Comment
          </h1>
          <div className='sm:p-2 w-full max-w-64 sm:max-w-3xl'>
            <CommentFormUpdate commentData={comment} setEdit={setEdit} />
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500 break-words'>
          <CommentDetail commentData={comment} setEdit={setEdit} />
        </div>
      )}
    </>
  );
};

export default Comment;
