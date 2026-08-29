const mongoose = require("mongoose");

const codingSheetProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sheetId: {
      type: String,
      required: true,
    },
    completedProblemIds: [
      {
        type: String,
      },
    ],
    starredProblemIds: [
      {
        type: String,
      },
    ],
    notes: {
      type: Map,
      of: String,
      default: {},
    },
    customCode: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

codingSheetProgressSchema.index({ user: 1, sheetId: 1 }, { unique: true });

module.exports = mongoose.model("CodingSheetProgress", codingSheetProgressSchema);
