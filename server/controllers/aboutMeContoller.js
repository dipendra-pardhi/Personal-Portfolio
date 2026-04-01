const AboutMe = require("../models/aboutMe");

// Get About Me (public)
exports.getAboutMe = async (req, res) => {
  try {
    const aboutMe = await AboutMe.findOne();
    if (!aboutMe) {
      return res.status(404).json({ message: "About Me not found" });
    }
    res.json(aboutMe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 Update About Me (admin + cloudinary)
exports.updateAboutMe = async (req, res) => {
  try {
    const data = { ...req.body };

    // 🔥 Agar image upload hui hai
    if (req.file) {
      data.profileImage = req.file.path; // Cloudinary URL
    }

    let aboutMe = await AboutMe.findOne();

    // Agar pehle se nahi hai → create
    if (!aboutMe) {
      aboutMe = new AboutMe(data);
      await aboutMe.save();
      return res.status(201).json(aboutMe);
    }

    // Agar pehle se hai → update
    Object.assign(aboutMe, data);
    await aboutMe.save();

    res.json(aboutMe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
