import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <nav className='bg-black/40 h-[40px] flex items-center justify-end pr-5'>
      <ul className='flex space-x-4'>
        {auth.email && (
          <>
            <li>
              <Link to='/create-statement' className='link'>
                Create Statement Document
              </Link>
            </li>
            <li>
              <Link to='/document/my' className='link'>
                My Documents
              </Link>
            </li>
            <li>
              <Link to='/profile' className='link'>
                My profile
              </Link>
            </li>
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          </>
        )}
        {!auth.email && (
          <>
            <li>
              <Link to='/login' className='link'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/signup' className='link'>
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
