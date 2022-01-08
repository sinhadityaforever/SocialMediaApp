import { Request, Response } from "express";
import { IUser } from "../interfaces/userInterface";
import User from "../models/userModel";
import bcrypt from "bcrypt";
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    //hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create user
    const user: IUser & {
      _id: any;
    } = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save new user
    const newUser: IUser & {
      _id: any;
    } = await user.save();
    res
      .status(200)
      .json({
        message: "success",
        user: newUser,
      })
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);

    const user = await User.findOne({ email: req.body.email });
    console.log(user);

    if (!user) {
      res.status(501).json({
        message: "Error loading user",
      });
      return;
    }

    const validPassword: boolean = await bcrypt.compare(
      req.body.password,
      user!.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user).setHeader("Access-Control-Allow-Origin", "*");
  } catch (err) {
    res.status(500).json({
      message: "failed",
      error: err,
    });
  }
};

export { register, login };
