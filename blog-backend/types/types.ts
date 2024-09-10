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

export type TPostBody = {
  title: string;
  content: string;
  published: string;
  authorId: string;
};

export interface IPostRequest extends Request {
  body: TPostBody;
}

export type TUpdateBody = Omit<TPostBody, 'authorId'>;

export interface IUpdateRequest extends Request {
  body: TUpdateBody;
}
