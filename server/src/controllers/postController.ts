import { Request, Response } from "express";
import { IUser } from "../interfaces/userInterface";
import Post from "../models/postModel";
import User from "../models/userModel";
import cloudinary from "cloudinary";

const createPost = async (req: Request, res: Response): Promise<void> => {
  let savedPost;
  try {
    if (req.body.tempImg) {
      console.log("tempImg is: " + req.body.tempImg);

      const result = await cloudinary.v2.uploader.upload(req.body.tempImg, {
        upload_preset: "socio",
      });
      const url = result.url;
      console.log("url is: " + url);

      //  const secure_url= result.secure_url;
      const newPost = new Post({
        userId: req.body.userId,
        desc: req.body.desc,
        img: url,
      });
      savedPost = await newPost.save();
    } else {
      const newPost = new Post(req.body);
      savedPost = await newPost.save();
    }

    res
      .status(200)
      .json(savedPost)
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (post!.userId === req.body.userId) {
      await post!.updateOne({ $set: req.body });
      res
        .status(200)
        .json("the post has been updated")
        .setHeader("Access-Control-Allow-Origin", "*");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (post!.userId === req.body.userId) {
      await post!.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const toggleLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post!.likes!.includes(req.body.userId)) {
      await post!.updateOne({ $push: { likes: req.body.userId } });
      res
        .status(200)
        .json("The post has been liked")
        .setHeader("Access-Control-Allow-Origin", "*");
    } else {
      await post!.updateOne({ $pull: { likes: req.body.userId } });
      res
        .status(200)
        .json("The post has been disliked")
        .setHeader("Access-Control-Allow-Origin", "*");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post).setHeader("Access-Control-Allow-Origin", "*");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTimelinePosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser!._id });
    const friendPosts = await Promise.all(
      currentUser!.followings!.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res
      .status(200)
      .json(userPosts.concat(...friendPosts))
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("called");

    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user!._id });

    res.status(200).json(posts).setHeader("Access-Control-Allow-Origin", "*");
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  getPosts,
  getTimelinePosts,
  getUserPosts,
};
