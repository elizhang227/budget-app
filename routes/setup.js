const express = require('express'),
    router = express.Router(),
    setupModel = require('../models/setup');

router.get('/', async function(req, res, next) {
    res.render('template', {
        locals: {
            title: `Welcome to my dungeon`,//${req.session.first_name}`,
            is_logged_in: req.session.is_logged_in,
            userName: req.session.first_name
            // booksList: allBooks,
            // is_logged_in: req.session.is_logged_in,
            // userName: req.session.first_name,
            // email: req.session.email
        },
        partials: {
            content: 'partial-setup'
        }
    })
})

router.post('/', async function(req, res, next) {
    const { budget } = req.body;
    setupModel.setBudget(budget)
    .then(() => {
        res.redirect('../daily');
    })
});

module.exports = router;