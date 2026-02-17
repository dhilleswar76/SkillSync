const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Certificate",
  new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    issuedAt: { type: Date, default: Date.now }
  })
);
