import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
const MainLayout = () => {
  return (
    <>
      <header className='flex justify-center text-white bg-green-700 font-semibold border-b-2 border-gray-500 sticky top-0 '>
        <Navbar />
      </header>
      <main className='flex flex-col items-center h-full bg-green-50 p-4 box-border'>
        <Outlet />
        <ToastContainer />
      </main>
      <footer className='w-full flex items-center justify-center gap-2 border-t-2 border-gray-500 bg-green-700 font text-white'>
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
    </>
  );
};

export default MainLayout;
