const mongoose = require("mongoose");

const aboutMeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true }, // Description
  resumeUrl: { type: String, required: true },

  // 🔥 NEW: profile image (Cloudinary URL)
  profileImage: { type: String },

  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    leetcode: { type: String },
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("AboutMe", aboutMeSchema);
