const express = require('express');
const router = express.Router();
const multer = require('multer');
const Video = require('../models/Video');

const upload = multer({ dest: 'uploads/' });

// GET: /upload
router.get('/upload', (req, res) => {
    res.render('add-video-form');
});

// POST: /upload
router.post('/upload', upload.fields([
    { name: 'videoFile', maxCount: 1 }, 
    { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
    
    // Server-side check
    if (!req.body.title || !req.files['videoFile'] || !req.files['thumbnail']) {
        return res.render('add-video-form', { 
            error: "Please fill in all required fields" 
        });
    }

    try {
        const newVideo = new Video({
            title: req.body.title,
            description: req.body.description,
            quality: req.body.quality,
            publishDate: req.body.publishDate,
            videoPath: req.files['videoFile'][0].filename,
            thumbnailPath: req.files['thumbnail'][0].filename
        });

        await newVideo.save();
        req.flash('success_msg', 'Video uploaded successfully!');
        res.redirect('/upload?success=true');
        
    } catch (err) {
        console.error("Database save error:", err);
        res.status(500).send("Error saving video to database.");
    }
});

module.exports = router;