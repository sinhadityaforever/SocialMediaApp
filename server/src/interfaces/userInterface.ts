import { Document } from "mongoose";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
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
