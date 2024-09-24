import { Link, useLoaderData } from 'react-router-dom';
import { TPostList } from '../types/types';
import PostPreview from '../components/PostPreview';
import CustomButton from '../components/CustomButton';

const Posts = () => {
  const { posts } = useLoaderData() as { posts: TPostList };
  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-green-700 font-bold text-xl'>Posts</h1>
      <div className='flex flex-col gap-3 p-1 box-border w-full'>
        {!posts && <h2>Fetching posts...</h2>}
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostPreview key={post.id} postData={post} />)
        ) : (
          <h2>There are no posts.</h2>
        )}
      </div>
      <div className='flex items-center justify-between m-2 font-semibold'>
        <Link to={'new-post'}>New Post</Link>
        <CustomButton
          content='Top'
          title='Go to top'
          onClick={() => (document.documentElement.scrollTop = 0)}
        />
      </div>
    </div>
  );
};

export default Posts;
