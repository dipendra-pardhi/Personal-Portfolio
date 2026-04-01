const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/authController");
const rateLimiter = require("../middleware/rateLimiter");

// login route
router.post("/login", rateLimiter, loginAdmin);

module.exports = router;
