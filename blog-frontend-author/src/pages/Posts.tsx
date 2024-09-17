import { Link, useLoaderData } from 'react-router-dom';
import { PostList } from '../types/types';
import Post from '../components/Post';

const Posts = () => {
  const posts = useLoaderData() as PostList;

  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-green-700 font-bold text-xl'>Posts</h1>
      <div className='flex flex-col gap-3 p-1 box-border w-full'>
        {!posts && <h2>Fetching posts...</h2>}
        {posts && posts.length ? (
          posts.map((post) => <Post postData={post} />)
        ) : (
          <h2>There are no posts.</h2>
        )}
      </div>
      <div className='flex items-center justify-between m-2 font-semibold'>
        <Link to={'new-post'}>New Post</Link>
        <button
          type='button'
          className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-pointer text-green-700 bg-white hover:bg-green-600 hover:text-white  focus:bg-green-700 focus:text-white'
          onClick={() => (document.documentElement.scrollTop = 0)}
        >
          Top &#8679;
        </button>
      </div>
    </div>
  );
};

export default Posts;
