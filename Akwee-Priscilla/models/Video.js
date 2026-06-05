const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  quality: String,
  publishDate: Date,
  videoPath: String, // Store the filename
  thumbnailPath: String, // Store the filename
  views: { type: Number, default: 0 },
  color: { type: String, default: "gray" }, // Placeholder color
});

module.exports = mongoose.model("Video", videoSchema);
