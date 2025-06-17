import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../lib/utils/generateToken";

export const signup = async (req: Request, res: Response): Promise<void> => {
  // Pull user data from req
  // Validate user inputs based on model requirements (unique, minlength, etc)
  // Hash password
  // Create user using user inputs and hashed password
  // Generate jwt token (sends via cookie)
  // Save user to database

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
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  res.send("Login page");
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.send("Logout page");
};
