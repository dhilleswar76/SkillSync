const express = require("express");
const router = express.Router();
const { getQuiz, createQuiz } = require("../controllers/quizController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

router.get("/:lessonOrCourseId", getQuiz);
router.post("/", protect, adminOnly, createQuiz);

module.exports = router;
