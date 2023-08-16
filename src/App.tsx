import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Protected from './components/Protected';
import RequireAuth from './components/RequireAuth';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='login' element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path='protected' element={<Protected />} />
              <Route path='profile' element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
