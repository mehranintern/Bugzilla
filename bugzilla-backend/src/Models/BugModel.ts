//Bugs Schema
import mongoose from "mongoose";

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  deadline: Date,
  screenshot: {
    type: String, // Assuming you store the image URL or path
    validate: {
      validator: function (v: string) {
        // You can add custom validation logic here, e.g., check file extension
        // This is just a placeholder
        return v.endsWith(".png") || v.endsWith(".gif");
      },
      message: "Invalid file format for screenshot",
    },
  },
  type: {
    type: String,
    enum: ["feature", "bug"],
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "started", "resolved"],
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;

export { Bug };
