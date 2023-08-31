import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { auth } = useAuth();
  return (
    <section className='text-left p-5 m-2'>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <p className='text-2xl'>Links:</p>
      {auth.role === 'Citizen' ? (
        <Link
          to='/documents/create-statement'
          className='link text-blue-500 underline'
        >
          create statement
        </Link>
      ) : null}

      {auth.role === 'Admin' ? (
        <Link to='/user/create-admin' className='link text-blue-500 underline'>
          create statement
        </Link>
      ) : null}
    </section>
  );
};

export default Home;
