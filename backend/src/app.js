const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      "http://localhost:3000",
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    // Check if origin matches allowed origins or is a Vercel deployment
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.includes('vercel.app') ||
                      origin.includes('skill-sync');
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// API Documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "SkillSync API is running", version: "1.0.0" });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/lessons", require("./routes/lessonRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/coding-sheets", require("./routes/codingSheetRoutes"));

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ 
    message: "Route not found",
    path: req.path,
    method: req.method
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
