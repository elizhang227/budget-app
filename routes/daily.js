const express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    dailyController = require('../controllers/daily'),
    monthlyModel = require('../models/daily');

router.get('/', dailyController.homepage_get);

router.get('/expenses', dailyController.expenses_get);

router.get('/history', dailyController.history_get);

router.get('/expenses/:category', dailyController.expenses_by_category_get);

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
