// src/context/auth-context.js
import { createContext, useState } from 'react';

type TokenObject = {
  token: string;
  email?: string;
  roles?: Array<string>;
};

export type authContextType = {
  auth: TokenObject;
  setAuth: Function;
};

const AuthContext = createContext<authContextType>({
  auth: { token: '' },
  setAuth: () => {},
});
const { Provider } = AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({
    token: '',
  });

  return (
    <Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContext;
