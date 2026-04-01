const Education = require("../models/education");

// Create new education entry
exports.createEducation = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logoUrl = req.file.path;  // Cloudinary URL
    }

    const education = new Education(data);
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all education entries
exports.getAllEducation = async (req, res) => {
  try {
    const educationList = await Education.find().sort({ createdAt: -1 });
    res.status(200).json(educationList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single education entry by ID
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ message: "Education not found" });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update education entry by ID
exports.updateEducation = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logoUrl = req.file.path;  // Cloudinary URL
    }

    const education = await Education.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!education) return res.status(404).json({ message: "Education not found" });
    res.status(200).json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete education entry by ID
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ message: "Education not found" });
    res.status(200).json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
