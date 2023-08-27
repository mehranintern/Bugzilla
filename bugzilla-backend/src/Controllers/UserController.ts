import { Request, Response } from "express";
import { Project } from "../Models/ProjectModel";
import {JWT_SECRET} from "../Constants/jwt";
import { getUser } from "../Services/UserService";


const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


export const userlogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email, password);
    const token = {
      User: User.id,
    };

    const authToken = jwt.sign(token, JWT_SECRET);
    const authObj = { authToken, user_type: user.user_type };

    return res.json(authObj);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};
// Controller function for POST /postItem
export const postItem = async (req: Request, res: Response) => {
  try {
    const { name, email, password, user_type } = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const projects: Array<string> = req.body.projects;
    let PROJECT = new Array();

    for (let i = 0; i < projects?.length; ++i) {
      const project = await Project.findById(projects[i]);
      PROJECT.push(project);
    }

    const user = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      user_type: user_type,
      projects: PROJECT,
    });
    const token = {
      User: User.id,
    };
    const authToken = jwt.sign(token, JWT_SECRET);
    res.status(201).json({ message: "User created successfully", authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function for GET /getItem
export const getItem = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("projects");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function for DELETE /deleteItem
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function for PUT /putItem
export const putItem = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, email, password, user_type, projects } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name,
        email: email,
        password: password,
        user_type: user_type,
        projects: projects,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
