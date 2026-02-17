const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Progress",
  new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }]
  }, { timestamps: true })
);
