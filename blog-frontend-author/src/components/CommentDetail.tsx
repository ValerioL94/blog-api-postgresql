import { useState } from 'react';
import { useAuth } from '../provider/context';
import { TCommentDetail } from '../types/types';
import CustomButton from './CustomButton';
import CommentDeleteModal from './CommentDeleteModal';

const CommentDetail = ({
  commentData,
  setEdit,
}: {
  commentData: TCommentDetail;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { authData } = useAuth();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <h1 className='text-center text-green-700 font-bold text-xl'>
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
      <div className='flex my-2 items-center justify-between'>
        <CustomButton content='Edit' onClick={() => setEdit(true)} />
        <CustomButton
          content='Delete'
          onClick={() => setShowModal(!showModal)}
        />
        {showModal && (
          <CommentDeleteModal
            setShowModal={setShowModal}
            token={authData!.token}
            commentData={commentData}
          />
        )}
      </div>
    </>
  );
};

export default CommentDetail;
