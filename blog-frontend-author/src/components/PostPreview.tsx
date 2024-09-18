import { Link } from 'react-router-dom';
import { TPostPreview } from '../types/types';

const PostPreview = ({ postData }: { postData: TPostPreview }) => {
  return (
    <div key={postData.id} className='p-1'>
      <h2>
        <Link to={postData.id}>{postData.title}</Link>
      </h2>
      <p>
        <strong>Author: </strong>
        {postData.author.username}
      </p>
      <p>
        <strong>Published: </strong>
        {postData.published ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Date: </strong>
        {new Date(postData.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default PostPreview;
