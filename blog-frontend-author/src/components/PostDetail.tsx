import parse from 'html-react-parser';
import { useAuth } from '../provider/context';
import CustomButton from './CustomButton';
import { TPostDetail } from '../types/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostDeleteModal from './PostDeleteModal';

const PostDetail = ({
  setEdit,
  postData,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  postData: TPostDetail;
}) => {
  const { authData } = useAuth();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <h1 className='text-center text-green-700 font-bold text-xl'>
        {postData.title}
      </h1>
      <div className='flex sm:flex-row flex-col justify-between'>
        <div>
          <p>
            <strong>Author: </strong>
            {postData.author.username}
          </p>
          <p>
            <strong>Published: </strong>
            {postData.published ? 'Yes' : 'No'}
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
      <div className='flex my-2 items-center justify-between'>
        {authData!.user.id === postData.authorId ? (
          <>
            <CustomButton content='Edit' onClick={() => setEdit(true)} />
            <CustomButton
              content='Delete'
              onClick={() => setShowModal(!showModal)}
            />
            {showModal && (
              <PostDeleteModal
                setShowModal={setShowModal}
                postId={postData.id}
                token={authData!.token}
              />
            )}
          </>
        ) : (
          <>
            <CustomButton
              disabled={true}
              content='Edit'
              title='Only the original author can edit this post'
            />
            <CustomButton
              disabled={true}
              content='Delete'
              title='Only the original author can delete this post'
            />
          </>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <Link to={'comments'}>Go to post's comments</Link>
        <CustomButton
          title='Go to top'
          content={'Top'}
          onClick={() => (document.documentElement.scrollTop = 0)}
        />
      </div>
    </>
  );
};

export default PostDetail;
