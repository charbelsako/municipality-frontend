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
            <li className='link'>
              <Link to='/document/my'>My Documents</Link>
            </li>
            <li className='link'>
              <Link to='/profile'>My profile</Link>
            </li>
            <li className='link'>
              <button onClick={signOut}>Logout</button>
            </li>
          </>
        )}
        {!auth.email && (
          <>
            <li className='link'>
              <Link to='/login'>Login</Link>
            </li>
            <li className='link'>Sign up</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
