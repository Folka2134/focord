import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../lib/utils";

export const signup = async (req: any, res: any) => {
  const { fullName, userName, email, password, avatarUrl } = req.body;
  try {
    if (!fullName || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Check if username already exists
    const exisintUserName = await User.findOne({ userName });
    if (exisintUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      avatarUrl,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
      });
    } else {
      res.status(400).json({ message: "User creation failed" });
    }
  } catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = (req: any, res: any) => {
  res.send("Login Page");
};

export const logout = (req: any, res: any) => {
  res.send("Logout Page");
};
