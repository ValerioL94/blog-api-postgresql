import { useLoaderData } from 'react-router-dom';
import { TPostDetail } from '../types/types';
import { useState } from 'react';
import PostFormUpdate from '../components/PostFormUpdate';
import PostDetail from '../components/PostDetail';
const Post = () => {
  const { post } = useLoaderData() as { post: TPostDetail };
  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ? (
        <div className='flex flex-col items-center py-4 sm:px-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
          <h1 className='text-center text-green-700 font-bold text-xl'>
            Edit Post
          </h1>
          <div className='sm:p-2 w-full max-w-64 sm:max-w-3xl'>
            <PostFormUpdate setEdit={setEdit} postData={post} />
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
          <PostDetail setEdit={setEdit} postData={post} />
        </div>
      )}
    </>
  );
};

export default Post;
