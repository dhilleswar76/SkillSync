const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/lessons", require("./routes/lessonRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

module.exports = app;
const errorHandler = require("./middlewares/errorMiddleware");
app.use(errorHandler);
