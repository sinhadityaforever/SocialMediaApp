import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default:
        "http://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png",
    },
    coverPicture: {
      type: String,
      default:
        "https://cultivatedculture.com/wp-content/uploads/2019/05/Chromatic-LinkedIn-Cover-Photo-Background-1024x311.png",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
