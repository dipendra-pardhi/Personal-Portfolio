const express = require("express");
const router = express.Router();
const educationController = require("../controllers/educationController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Admin-only routes with logo upload support
router.post("/", authMiddleware, upload.single("logoUrl"), educationController.createEducation);
router.put("/:id", authMiddleware, upload.single("logoUrl"), educationController.updateEducation);

// Delete route
router.delete("/:id", authMiddleware, educationController.deleteEducation);

// Public routes
router.get("/", educationController.getAllEducation);
router.get("/:id", educationController.getEducationById);

module.exports = router;
