const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();


const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const aboutMeRoutes = require("./routes/aboutMeRoutes");
const educationRoutes = require("./routes/educationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Load .env
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();


app.use(cors({
  origin: true,      // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true  // allow cookies / auth headers
}));



/* =========================
   🔐 CORS CONFIGURATION
========================= */
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL, // http://localhost:5173
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );


// const allowedOrigins = [
//   "http://127.0.0.1:5174",                        // local frontend
//   "http://localhost:5173",                         // alternate local port
//   "https://personal-portfolio-in-mern-stack.vercel.app" // prod frontend
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true); // server-to-server or Postman
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true
// }));


// app.use(cors({
//   origin: true,      // allow all origins
//   credentials: true
// }));



/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/aboutme", aboutMeRoutes);
app.use("/api/education", educationRoutes);
app.use("/api", uploadRoutes);



/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
