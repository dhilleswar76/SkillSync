const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    score: {
      type: Number,
      default: 100,
    },
    grade: {
      type: String,
      default: "A+",
    },
    instructorName: {
      type: String,
      default: "SkillSync Instructor",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Certificate", certificateSchema);
