const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: [
    {
      name: { type: String, required: true },
      logo: { type: String, required: false }
    }
  ]
});

module.exports = mongoose.model("Skill", skillSchema);



