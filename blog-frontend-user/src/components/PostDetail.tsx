import parse from 'html-react-parser';
import { TPostDetail } from '../types/types';
import CommentPreview from './CommentPreview';

const PostDetail = ({ postData }: { postData: TPostDetail }) => {
  return (
    <>
      <h1 className='text-center text-blue-700 font-bold text-xl'>
        {postData.title}
      </h1>
      <div className='flex sm:flex-row flex-col justify-between'>
        <div>
          <p>
            <strong>Author: </strong>
            {postData.author.username}
          </p>
        </div>
        <div>
          <p>
            <strong>Created: </strong>
            {new Date(postData.createdAt).toLocaleString()}{' '}
          </p>
          <p>
            <strong>Last updated: </strong>
            {new Date(postData.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <hr />
      {parse(postData.content)}
      <hr />
      <div className='flex flex-col gap-3 p-1 box-border w-full'>
        <h2 className='text-center text-blue-700 font-bold text-xl'>
          Comments
        </h2>
        {!postData.comments && <h2>Fetching comments...</h2>}
        {postData.comments && postData.comments.length > 0 ? (
          postData.comments.map((comment) => (
            <CommentPreview key={comment.id} commentData={comment} />
          ))
        ) : (
          <>
            <h2>There are no comments.</h2>
            <hr />
          </>
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
    </>
  );
};

export default PostDetail;
