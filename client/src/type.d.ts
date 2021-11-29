export interface IUser {
  username: string;
  email?: string;
  password?: string;
  profilePictureUrl?: string;
  coverPictureUrl?: string;
  followers?: any[];
  followings?: any[];
  isAdmin?: boolean;
  description?: string;
  city?: string;
  from?: string;
  relationship?: number;
}

export type userProps = {
  user: IUser;
};

//TODO:change userId to string
export interface IPost {
  userId: number;
  desc?: string;
  photo?: string;
  likes?: any[];
}

export type postProps = {
  post: IPost & {
    id: number;
    date: string;
    like: number;
    comment: number;
  };
};
