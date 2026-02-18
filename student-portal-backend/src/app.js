const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
