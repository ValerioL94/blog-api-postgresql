import { NavLink } from 'react-router-dom';
import { useAuth } from '../provider/context';
const Navbar = () => {
  const { token } = useAuth();
  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? 'text-green-800 bg-white border-2 border-solid border-green-800 rounded-lg p-1 no-underline hover:border-lime-400 focus:border-lime-400 focus:outline-none animate-bounce'
      : 'text-white border-2 border-solid border-green-700 rounded-lg p-1 no-underline hover:border-lime-400 focus:border-lime-400 focus:outline-none';

  return (
    <nav className='w-full max-w-3xl'>
      <ul className='flex items-center justify-evenly p-2 list-none'>
        <li>
          <NavLink to={'home'} className={linkClass}>
            Home
          </NavLink>
        </li>
        {token ? (
          <>
            <li>
              <NavLink to={'posts'} className={linkClass}>
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink to={'logout'} className={linkClass}>
                Log-out
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={'signup'} className={linkClass}>
                Sign-up
              </NavLink>
            </li>

            <li>
              <NavLink to={'login'} className={linkClass}>
                Log-in
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
