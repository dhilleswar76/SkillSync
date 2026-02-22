const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["student", "admin"], default: "student" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
  }, { timestamps: true })
);
