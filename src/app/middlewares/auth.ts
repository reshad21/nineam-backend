import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import User from "../models/User";
// Adjust the import path as needed based on your project structure

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret")
    const userId = typeof decoded === "object" && decoded !== null && "userId" in decoded ? (decoded as any).userId : null;
    if (!userId) {
      return res.status(401).json({ message: "Token is not valid" })
    }
    const user = await User.findById(userId).select("-password")

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" })
  }
}

export default auth;
