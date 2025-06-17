import { Request } from "express";

interface UserType {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  avatarUrl?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
