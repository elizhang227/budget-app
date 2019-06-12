const express = require('express'),
    router = express.Router(),
    setupModel = require('../models/setup');

router.get('/', async function(req, res, next) {
    if(!!req.session.is_logged_in) {
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,//${req.session.first_name}`,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name,
                // booksList: allBooks,
                email: req.session.email
            },
            partials: {
                content: 'partial-setup'
            }
        })
    } else {
        res.redirect('/users/login');
    }

})

router.post('/', async function(req, res, next) {
    const { budget } = req.body;
    console.log("this is email", req.session.email);
    const userID = await setupModel.getUser(req.session.email);
    setupModel.setBudget(budget, userID.id)
    .then(() => {
        res.redirect('../daily');
    })
});

module.exports = router;