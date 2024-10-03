import { Link } from 'react-router-dom';
import { TPostPreview } from '../types/types';

const PostPreview = ({ postData }: { postData: TPostPreview }) => {
  return (
    <>
      <div className='p-1 break-words'>
        <h2>
          <Link to={postData.id}>
            <strong>{postData.title}</strong>
          </Link>
        </h2>
        <p>
          <strong>Author: </strong>
          {postData.author.username}
        </p>
        <p>
          <strong>Created: </strong>
          {new Date(postData.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Last updated: </strong>
          {new Date(postData.updatedAt).toLocaleString()}
        </p>
      </div>
      <hr />
    </>
  );
};

export default PostPreview;
