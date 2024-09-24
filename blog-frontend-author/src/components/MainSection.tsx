import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const MainSection = () => {
  return (
    <main className='flex flex-col items-center h-full bg-green-50 sm:p-4 box-border'>
      <Outlet />
      <ToastContainer />
    </main>
  );
};

export default MainSection;
