import { NavLink } from 'react-router-dom';
import { useAuth } from '../provider/context';
const Navbar = () => {
  const { authData } = useAuth();
  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? 'text-green-800 bg-white border-2 border-solid border-green-700 rounded-lg p-1 hover:border-lime-400 focus:border-lime-400 hover:no-underline focus:no-underline focus:outline-none'
      : 'text-white border-2 border-solid border-green-700 rounded-lg p-1 hover:border-lime-400 focus:border-lime-400 hover:no-underline focus:no-underline focus:outline-none ';

  return (
    <nav className='w-full max-w-3xl'>
      <ul className='flex items-center justify-evenly p-2 list-none'>
        <li>
          <NavLink to={'home'} className={linkClass}>
            Home
          </NavLink>
        </li>
        {authData ? (
          <>
            <li>
              <NavLink to={'posts'} className={linkClass}>
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink to={'logout'} className={linkClass}>
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={'signup'} className={linkClass}>
                Signup
              </NavLink>
            </li>

            <li>
              <NavLink to={'login'} className={linkClass}>
                Login
              </NavLink>
            </li>
          </>
        )}
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
