const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Comment",
  new mongoose.Schema({
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String
  }, { timestamps: true })
);
