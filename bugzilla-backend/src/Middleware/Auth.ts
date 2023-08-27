import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../Constants/jwt";

const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

export interface AuthenticatedUserRequest extends Request {
  user?: any;
}

export const getDeveloperORqa = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
) => {
  await authenticateUserType(req, res, next, "developer", "qa");
};

export const getManagerORqa = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
) => {
  await authenticateUserType(req, res, next, "manager", "qa");
};

export const getManager = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
) => {
  await authenticateUserType(req, res, next, "manager");
};

export const getDeveloper = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
) => {
  await authenticateUserType(req, res, next, "developer");
};
export const getQA = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
) => {
  await authenticateUserType(req, res, next, "qa");
};

export const authenticateUserType = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction,
  ...userTypes: string[]
) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "Access Denied." });
  }
  try {
    const decryptedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decryptedToken.user);

    if (userTypes.includes(user.user_type)) {
      req.user = decryptedToken.user;
      next();
    } else {
      return res.status(401).json({ error: "Access Denied." });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Access Denied." });
  }
};