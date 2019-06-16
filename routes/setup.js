const express = require('express'),
    router = express.Router(),
    setupController = require('../controllers/setup'),
    setupModel = require('../models/setup'),
    moment = require('moment');


router.get('/', setupController.homepage_get);

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
        setupModel.budgetTimestamp(budget, date, refresh, userID.id);
    } else if (typeof check.alloted_budget != 'object') {
        const { budget } = req.body;
        setupModel.setBudget(budget, userID.id)
        .then(() => {
            res.redirect('../daily/expenses');
        })
        setupModel.budgetTimestamp(budget, date, refresh, userID.id);
    } else {
        const { budget } = req.body;
        setupModel.updateBudget(budget, userID.id)
        .then(() => {
            res.redirect('../daily/expenses');
        });
    }

});

module.exports = router;
