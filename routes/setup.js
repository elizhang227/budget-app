const express = require('express'),
    router = express.Router(),
    monthlyModel = require('../models/daily');

router.get('/', async function(req, res, next) {
    res.render('template', {
        locals: {
            title: `Welcome to my dungeon`//${req.session.first_name}`
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

module.exports = router;