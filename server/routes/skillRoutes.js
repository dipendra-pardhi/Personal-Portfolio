const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");  // Cloudinary multer middleware

// Admin-only routes
// Ab POST aur PUT dono me file upload kar sakte hain — multiple files for skills logos
router.post("/", authMiddleware, upload.array("logos"), skillController.createSkill);
router.put("/:id", authMiddleware, upload.array("logos"), skillController.updateSkill);

router.delete("/:id", authMiddleware, skillController.deleteSkill);

// Public routes
router.get("/", skillController.getSkills);
router.get("/:id", skillController.getSkillById);

module.exports = router;
