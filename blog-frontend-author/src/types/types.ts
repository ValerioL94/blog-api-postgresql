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

export type PostPreview = Omit<PostDetail, 'comments'>;

export type PostList = PostPreview[];

export type PostCreate = {
  title: string;
  content: string;
  published: boolean;
  authorId: string;
};
export type PostUpdate = Omit<PostCreate, 'authorId'>;

export type PostDetail = {
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
  comments?: CommentList;
};

export type CommentDetail = {
  id: string;
  username: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
};

export type CommentList = CommentDetail[];

export type CommentUpsert = {
  content: string;
  username: string;
};
