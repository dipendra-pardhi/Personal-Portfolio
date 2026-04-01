const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Admin-only routes with image upload (single image)
router.post("/", authMiddleware, upload.single("image"), projectController.createProject);
router.put("/:id", authMiddleware, upload.single("image"), projectController.updateProject);

// Delete route remains same
router.delete("/:id", authMiddleware, projectController.deleteProject);

// Public routes
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);

module.exports = router;
