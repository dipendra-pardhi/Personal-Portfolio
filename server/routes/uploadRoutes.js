const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

// 🔥 Single image upload
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: req.file.path,     // Cloudinary URL
      publicId: req.file.filename  // Cloudinary public_id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


