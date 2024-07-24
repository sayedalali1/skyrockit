const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        // Look up the user from req.session and populate applications
        const currentUser = await User.findById(req.session.user._id).populate('applications');

        // Render the index view and pass the applications to it
        res.render('applications/index.ejs', { applications: currentUser.applications, user: currentUser });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('applications/new.ejs', { user: req.session.user });
});

router.post('/', async (req, res) => {
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);

        // Modify the date part of the form
        req.body.date = new Date(req.body.date);

        // Push req.body (the new form data object) to the applications array of the current user
        currentUser.applications.push(req.body);

        // Save changes to the user
        await currentUser.save();

        // Redirect back to the applications index view
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
