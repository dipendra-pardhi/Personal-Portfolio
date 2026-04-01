const express = require("express");
const router = express.Router();
const aboutMeController = require("../controllers/aboutMeContoller");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public route
router.get("/", aboutMeController.getAboutMe);

// 🔥 Admin-only update with image upload
router.put(
  "/",
  authMiddleware,
  upload.single("profileImage"),   // 👈 Cloudinary upload
  aboutMeController.updateAboutMe
);

module.exports = router;
