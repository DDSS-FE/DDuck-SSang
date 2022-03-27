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
