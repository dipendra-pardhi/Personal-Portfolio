const Project = require("../models/project");

// helper function
const normalizeTechStack = (techStack) => {
  if (!techStack) return [];

  // Agar array already hai
  if (Array.isArray(techStack)) return techStack;

  // Agar JSON string hai
  if (typeof techStack === "string") {
    try {
      const parsed = JSON.parse(techStack);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // comma separated string
      return techStack.split(",").map(t => t.trim());
    }
  }

  return [];
};

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const data = { ...req.body };

    // ✅ FIX HERE
    data.techStack = normalizeTechStack(req.body.techStack);

    if (req.file) {
      data.image = req.file.path;
    }

    const project = new Project(data);
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const data = { ...req.body };

    // ✅ FIX HERE
    data.techStack = normalizeTechStack(req.body.techStack);

    if (req.file) {
      data.image = req.file.path;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUBLIC ROUTES (unchanged)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
