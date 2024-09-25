import PostFormCreate from '../components/PostFormCreate';

const NewPost = () => {
  return (
    <div className='flex flex-col py-4 sm:px-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-green-700 font-bold text-xl'>New Post</h1>
      <PostFormCreate />
    </div>
  );
};

export default NewPost;
