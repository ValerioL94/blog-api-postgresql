export type TUser = {
  id: string;
  username: string;
  email: string;
};

export type TAuthData = {
  token: string;
  user: TUser;
} | null;
export type TAuthContext = {
  authData: TAuthData;
  setAuthData: React.Dispatch<React.SetStateAction<TAuthData>>;
};
