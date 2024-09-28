import { useLoaderData } from 'react-router-dom';
import { TPostDetail } from '../types/types';

const CommentList = () => {
  const { post } = useLoaderData() as { post: TPostDetail };
  const { comments } = post;
  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-green-700 font-bold text-xl'>
        {post.title} - Comments
      </h1>
      <div className='flex flex-col gap-3 p-1 box-border w-full'>
        {!comments && <h2>Fetching comments...</h2>}
        {comments && comments.length > 0 ? (
          <p>There are {comments.length} comments.</p>
        ) : (
          // comments.map((comment) => <CommentPreview key={comment.id} commentData={comment} />)
          <h2>There are no comments.</h2>
        )}
      </div>
    </div>
  );
};

export default CommentList;
