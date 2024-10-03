import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? 'text-blue-800 bg-white border-2 border-solid border-blue-700 rounded-lg p-1 hover:border-sky-400 focus:border-sky-400 hover:no-underline focus:no-underline focus:outline-none'
      : 'text-white border-2 border-solid border-blue-700 rounded-lg p-1 hover:border-sky-400 focus:border-sky-400 hover:no-underline focus:no-underline focus:outline-none ';

  return (
    <nav className='w-full max-w-3xl'>
      <ul className='flex items-center justify-evenly p-2 list-none'>
        <li>
          <NavLink to={'home'} className={linkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={'posts'} className={linkClass}>
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink to={'about'} className={linkClass}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
