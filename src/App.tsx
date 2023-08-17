import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Protected from './components/Protected';
import RequireAuth from './components/RequireAuth';
import UserProfile from './components/UserProfile';
import Unauthorized from './components/Unauthorized';
import Home from './components/Home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='login' element={<Login />} />

            <Route
              element={
                <RequireAuth
                  allowedRoles={['Citizen', 'Admin', 'Super Admin']}
                />
              }
            >
              <Route path='/' element={<Home />} />
            </Route>

            {/* all the routes allowed for super admin role */}
            <Route element={<RequireAuth allowedRoles={['Super Admin']} />}>
              {/* <Route path='/create-admin' element={<CreateAdmin />} /> */}
              {/* <Route path='/create-superadmin' element={<CreateSuperAdmin />} /> */}
            </Route>

            {/* all the routes allowed for admin role */}
            <Route element={<RequireAuth allowedRoles={['Admin']} />}>
              <Route path='protected' element={<Protected />} />
              <Route path='profile' element={<UserProfile />} />
            </Route>

            {/* all the routes allowed for citizen role */}
            <Route element={<RequireAuth allowedRoles={['Citizen']} />}>
              {/* <Route path='create-statement' element={<CreateStatement />} /> */}
            </Route>
          </Route>
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
