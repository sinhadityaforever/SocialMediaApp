export interface IUser {
  username: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: any[];
  followings?: any[];
  isAdmin?: boolean;
  desc?: string;
  city?: string;
  from?: string;
  relationship?: number;
}

export type userProps = {
  user: IUser;
};

//TODO:change userId to string
export interface IPost {
  userId: string;
  desc?: string;
  img?: string;
  likes?: any[];
  createdAt?: Date;
}

export type postProps = {
  post: IPost & {
    _id: string;
    date: string;
    like: number;
    comment: number;
  };
};
