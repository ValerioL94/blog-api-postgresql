export type TValidationError = {
  message: string;
};
export type TValidationErrors = TValidationError[];

export type TPostPreview = Omit<TPostDetail, 'comments'>;

export type TPostList = TPostPreview[];

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
  post: {
    title: string;
  };
};

export type TCommentList = TCommentDetail[];

export type TCommentInsert = {
  content: string;
  username: string;
};
