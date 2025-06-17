import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userId: any, res: Response) => {
  const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY!, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};
