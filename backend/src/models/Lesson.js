const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Lesson",
  new mongoose.Schema({
    title: String,
    content: String,
    videoUrl: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
  }, { timestamps: true })
);
