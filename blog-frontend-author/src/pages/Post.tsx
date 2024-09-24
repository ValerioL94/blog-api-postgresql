import parse from 'html-react-parser';
import { Link, useLoaderData } from 'react-router-dom';
import { TPostDetail } from '../types/types';
import { useAuth } from '../provider/context';
import { useState } from 'react';
import ModalComponent from '../components/ModalComponent';

const Post = () => {
  const { authData } = useAuth();
  const { post } = useLoaderData() as { post: TPostDetail };
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      <div
        style={{
          display: 'flex',
          margin: '10px 0',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {authData?.user.id === post.authorId ? (
          <>
            <button
              type='button'
              className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-pointer text-green-700 bg-white hover:bg-green-600 hover:text-white  focus:bg-green-700 focus:text-white'
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            <button
              type='button'
              className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-pointer text-green-700 bg-white hover:bg-green-600 hover:text-white  focus:bg-green-700 focus:text-white'
              onClick={() => setShowModal(!showModal)}
            >
              Delete
            </button>
            {showModal && (
              <ModalComponent
                setShowModal={setShowModal}
                postId={post.id}
                token={authData.token}
              />
            )}
          </>
        ) : (
          <>
            <button
              disabled
              title='Only the original author can edit this post'
              type='button'
              className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-help text-green-900 bg-gray-300 '
            >
              Edit
            </button>
            <button
              disabled
              title='Only the original author can delete this post'
              type='button'
              className='h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-help text-green-900 bg-gray-300 '
            >
              Delete
            </button>
          </>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to={'comments'}>Go to post&apos;s comments</Link>
        <button
          style={{ alignSelf: 'flex-end' }}
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

export default Post;
