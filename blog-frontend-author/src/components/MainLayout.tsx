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
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Copyright © 2024 ValerioL94</p>
        <a className='git-link' href='https://github.com/ValerioL94'>
          <img
            className='logo'
            src='/assets/icons/github-mark-white.svg'
            alt='github logo'
          />
        </a>
      </footer>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
