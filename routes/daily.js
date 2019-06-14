const express = require('express'),
    router = express.Router(),
    moment = require('moment'),
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
                email: req.session.email,
                date: moment().format('ll')
            },
            partials: {
                content: 'partial-daily-home'
            }
        });
    } else {
        res.redirect('/users/login');
    }
});

router.get('/expenses', async (req, res, next) => {
    if(!!req.session.is_logged_in) {
        const id = await monthlyModel.getUser(req.session.email);
        let dailyExpense = await monthlyModel.getTotalDailyExpense(id.id);
        //console.log("this is the test for expenses", test);
        if (dailyExpense.total === null) {
            dailyExpense.total = 0;
        }
        const refreshTime = await monthlyModel.getTimestamp(id.id);
        //console.log("this is the refreshTime", refreshTime.reset_time);
        const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        //console.log("this is the currentDate", currentDate);

        let test2;
        if ('June 20th 2019, 2:12:10 am' === refreshTime.reset_time) { //'June 20, 2019 2:11 PM'
            await monthlyModel.resetBudget(refreshTime.set_budget, id.id)//{'alloted_budget' : refreshTime.set_budget};
            .then(async() => {
                test2 = await monthlyModel.getRemainingBalance(id.id);
                await monthlyModel.clearExpense();
            })
        } else {
            test2 = await monthlyModel.getRemainingBalance(id.id);
        }
        console.log("this is test2", test2);
        const listOfExpenses = await monthlyModel.getListOfExpenses(id.id);
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,//${req.session.first_name}`,
                listOfExpenses: listOfExpenses,
                expenseList: dailyExpense,
                balance: test2,
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
        // let dailyExpense = await monthlyModel.getHistoryOfExpenses(id.id);
        // //console.log("this is the test for expenses", test);
        // if (dailyExpense.total === null) {
        //     dailyExpense.total = 0;
        // }
        // const refreshTime = await monthlyModel.getTimestamp(id.id);
        // //console.log("this is the refreshTime", refreshTime.reset_time);
        // const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        // //console.log("this is the currentDate", currentDate);

        // let test2;
        // if ('June 20th 2019, 2:12:11 am' === refreshTime.reset_time) { //'June 20, 2019 2:11 PM'
        //     await monthlyModel.resetBudget(refreshTime.set_budget, id.id)//{'alloted_budget' : refreshTime.set_budget};
        //     .then(async() => {
        //         test2 = await monthlyModel.getRemainingBalance(id.id);
        //         //dailyExpense = await monthlyModel.
        //     })
        // } else {
        //     test2 = await monthlyModel.getRemainingBalance(id.id);
        // }
        // console.log("this is test2", test2);
        const listOfExpenses = await monthlyModel.getHistoryOfExpenses(id.id);
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,//${req.session.first_name}`,
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

router.post('/expenses', async function(req, res, next) {
    const { category, description, expense } = req.body;
    const id = await monthlyModel.getUser(req.session.email);
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')
    monthlyModel.addExpense(category, description, expense, timestamp, id.id);
    monthlyModel.addExpense2(category, description, expense, timestamp, id.id)
    .then(async () => {
        //res.redirect(`/daily/expenses`);
        let dailyExpense = await monthlyModel.getTotalDailyExpense(id.id);
        await monthlyModel.subtractFromBalance(expense, id.id);
        const refreshTime = await monthlyModel.getTimestamp(id.id);
        console.log("this is the refreshTime", refreshTime.reset_time);
        const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        console.log("this is the currentDate", currentDate);

        let test2;
        if ('June 20th 2019, 2:12:10 am' === refreshTime.reset_time) {
            await monthlyModel.resetBudget(refreshTime.set_budget, id.id)//{'alloted_budget' : refreshTime.set_budget};
            .then(async() => {
                test2 = await monthlyModel.getRemainingBalance(id.id);
            })
        } else {
            test2 = await monthlyModel.getRemainingBalance(id.id);
        }
        console.log("this is test2", test2);

        const listOfExpenses = await monthlyModel.getListOfExpenses(id.id);

        res.render('template', {
            locals: {
                title: `Daily Expense Breakdown`,//${req.session.first_name}`,
                expenseList: dailyExpense,
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
