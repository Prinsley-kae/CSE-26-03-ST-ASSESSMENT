const express = require('express');
const router = express.Router();

// The Landing Page route
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;