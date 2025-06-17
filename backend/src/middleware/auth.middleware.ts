import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { UserType } from "../../types/express";

interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - No Token Provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Invalid Token" });
      return;
    }

    const user = (await User.findById(decoded.userId).select(
      "-password",
    )) as UserType;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectedRoutes middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
