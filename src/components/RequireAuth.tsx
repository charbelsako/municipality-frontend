import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type RequireAuthProps = {
  allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();

  const location = useLocation();
  console.log(auth, allowedRoles.includes(auth.role!));
  return auth.role && allowedRoles.includes(auth.role) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};
export default RequireAuth;
