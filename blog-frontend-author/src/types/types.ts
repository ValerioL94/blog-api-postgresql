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

export type TSignupForm = {
  username: string;
  email: string;
  password: string;
  confirm: string;
  authorKey: string;
  showPassword: boolean;
  showConfirm: boolean;
  showAuthorKey: boolean;
};

export type SignupReducerAction = {
  type: string;
  field?: string;
  payload?: string;
};
