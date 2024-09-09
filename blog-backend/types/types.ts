import { Request } from 'express';

export type TSignupBody = {
  username: string;
  email: string;
  password: string;
  confirm: string;
};

export type TLoginBody = Pick<TSignupBody, 'email' | 'password'>;

export interface IUser extends Pick<TSignupBody, 'username' | 'email'> {
  id: string;
}

export interface ISignupRequest extends Request {
  body: TSignupBody;
}

export type Payload = {
  id: string;
};
