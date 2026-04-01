const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5,                 // 5 attempts
  message: {
    message: "Too many login attempts. Try again later."
  }
});

module.exports = rateLimiter;
