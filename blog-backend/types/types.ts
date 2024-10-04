import { Request } from 'express';

export type TSignupBody = {
  username: string;
  email: string;
  password: string;
  confirm: string;
  authorKey: string;
};

export type TLoginBody = Pick<TSignupBody, 'email' | 'password'>;

export interface IUser extends Pick<TSignupBody, 'username' | 'email'> {
  id: string;
}

export interface ISignupRequest extends Request {
  body: TSignupBody;
}

export type TPostCreateBody = {
  title: string;
  content: string;
  published: string;
  authorId: string;
};

export interface IPostCreateRequest extends Request {
  body: TPostCreateBody;
}

export type TPostUpdateBody = Omit<TPostCreateBody, 'authorId'>;

export interface IPostUpdateRequest extends Request {
  body: TPostUpdateBody;
}

export type TCommentBody = {
  username: string;
  content: string;
};

export interface ICommentUpsertRequest extends Request {
  body: TCommentBody;
}
