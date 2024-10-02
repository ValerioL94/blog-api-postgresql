import { useLoaderData } from 'react-router-dom';
import { TPostDetail } from '../types/types';
import PostDetail from '../components/PostDetail';
import CommentFormCreate from '../components/CommentFormCreate';
const Post = () => {
  const { post } = useLoaderData() as { post: TPostDetail };
  return (
    <>
      <div className='flex flex-col gap-2 mb-4 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500 break-words'>
        <PostDetail postData={post} />
      </div>
      <div className='flex flex-col py-4 sm:px-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
        <h2 className='text-center text-blue-700 font-bold text-xl'>
          Add Comment
        </h2>
        <CommentFormCreate />
      </div>
    </>
  );
};

export default Post;
