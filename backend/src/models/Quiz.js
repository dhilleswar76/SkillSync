const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    question: String,
    options: [String],
    correctAnswer: Number
  })
);
