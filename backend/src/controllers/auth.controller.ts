import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../lib/utils/generateToken";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, userName, email, password } = req.body;

  try {
    if (!fullName || !userName || !email || !password) {
      res.status(400).json({ message: "All fields must be filled" });
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
      return;
    }

    const userEmailExists = await User.findOne({ email });
    if (userEmailExists) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const userNameExists = await User.findOne({ userName });
    if (userNameExists) {
      res.status(400).json({ message: "Username unavailable" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    if (user) {
      await user.save();
      generateToken(user._id, res);
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("Error in the login controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "All fields must be filled" });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    console.log("Error in the login controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in the login controller");
    res.status(500).json({ message: "Internal server error" });
  }
};
