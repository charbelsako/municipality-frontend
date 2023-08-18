import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/api/v1/auth/refresh', {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      return {
        ...prev,
        role: response.data.data.role,
        token: response.data.data.accessToken,
        email: response.data.data.email,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
