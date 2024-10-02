const Footer = () => {
  return (
    <footer className='w-full flex items-center justify-center gap-2 border-t-2 border-gray-500 bg-blue-700 font text-white'>
      <p>Copyright © 2024 ValerioL94</p>
      <a
        className='hover:animate-pulse focus:animate-pulse'
        href='https://github.com/ValerioL94'
      >
        <img
          className='h-6'
          src='/assets/icons/github-mark-white.svg'
          alt='github logo'
        />
      </a>
    </footer>
  );
};

export default Footer;
