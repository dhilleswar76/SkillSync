const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Course",
  new mongoose.Schema({
    title: String,
    description: String,
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }]
  }, { timestamps: true })
);
