import { Link } from 'react-router-dom';
import { PostPreview } from '../types/types';

const Post = ({ postData }: { postData: PostPreview }) => {
  return (
    <div key={postData.id} className='p-1'>
      <h2 className='text-center'>
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
      <hr />
    </div>
  );
};

export default Post;
