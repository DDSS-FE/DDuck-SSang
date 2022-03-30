import { IUserData } from 'store/modules/user';

export interface ICommentData {
  id: number;
  attributes: ICommentAttributes;
}

export interface ICommentAttributes {
  content: string;
  articleName: string;
  articleUrl: string;
  articleImage: {
    width: number;
    height: number;
    contentURL: string;
  };
  articleProvider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  likes: {
    data: ILike[];
  };
  user: {
    data: {
      id: number;
      attributes: {
        blocked: boolean;
        confirmed: boolean;
        createdAt: string;
        email: string;
        provider: string;
        updatedAt: string;
        username: string;
      };
    };
  };
}

interface ILike {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface IAllLikeData {
  id: number;
  attributes: IAllLikeAttributes;
}

interface IAllLikeAttributes {
  comments: IComments;
  createdAt: string;
  updatedAt: string;
  users: IUsers;
}

export interface IComments {
  data: ICommentData[];
}

interface IUsers {
  data: IUserData[];
}

export interface IAllLike {
  data: IAllLikeData[];
}

export interface IArticleSummary {
  articleName: string;
  articleUrl: string;
  articleImage: {
    width: number;
    height: number;
    contentURL: string;
  };
  articleProvider: string;
}
