import { Request, Response } from "express";
const Bug = require("../Models/BugModel");

export const postItem = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      deadline,
      screenshot,
      type,
      status,
      creator,
      developer,
      project,
    } = req.body;
    const bug = await Bug.create({
      title,
      description,
      deadline,
      screenshot,
      type,
      status,
      creator,
      developer,
      project,
    });
    res.status(201).json({ message: "User created successfully", bug });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function for GET /getItem
export const getItem = async (req: Request, res: Response) => {
    try {
      const { bugId } = req.params;
  
      const user = await Bug.findById(bugId).populate("projects");
  
      if (!Bug) {
        return res.status(404).json({ message: "Bug not found" });
      }
  
      res.status(200).json({ message: "Bug fetched successfully", Bug });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Controller function for DELETE /deleteItem
export const deleteItem = async (req: Request, res: Response) => {
    try {
      const { bugId } = req.params;
  
      const user = await Bug.findById(bugId);
  
      if (!user) {
        return res.status(404).json({ message: "Bug not found" });
      }
  
      await Bug.findByIdAndDelete(bugId);
  
      res.status(200).json({ message: "Bug deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const putItem = async (req: Request, res: Response) => {
    try {
      const { bugId } = req.params;
      const {
        title,
        description,
        deadline,
        screenshot,
        type,
        status,
        creator,
        developer,
        project,
      } = req.body;
  
      const bug = await Bug.findByIdAndUpdate(
        bugId,
        {
          title,
          description,
          deadline,
          screenshot,
          type,
          status,
          creator,
          developer,
          project,
        },
        { new: true }
      );
  
      if (!bug) {
        return res.status(404).json({ message: 'Bug not found' });
      }
  
      res.status(200).json({ message: 'Bug updated successfully', bug });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  