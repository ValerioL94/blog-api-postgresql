import { useLoaderData, useLocation } from 'react-router-dom';
import { TCommentList } from '../types/types';
import CommentPreview from '../components/CommentPreview';
import CustomButton from '../components/CustomButton';
import CommentFormCreate from '../components/CommentFormCreate';

const Comments = () => {
  const { comments } = useLoaderData() as { comments: TCommentList };
  const { state } = useLocation();
  return (
    <>
      <div className='flex flex-col gap-2 p-4 mb-5 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
        <h1 className='text-center text-green-700 font-bold text-xl'>
          {state ? `${state.postTitle} - ` : ''}Comments
        </h1>
        <div className='flex flex-col gap-3 p-1 box-border w-full'>
          {!comments && <h2>Fetching comments...</h2>}
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <CommentPreview key={comment.id} commentData={comment} />
            ))
          ) : (
            <>
              <h2>There are no comments.</h2>
              <hr />
            </>
          )}
        </div>

        <div className='flex w-full justify-end'>
          <CustomButton
            type='button'
            content='Top'
            onClick={() => (document.documentElement.scrollTop = 0)}
          />
        </div>
      </div>
      <div className='flex flex-col py-4 sm:px-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
        <h3 className='text-center text-green-700 font-bold text-xl'>
          Add Comment
        </h3>
        <CommentFormCreate />
      </div>
    </>
  );
};

export default Comments;
