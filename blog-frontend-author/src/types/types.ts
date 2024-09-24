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

export type TPostPreview = Omit<TPostDetail, 'comments'>;

export type TPostList = TPostPreview[];

export type TinyMCEEVent = { target: { name: string; value: string } };

export type TPostCreate = {
  title: string;
  content: string;
  published: string;
  authorId: string;
};
export type TPostUpdate = Omit<TPostCreate, 'authorId'>;

export type TPostDetail = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    username: string;
    email: string;
  };
  comments?: TCommentList;
};

export type TCommentDetail = {
  id: string;
  username: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
};

export type TCommentList = TCommentDetail[];

export type TCommentUpsert = {
  content: string;
  username: string;
};
