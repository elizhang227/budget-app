const express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    dailyController = require('../controllers/daily'),
    monthlyModel = require('../models/daily');

router.get('/', dailyController.homepage_get);

router.get('/expenses', async (req, res, next) => {
    if(!!req.session.is_logged_in) {
        const id = await monthlyModel.getUser(req.session.email);
        let dailyExpense = await monthlyModel.getTotalDailyExpense(id.id);
        if (dailyExpense.total === null) {
            dailyExpense.total = 0;
        }
        const refreshTime = await monthlyModel.getTimestamp(id.id);
        const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');

        let remainingBalance;
        if ('June 20th 2019, 2:12:11 am' === refreshTime.reset_time) { //'June 20th 2019, 2:12:11 am'
            await monthlyModel.resetBudget(refreshTime.set_budget, id.id)
            .then(async() => {
                remainingBalance = await monthlyModel.getRemainingBalance(id.id);
                await monthlyModel.clearExpense();
            })
        } else {
            remainingBalance = await monthlyModel.getRemainingBalance(id.id);
        }
        console.log("this is remainingBalance", remainingBalance);
        const listOfExpenses = await monthlyModel.getListOfExpenses(id.id);
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,
                listOfExpenses: listOfExpenses,
                expenseList: dailyExpense,
                balance: remainingBalance,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name,
                email: req.session.email
            },
            partials: {
                content: 'partial-daily'
            }
        });
    } else {
        res.redirect('/users/login');
    }
})

router.get('/history', async (req, res, next) => {
    if(!!req.session.is_logged_in) {
        const id = await monthlyModel.getUser(req.session.email);
        const listOfExpenses = await monthlyModel.getHistoryOfExpenses(id.id);
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,
                listOfExpenses: listOfExpenses,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name,
                email: req.session.email
            },
            partials: {
                content: 'partial-history'
            }
        });
    } else {
        res.redirect('/users/login');
    }
})

router.get('/expenses/:category', async (req, res, next) => {
    if(!!req.session.is_logged_in) {
        const id = await monthlyModel.getUser(req.session.email);
        const listOfExpenses = await monthlyModel.getCategoryExpense(id.id, req.params.category);
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,
                listOfExpenses: listOfExpenses,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name,
                email: req.session.email
            },
            partials: {
                content: 'partial-expense-category'
            }
        });
    } else {
        res.redirect('/users/login');
    }
})

router.post('/expenses', async function(req, res, next) {
    const { category, description, expense } = req.body;
    const id = await monthlyModel.getUser(req.session.email);
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    const refreshTime = await monthlyModel.getTimestamp(id.id);
    const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    let percentage = (expense / refreshTime.set_budget).toFixed(2);

    monthlyModel.addExpense(category, description, expense, timestamp, percentage, id.id);
    monthlyModel.addExpense2(category, description, expense, timestamp, id.id)
    .then(async () => {
        res.redirect(`/daily/expenses`);
        let dailyExpense = await monthlyModel.getTotalDailyExpense(id.id);
        await monthlyModel.subtractFromBalance(expense, id.id);

        let remainingBalance;
        if ('June 20th 2019, 2:12:11 am' === refreshTime.reset_time) {
            await monthlyModel.resetBudget(refreshTime.set_budget, id.id)
            .then(async() => {
                remainingBalance = await monthlyModel.getRemainingBalance(id.id);
            })
        } else {
            remainingBalance = await monthlyModel.getRemainingBalance(id.id);
        }

        const listOfExpenses = await monthlyModel.getListOfExpenses(id.id);

        res.render('template', {
            locals: {
                title: `Daily Expense Breakdown`,
                expenseList: dailyExpense,
                balance: remainingBalance,
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
