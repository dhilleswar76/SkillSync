const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      default: "DSA",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: {
      type: Number,
      default: 40,
    },
    thumbnail: {
      type: String,
      default: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    passingScore: {
      type: Number,
      default: 70,
    },
    modules: [
      {
        title: String,
        duration: String,
        topics: [
          {
            title: String,
            theoryUrl: String,
            videoUrl: String,
            videoChannel: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
