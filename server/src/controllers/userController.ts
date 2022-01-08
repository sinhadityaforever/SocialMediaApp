import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/userInterface";
import cloudinary from "cloudinary";

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    try {
      if (req.body.tempImg) {
        const result = await cloudinary.v2.uploader.upload(req.body.tempImg, {
          upload_preset: "socio",
        });
        const url = result.url;
        console.log("url is: " + url);
        const user = await User.findByIdAndUpdate(
          req.params.userId,
          {
            desc: req.body.desc,
            profilePicture: url,
            city: req.body.city,
            from: req.body.from,
            relationship: req.body.relationship,
          },
          { new: true }
        );
        console.log(user);

        //  const secure_url= result.secure_url;
      } else {
        console.log(req.body);

        const user = await User.findByIdAndUpdate(
          req.params.userId,
          {
            desc: req.body.desc,

            city: req.body.city,
            from: req.body.from,
            relationship: req.body.relationship,
          },
          { new: true }
        );
        console.log("halahaala" + user);
      }

      res
        .status(200)
        .json("Account has been updated")
        .setHeader("Access-Control-Allow-Origin", "*");
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  } catch (error) {
    console.log(error);

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
const testUser = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "Success",
  });
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.query.username?.toString();
    const userId = req.query.userId;
    const user = username
      ? await User.findOne({ username: username })
      : await User.findById(userId);

    res.status(200).json(user).setHeader("Access-Control-Allow-Origin", "*");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFriends = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);

    // let friendsArray = [];
    // const followingList = user?.followings;
    // for (let index = 0; index < followingList!.length; index++) {
    //   let friend = await User.findById(followingList![index]._id);
    //   friendsArray.push(friend);
    // }

    const friends = await Promise.all(
      user!.followings!.map((friendId) => {
        return User.findById(friendId);
      })
    );

    res.status(200).json(friends).setHeader("Access-Control-Allow-Origin", "*");
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
          res
            .status(200)
            .json("user has been followed")
            .setHeader("Access-Control-Allow-Origin", "*");
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
          res
            .status(200)
            .json("user has been unfollowed")
            .setHeader("Access-Control-Allow-Origin", "*");
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

const validateUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.exists({ username: req.params.username });
    if (user) {
      res
        .status(201)
        .json({ message: "There exists a user" })
        .setHeader("Access-Control-Allow-Origin", "*");
    } else {
      res.status(202).json({ message: "Theres no user" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.params.userId);

    const users = await User.find({
      _id: { $nin: req.params.userId as any },
    });
    res.status(200).json(users).setHeader("Access-Control-Allow-Origin", "*");
  } catch (error) {
    console.log(error);
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
  validateUsername,
  getAllUsers,
  testUser,
};
function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
