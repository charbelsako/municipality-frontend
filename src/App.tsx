import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Protected from './components/Protected';
import RequireAuth from './components/RequireAuth';
import UserProfile from './components/UserProfile';
import Unauthorized from './components/Unauthorized';
import Home from './components/Home';
import CreateStatement from './components/CreateStatement';
import PersistLogin from './components/PersistLogin';
import CreateAdmin from './components/CreateAdmin';
import CreateSuperAdmin from './components/CreateSuperAdmin';
import MyDocuments from './components/MyDocuments';
import CreateCitizen from './components/CreateCitizen';
import DocumentDetails from './components/DocumentDetails';
import ChangePassword from './components/ChangePassword';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<CreateCitizen />} />
            {/* <Route path='signup' element={<Signup />} /> */}

            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={['Citizen', 'Admin', 'Super Admin']}
                  />
                }
              >
                {/* This will be the dashboard of all roles */}
                <Route path='/' element={<Home />} />
                <Route path='profile' element={<UserProfile />} />
              </Route>

              {/* all the routes allowed for super admin role */}
              <Route element={<RequireAuth allowedRoles={['Super Admin']} />}>
                <Route path='/user/create-admin' element={<CreateAdmin />} />
                <Route
                  path='/user/create-superadmin'
                  element={<CreateSuperAdmin />}
                />
              </Route>

              {/* all the routes allowed for admin role */}
              <Route element={<RequireAuth allowedRoles={['Admin']} />}>
                <Route path='protected' element={<Protected />} />
              </Route>

              {/* all the routes allowed for citizen role */}
              <Route
                element={<RequireAuth allowedRoles={['Citizen', 'Admin']} />}
              >
                <Route
                  path='/documents/create-statement'
                  element={<CreateStatement />}
                />
                <Route path='/document/my' element={<MyDocuments />} />
                <Route path='/documents/:id' element={<DocumentDetails />} />
                <Route
                  path='/user/change-password'
                  element={<ChangePassword />}
                />
              </Route>
            </Route>
          </Route>
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
