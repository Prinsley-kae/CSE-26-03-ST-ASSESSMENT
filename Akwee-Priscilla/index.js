const express = require('express');
// 1. Rename this to 'session' to match your usage
const session = require('express-session'); 
// 2. Add this line to require the flash library
const flash = require('connect-flash'); 
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const connectDb = require('./config/start');

const app = express();
const port = 3000;

// Database connection
connectDb();

// View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 1. Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// flash setup
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
// ROUTES
app.use('/', require('./routes/indexRoutes'));
app.use('/', require('./routes/dashboardRoutes'));
app.use('/', require('./routes/video-formRoutes')); // Updated to /upload

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));