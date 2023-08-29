//Project schema
import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  bugs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bug',
    },
  ],
  description:
  {
    type: String,
    required: true,
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

export { Project };