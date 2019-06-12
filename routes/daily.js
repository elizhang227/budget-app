const express = require('express'),
    router = express.Router(),
    monthlyModel = require('../models/daily');

router.get('/', async function(req, res, next) {
    if(!!req.session.is_logged_in) {
        const id = await monthlyModel.getUser(req.session.email);
        const balance = await monthlyModel.getRemainingBalance(id.id);
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,//${req.session.first_name}`,
                balance: balance,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name,
                email: req.session.email
            },
            partials: {
                content: 'partial-daily-home'
            }
        });
    } else {
        res.redirect('/users/login');
    }
});

router.post('/expenses', async function(req, res, next) {
    const { category, description, expense } = req.body;
    const id = await monthlyModel.getUser(req.session.email)
    monthlyModel.addExpense(category, description, expense, id.id)
    .then(async () => {
        //res.redirect(`/daily/expenses`);
        const test = await monthlyModel.getTotalDailyExpense(id.id);
        await monthlyModel.subtractFromBalance(test.total);
        const test2 = await monthlyModel.getRemainingBalance(id.id);
        const listOfExpenses = await monthlyModel.getListOfExpenses(id.id);

        res.render('template', {
            locals: {
                title: `Daily Expense Breakdown`,//${req.session.first_name}`,
                expenseList: test,
                balance: test2,
                listOfExpenses: listOfExpenses,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name,
                email: req.session.email
            },
            partials: {
                content: 'partial-daily'
            }
        });
    });
});

module.exports = router;