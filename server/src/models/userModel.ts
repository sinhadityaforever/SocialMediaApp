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
        "https://media.istockphoto.com/vectors/blank-opened-book-magazine-and-notebook-template-with-soft-shadows-on-vector-id1162499064?k=20&m=1162499064&s=612x612&w=0&h=wG2ku-XjDYvHdtq3VnzVdbOQAf_VOf0fOycPIBdS_5U=",
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
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
