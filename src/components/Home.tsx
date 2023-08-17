import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to='/create-statement'>Go to create statement page</Link>
      {/* <br />
      <Link to='/admin'>Go to the Admin page</Link>
      <br />
      <Link to='/lounge'>Go to the Lounge</Link>
      <br />
      <Link to='/linkpage'>Go to the link page</Link> */}
    </section>
  );
};

export default Home;
