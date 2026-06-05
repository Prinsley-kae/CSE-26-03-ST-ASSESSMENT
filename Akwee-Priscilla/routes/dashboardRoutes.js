const express = require("express");
const router = express.Router();
const Video = require("../models/Video"); // Ensure this path points to your model file

router.get("/dashboard", async (req, res) => {
  try {
    // Fetch all videos from the database
    // .sort({ _id: -1 }) ensures the newest videos appear first
    const videos = await Video.find().sort({ _id: -1 }).lean(); 
    
    // Render the dashboard with the dynamic data
    res.render("dashboard", { videos });
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).send("Server Error: Unable to load dashboard");
  }
});

module.exports = router;