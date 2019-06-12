const express = require('express'),
    router = express.Router(),
    monthlyModel = require('../models/daily');
    //monthlyController = require('../controllers/monthly');

router.get('/', async function(req, res, next) {
    const balance = await monthlyModel.getRemainingBalance();
    //console.log("this is the balance", balance);
    res.render('template', {
        locals: {
            title: `Welcome to my dungeon`,//${req.session.first_name}`,
            balance: balance
            // expenseList: test,
            // balance: test2
            // booksList: allBooks,
            // is_logged_in: req.session.is_logged_in,
            // userName: req.session.first_name,
            // email: req.session.email
        },
        partials: {
            content: 'partial-daily-home'
        }
    });
});

router.post('/expenses', async function(req, res, next) {
    const { category, description, expense } = req.body;
    monthlyModel.addExpense(category, description, expense)
    .then(async () => {
        //res.redirect(`/daily/expenses`);
        const test = await monthlyModel.getTotalDailyExpense();
        await monthlyModel.subtractFromBalance(test.total);
        const test2 = await monthlyModel.getRemainingBalance();
        const listOfExpenses = await monthlyModel.getListOfExpenses();

        res.render('template', {
            locals: {
                title: `Daily Expense Breakdown`,//${req.session.first_name}`,
                expenseList: test,
                balance: test2,
                listOfExpenses: listOfExpenses
                // is_logged_in: req.session.is_logged_in,
                // userName: req.session.first_name,
                // email: req.session.email
            },
            partials: {
                content: 'partial-daily'
            }
        });
    });
});

module.exports = router;