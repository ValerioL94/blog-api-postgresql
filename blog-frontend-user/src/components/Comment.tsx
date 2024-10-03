import { TCommentDetail } from '../types/types';

const Comment = ({ commentData }: { commentData: TCommentDetail }) => {
  return (
    <>
      <div className='w-full break-words'>
        <p>
          <strong>{commentData.username}</strong>
        </p>
        <p>{commentData.content}</p>
      </div>
      <hr />
    </>
  );
};

export default Comment;
