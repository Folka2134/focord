import { NextFunction, Request, Response } from "express";

export const protectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Middleware to protect routes
  // Grab token from cookies
  // Decode the token (verify)
  // Find user by ID from token
  // Add user to the request
};
