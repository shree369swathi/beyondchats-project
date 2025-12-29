const mongoose = require("mongoose");

/**
 * Article Schema
 * Stores blog articles for BeyondChats
 */
const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    originalUrl: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["original", "updated"],
      default: "original"
    },
    references: {
      type: [String],
      default: []
    },
    seoKeywords: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true // automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Article", articleSchema);
