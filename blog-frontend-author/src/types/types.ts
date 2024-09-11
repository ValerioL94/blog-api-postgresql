export type TokenContext = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};
