import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../configs/environment.config";

export interface AuthRequest extends Request {
  userId?: number;
  username?: string
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    //Verify and decode token
    const decodeToken = jwt.verify(token, env.SECRET_KEY) as {
      userId: number;
      username: string;
    };
    
    req.userId = decodeToken.userId;
    req.username = decodeToken.username;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
};
