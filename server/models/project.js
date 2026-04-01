// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  techStack: { 
    type: [String], 
    required: true 
  },  // Array of tech names
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: false 
  },  // URL of project image
  liveLink: { 
    type: String, 
    required: false 
  }, // URL to live project
  githubLink: { 
    type: String, 
    required: false 
  }, // URL to github repo
}, {
  timestamps: true,  // createdAt and updatedAt
});

module.exports = mongoose.model("Project", projectSchema);
