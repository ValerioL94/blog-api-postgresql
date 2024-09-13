const About = () => {
  return (
    <div className='flex flex-col gap-2 p-4 w-full max-w-3xl rounded bg-white shadow-md shadow-gray-500'>
      <h1 className='text-center text-green-700 font-bold text-xl'>About</h1>
      <p>
        This is the front-end site of the blog-API project where registered
        authors can create, read, update and delete both posts and comments.
      </p>
      <p>
        This site is intended to be used by registered users. If you don&apos;t
        have an account you won&apos;t be able to do much here.
      </p>
      <p>
        If you don&apos;t know why you&apos;re here or what I&apos;m talking
        about, you might want to check this out at{' '}
        <a href='https://www.theodinproject.com/lessons/node-path-nodejs-blog-api'>
          The Odin Project{' '}
        </a>
        website!
      </p>
    </div>
  );
};

export default About;
