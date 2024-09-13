import { createContext, useContext } from 'react';
import { TAuthContext } from '../types/types';

const defaultContext: TAuthContext = {
  authData: null,
  setAuthData: () => null,
};
const AuthContext = createContext(defaultContext);
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };
