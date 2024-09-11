import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';

const checkTokenValidity = (token: string) => {
  if (!token) return false;
  const expirationTime = JSON.parse(atob(token.split('.')[1])).exp * 1000;
  return Date.now() < expirationTime;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') ? localStorage.getItem('token') : null
  );
  function handleExpiredToken() {
    localStorage.removeItem('token');
    setToken(null);
  }
  useEffect(() => {
    if (token && checkTokenValidity(token)) {
      localStorage.setItem('token', JSON.stringify(token));
      const expirationTime = JSON.parse(atob(token.split('.')[1])).exp * 1000;
      const timeUntilExpiration = expirationTime - Date.now();
      setTimeout(handleExpiredToken, timeUntilExpiration);
    } else {
      handleExpiredToken();
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
