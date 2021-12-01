import { model, Schema } from "mongoose";
import { IPost } from "../interfaces/postInterface";

const postSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
      default: "nopessso",
    },
    img: {
      type: String,
      default:
        "https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg",
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default model<IPost>("Post", postSchema);
