import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/userInterface";

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can delete only your account!");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.query.username?.toString();
    const userId = req.query.userId;
    const user = username
      ? await User.findOne({ username: username })
      : await User.findById(userId);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFriends = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user!.followings!.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList: any[] = [];
    friends.map((friend) => {
      const _id = friend?._id;
      const username = friend?.username;
      const profilePicture = friend?.profilePicture;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(400).json(error);
  }
};

const followUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user!.followers!.includes(req.body.userId)) {
          await user!.updateOne({ $push: { followers: req.body.userId } });
          await currentUser!.updateOne({
            $push: { followings: req.params.id },
          });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you already follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const unfollowUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user!.followers!.includes(req.body.userId)) {
          await user!.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser!.updateOne({
            $pull: { followings: req.params.id },
          });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  // getUserByUsername,
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getFriends,
};
