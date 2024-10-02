const About = () => {
  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-blue-700 font-bold text-xl'>About</h1>
      <p>
        This is the front-end site of the blog-API project where users can read
        posts and leave comments.
      </p>
      <p>
        For this site I used react and react-router to have a couple of
        different pages, tailwind for styling and typescript for type-safety.
      </p>
      <p>
        As you might have read on the home page there is currently no
        registration needed to leave comments, this means that you won&apos;t be
        able to edit or delete them, so keep that in mind before posting!
      </p>
      <p>
        If you don&apos;t know why you&apos;re here or what I&apos;m talking
        about, you might want to check this out at{' '}
        <a href='https://www.theodinproject.com/lessons/node-path-nodejs-blog-api'>
          The Odin Project
        </a>{' '}
        website then!
      </p>
    </div>
  );
};

export default About;
