import parse from 'html-react-parser';
import { Link, useLoaderData } from 'react-router-dom';
import { TPostDetail } from '../types/types';
import { useAuth } from '../provider/context';
import { useState } from 'react';
import ModalPrompt from '../components/ModalPrompt';
import PostFormUpdate from '../components/PostFormUpdate';
import CustomButton from '../components/CustomButton';
const Post = () => {
  const { authData } = useAuth();
  const { post } = useLoaderData() as { post: TPostDetail };
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  if (edit) {
    return (
      <div className='flex flex-col gap-2 py-4 px-8 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
        <PostFormUpdate setEdit={setEdit} postData={post} />
      </div>
    );
  } else {
    return (
      <div className='flex flex-col gap-2 py-4 px-8 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
        <h1 className='text-center text-green-700 font-bold text-xl'>
          {post.title}
        </h1>
        <div className='flex sm:flex-row flex-col justify-between'>
          <p>
            <strong>Author: </strong>
            {post.author.username}
          </p>
          <div>
            <p>
              <strong>Created: </strong>
              {new Date(post.createdAt).toLocaleString()}{' '}
            </p>
            <p>
              <strong>Last updated: </strong>
              {new Date(post.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <hr />
        {parse(post.content)}
        <hr />
        <div className='flex my-2 items-center justify-between'>
          {authData?.user.id === post.authorId ? (
            <>
              <CustomButton content='Edit' onClick={() => setEdit(true)} />
              <CustomButton
                content='Delete'
                onClick={() => setShowModal(!showModal)}
              />
              {showModal && (
                <ModalPrompt
                  setShowModal={setShowModal}
                  postId={post.id}
                  token={authData.token}
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
      </div>
    );
  }
};

export default Post;
