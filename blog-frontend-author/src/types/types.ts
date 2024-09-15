export type TUser = {
  id: string;
  username: string;
  email: string;
};

export type TAuthData = {
  token: string;
  user: TUser;
};

export type TAuthContext = {
  authData: TAuthData | null;
  setAuthData: React.Dispatch<React.SetStateAction<TAuthData | null>>;
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

export type TSignupReducerAction = {
  type: string;
  field: string;
  payload: string;
};

export type TValidationError = {
  message: string;
};
export type TValidationErrors = TValidationError[];
