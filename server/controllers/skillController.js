const Skill = require("../models/skill");

// Helper function: assign uploaded file URLs to req.body.skills array
function assignLogosToSkills(skills = [], files = []) {
  if (!Array.isArray(skills)) return [];
  if (!files.length) return skills;

  for (let i = 0; i < skills.length; i++) {
    if (files[i]) {
      skills[i].logo = files[i].path;
    }
  }
  return skills;
}



// Create new skill
exports.createSkill = async (req, res) => {
  try {
    const data = { ...req.body };

    // req.body.skills JSON string ho sakta hai agar form-data me bheja hai
    if (typeof data.skills === "string") {
      data.skills = JSON.parse(data.skills);
    }

    // Assign logos URLs from uploaded files
    data.skills = assignLogosToSkills(data.skills, req.files);

    const skill = new Skill(data);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update skill by ID
exports.updateSkill = async (req, res) => {
  try {
    const data = { ...req.body };

    if (typeof data.skills === "string") {
      data.skills = JSON.parse(data.skills);
    }

    data.skills = assignLogosToSkills(data.skills, req.files);

    const skill = await Skill.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Rest of the controller functions remain same
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

