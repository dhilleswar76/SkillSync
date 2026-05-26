const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true, sparse: true },
    password: String,
    role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
    oauthProvider: { type: String, enum: ["google", "github"], default: undefined },
    // OTP fields removed; authentication uses password or OAuth
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
  }, { timestamps: true })
);
