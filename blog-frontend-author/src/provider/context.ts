import { createContext, useContext } from 'react';
import { TokenContext } from '../types/types';

const defaultContext: TokenContext = {
  token: null,
  setToken: () => null,
};
const AuthContext = createContext(defaultContext);

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };
