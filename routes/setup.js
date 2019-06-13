const express = require('express'),
    router = express.Router(),
    setupModel = require('../models/setup'),
    moment = require('moment');


router.get('/', async function(req, res, next) {
    if(!!req.session.is_logged_in) {
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,//${req.session.first_name}`,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name,
                // booksList: allBooks,
                email: req.session.email,
                date_day: moment().format('ll')
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
    //if budget Exists then run updateBudget, else run setBudget
    const userID = await setupModel.getUser(req.session.email);
    const check = await setupModel.budgetExists(userID.id);
    const date = moment().format('LLL');
    const refresh = moment().add(7, 'days').format('LLL');
    console.log(refresh);
    if(check.alloted_budget === null) {
        const { budget } = req.body;
        setupModel.updateBudget(budget, userID.id)
        .then(() => {
            res.redirect('../daily/expenses');
        });
<<<<<<< HEAD
        setupModel.budgetTimestamp(budget, date, refresh, userID.id);
=======
        setupModel.budgetTimestamp(budget, date, refresh, userID.id)
>>>>>>> c767b84105add272d0065d2ebb945e11496ed407
    } else if (typeof check.alloted_budget != 'object') {
        const { budget } = req.body;
        setupModel.setBudget(budget, userID.id)
        .then(() => {
            res.redirect('../daily/expenses');
        })
    } else {
        const { budget } = req.body;
        setupModel.updateBudget(budget, userID.id)
        .then(() => {
            res.redirect('../daily/expenses');
        });
    }

});

module.exports = router;
