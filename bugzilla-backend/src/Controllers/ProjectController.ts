import { Request, Response } from "express";
const Project = require("../Models/ProjectModel");

// Controller function for POST /projects
export const postItem = async (req: Request, res: Response) => {
  try {
    const { name, users, bugs } = req.body;

    const project = await Project.create({
      name: name,
      users: users,
      bugs: bugs,
    });

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Controller function for GET /projects
export const getItem = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();

    res.status(200).json({ message: 'Projects fetched successfully', projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Controller function for PUT /projects/:projectId
export const putItem = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { name, users, bugs } = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        name: name,
        users: users,
        bugs: bugs,
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function for DELETE /projects/:projectId
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
