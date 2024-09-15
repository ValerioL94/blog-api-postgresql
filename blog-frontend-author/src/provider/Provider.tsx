import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';
import { TAuthContext, TAuthData } from '../types/types';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const localData = localStorage.getItem('authData');
  const defaultData: TAuthData = localData ? JSON.parse(localData) : null;
  const [authData, setAuthData] = useState<TAuthData | null>(defaultData);

  function handleExpiredToken() {
    localStorage.clear();
    setAuthData(null);
  }
  const checkTokenValidity = (token: string) => {
    if (!token) return false;
    const expirationTime = JSON.parse(atob(token.split('.')[1])).exp * 1000;
    return Date.now() < expirationTime;
  };

  useEffect(() => {
    if (authData && checkTokenValidity(authData.token)) {
      localStorage.setItem('authData', JSON.stringify(authData));
      const expirationTime =
        JSON.parse(atob(authData.token.split('.')[1])).exp * 1000;
      const timeUntilExpiration = expirationTime - Date.now();
      setTimeout(handleExpiredToken, timeUntilExpiration);
    } else {
      handleExpiredToken();
    }
  }, [authData]);

  const contextValue: TAuthContext = useMemo(
    () => ({
      authData,
      setAuthData,
    }),
    [authData]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
