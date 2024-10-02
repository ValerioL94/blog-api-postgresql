import { TCommentDetail } from '../types/types';

const CommentDetail = ({ commentData }: { commentData: TCommentDetail }) => {
  return (
    <>
      <h1 className='text-center text-blue-700 font-bold text-xl'>
        {commentData.post.title} - Comment
      </h1>
      <div>
        <p>
          <strong>Username: </strong>
          {commentData.username}
        </p>
        <div>
          <p>
            <strong>Created: </strong>
            {new Date(commentData.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Last updated: </strong>
            {new Date(commentData.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <hr />
      {commentData.content}
      <hr />
    </>
  );
};

export default CommentDetail;
