import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { auth } = useAuth();
  return (
    <section className='text-left p-5 m-2'>
      <h1 className='text-5xl pb-5'>Home</h1>
      <p className='text-xl'>Links:</p>
      {auth.role === 'Citizen' ? (
        <Link
          to='/documents/create-statement'
          className='link text-blue-500 underline'
        >
          create statement
        </Link>
      ) : null}

      {auth.role === 'Admin' ? (
        <Link to='/user/manage-users' className='link text-blue-500 underline'>
          Manage user accounts
        </Link>
      ) : null}

      {auth.role === 'Super Admin' ? (
        <Link to='/user/change-role' className='link text-blue-500 underline'>
          Change user role
        </Link>
      ) : null}
    </section>
  );
};

export default Home;
