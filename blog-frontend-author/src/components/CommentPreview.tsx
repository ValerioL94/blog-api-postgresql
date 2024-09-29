import { Link } from 'react-router-dom';
import { TCommentDetail } from '../types/types';
import { useState } from 'react';
import CommentFormUpdate from './CommentFormUpdate';

const CommentPreview = ({ commentData }: { commentData: TCommentDetail }) => {
  const [edit, setEdit] = useState(false);
  return (
    <>
      <div className='flex items-center justify-between'>
        {edit ? (
          <CommentFormUpdate commentData={commentData} setEdit={setEdit} />
        ) : (
          <>
            <div className='w-full break-words'>
              <p>
                <strong>{commentData.username}</strong>
              </p>
              <p>{commentData.content}</p>
              <Link to={commentData.id}>Manage comment</Link>
            </div>
          </>
        )}
      </div>
      <hr />
    </>
  );
};

export default CommentPreview;
