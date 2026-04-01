const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true }, // e.g. "Bachelors of Technology - CSE"
  institute: { type: String, required: true }, // e.g. "Baderia Global Institute Of Engineering and Management"
  location: { type: String }, // optional, e.g. "Jabalpur"
  startDate: { type: Date }, // e.g. Sept 2023
  endDate: { type: Date }, // e.g. July 2027
  grade: { type: String }, // e.g. "7.81 CGPA"
  description: { type: String }, // long text describing the experience, courses, skills
  logoUrl: { type: String }, // optional URL to institute logo image
}, {
  timestamps: true,
});

module.exports = mongoose.model("Education", educationSchema);
