import { useLoaderData } from 'react-router-dom';
import { TPostList } from '../types/types';
import PostPreview from '../components/PostPreview';

const Posts = () => {
  const { posts } = useLoaderData() as { posts: TPostList };
  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-blue-700 font-bold text-xl'>Posts</h1>
      <div className='flex flex-col gap-3 p-1 box-border w-full'>
        {!posts && <h2>Fetching posts...</h2>}
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostPreview key={post.id} postData={post} />)
        ) : (
          <h2>There are no posts.</h2>
        )}
      </div>
      <div className='flex justify-end m-2 font-semibold'>
        <button
          title='Go to top'
          className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-pointer text-blue-700 bg-white hover:bg-blue-600 hover:text-white  focus:bg-blue-700 focus:text-white'
          onClick={() => (document.documentElement.scrollTop = 0)}
        >
          Top
        </button>
      </div>
    </div>
  );
};

export default Posts;
